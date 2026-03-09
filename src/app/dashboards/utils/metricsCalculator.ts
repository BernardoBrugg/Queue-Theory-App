import { toast } from "react-toastify";
import { QueueMetrics } from "../../../types";

export interface QueueData {
  queue: string;
  type: "arrival" | "service";
  timestamp: string;
  arriving: string;
  exiting: string;
  element: number;
  totalTime: number;
}

export function calculateMetrics(
  data: QueueData[],
  selectedArrivalQueue: string,
  selectedServiceQueue: string,
  numServers: number,
  maxN: number,
  setResults: (res: QueueMetrics) => void
) {
  try {
    if (!selectedArrivalQueue || !selectedServiceQueue) {
      toast.warn("Selecione filas de chegada e atendimento.");
      return;
    }
    const arrivalData = data
      .filter((d) => d.queue === selectedArrivalQueue && d.type === "arrival")
      .sort((a, b) => a.element - b.element);
    const serviceData = data
      .filter((d) => d.queue === selectedServiceQueue && d.type === "service")
      .sort((a, b) => a.element - b.element);

    if (arrivalData.length !== serviceData.length) {
      toast.error("O número de registros de chegada e atendimento deve ser igual.");
      return;
    }

    const arrivalElements = new Set(arrivalData.map((d) => d.element));
    const serviceElements = new Set(serviceData.map((d) => d.element));
    const commonElements = new Set(
      [...arrivalElements].filter((e) => serviceElements.has(e))
    );

    const filteredArrivalData = arrivalData
      .filter(
        (d) =>
          commonElements.has(d.element) &&
          !isNaN(new Date(d.timestamp).getTime())
      )
      .sort((a, b) => a.element - b.element);
    const filteredServiceData = serviceData
      .filter(
        (d) =>
          commonElements.has(d.element) &&
          !isNaN(new Date(d.arriving).getTime()) &&
          !isNaN(new Date(d.exiting).getTime())
      )
      .sort((a, b) => a.element - b.element);

    if (filteredArrivalData.length === 0) {
      toast.error(
        "Não há elementos comuns válidos entre as filas de chegada e atendimento."
      );
      return;
    }

    // Compute inter-arrivals for lambda
    const interArrivals = [];
    for (let i = 1; i < filteredArrivalData.length; i++) {
        const diff =
          (new Date(filteredArrivalData[i].timestamp).getTime() -
            new Date(filteredArrivalData[i - 1].timestamp).getTime()) /
          1000;
        if (diff > 0) {
          interArrivals.push(diff);
        }
    }

    if (interArrivals.length === 0) {
      toast.error(
        "Todos os tempos de chegada são idênticos. Por favor, registre chegadas com timestamps diferentes para calcular a taxa de chegada (λ)."
      );
      return;
    }

    const avgInterArrival =
      interArrivals.reduce((a, b) => a + b, 0) / interArrivals.length;
    const lambda = 1 / avgInterArrival;

    if (!isFinite(lambda) || lambda <= 0) {
      toast.error(
        "Erro ao calcular a taxa de chegada. Verifique os dados de entrada."
      );
      return;
    }

    // Compute service times for mu
    const serviceTimes = filteredServiceData.map((s) => s.totalTime / 1000);
    const validServiceTimes = serviceTimes.filter((t: number) => t > 0);

    if (validServiceTimes.length === 0) {
      toast.error(
        "Todos os tempos de serviço são zero ou inválidos. Por favor, registre atendimentos com duração adequada."
      );
      return;
    }

    const avgServiceTime =
      validServiceTimes.reduce((a: number, b: number) => a + b, 0) / validServiceTimes.length;
    const mu = 1 / avgServiceTime;

    if (!isFinite(mu) || mu <= 0) {
      toast.error(
        "Erro ao calcular a taxa de atendimento. Verifique os dados de entrada."
      );
      return;
    }

    const waitingTimes = [];
    for (let i = 0; i < filteredArrivalData.length; i++) {
      const arrivalTime = new Date(filteredArrivalData[i].timestamp).getTime();
      const serviceStart = new Date(filteredServiceData[i].arriving).getTime();
      if (serviceStart < arrivalTime) {
        toast.error(
          `Para o elemento ${filteredArrivalData[i].element}, o tempo de início do atendimento deve ser posterior ao tempo de chegada.`
        );
        return;
      }
      waitingTimes.push((serviceStart - arrivalTime) / 1000);
    }

    const rho = lambda / (numServers * mu);
    if (rho >= 1) {
      toast.warn(
        `O sistema está sobrecarregado (ρ = ${rho.toFixed(
          4
        )} ≥ 1). As fórmulas de estado estacionário não se aplicam. A fila cresce indefinidamente.`
      );
    }

    const lambdaK = () => lambda;
    const muK = (_k: number) => Math.min(_k, numServers) * mu;

    const C: number[] = [1];
    for (let n = 1; n <= maxN; n++) {
      C[n] = C[n - 1] * (lambdaK() / muK(n));
    }

    const sumC = C.slice(1).reduce((sum, c) => sum + c, 0);
    const P0 = 1 / (1 + sumC);

    const P: number[] = [];
    for (let n = 0; n <= maxN; n++) {
      P[n] = C[n] * P0;
    }

    if (P.some((p) => !isFinite(p))) {
      toast.error("Métricas inválidas devido a sistema instável (probabilidades infinitas).");
      return;
    }

    const L = P.reduce((sum, p, n) => sum + n * p, 0);
    const Lq = P.slice(numServers).reduce(
      (sum, p, idx) => sum + (idx + numServers - numServers) * p,
      0
    );

    const W = L / lambda;
    const Wq = Lq / lambda;

    if (!isFinite(L) || !isFinite(Lq) || !isFinite(W) || !isFinite(Wq)) {
      toast.error("Métricas inválidas devido a dados instáveis.");
      return;
    }

    const idleTimes: number[] = [];
    let serverBusyUntil = new Date(filteredArrivalData[0].timestamp).getTime();
    let totalIdleTime = 0;
    for (let i = 0; i < filteredServiceData.length; i++) {
      const arrivalTime = new Date(filteredArrivalData[i].timestamp).getTime();
      const serviceTime = filteredServiceData[i].totalTime;
      const idleForThis = Math.max(0, arrivalTime - serverBusyUntil);
      idleTimes.push(idleForThis / 1000);
      totalIdleTime += idleForThis;
      serverBusyUntil = Math.max(serverBusyUntil, arrivalTime) + serviceTime;
    }
    const idleTime = totalIdleTime / 1000;
    const idleProportion =
      idleTime /
      ((serverBusyUntil - new Date(filteredArrivalData[0].timestamp).getTime()) / 1000);

    setResults({
      lambda,
      mu,
      rho,
      L,
      Lq,
      W,
      Wq,
      P,
      numServers,
      idleTime,
      idleProportion,
      avgServiceTime,
      idleTimes,
      waitingTimes,
      interArrivals,
      serviceTimes: validServiceTimes,
      timestamps: filteredArrivalData.map((d) => new Date(d.timestamp).getTime()),
    });
    toast.success("Métricas calculadas com sucesso!");
  } catch (error) {
    console.error("Erro ao calcular métricas:", error);
    toast.error("Erro ao calcular métricas.");
  }
}
