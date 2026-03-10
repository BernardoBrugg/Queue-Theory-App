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
    const sortedTimestamps = filteredArrivalData
      .map(d => new Date(d.timestamp).getTime())
      .sort((a,b) => a - b);
      
    const lastTimestamp = sortedTimestamps[sortedTimestamps.length - 1];
    const firstTimestamp = sortedTimestamps[0];
    const totalTimeSpanStr = (lastTimestamp - firstTimestamp) / 1000;

    if (totalTimeSpanStr <= 0 || sortedTimestamps.length < 2) {
      toast.error(
        "Tempo insuficiente entre a primeira e a última chegada para calcular a taxa de chegada (λ)."
      );
      return;
    }

    const lambda = (sortedTimestamps.length - 1) / totalTimeSpanStr;
    
    // Keep interArrivals for formatting, but compute lambda globally
    const interArrivals = [];
    for (let i = 1; i < sortedTimestamps.length; i++) {
        interArrivals.push((sortedTimestamps[i] - sortedTimestamps[i - 1]) / 1000);
    }

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

    const r = lambda / mu;
    let P0 = 0;
    
    if (rho < 1) {
      let sumProb = 0;
      for (let n = 0; n < numServers; n++) {
        let fact = 1;
        for (let i = 1; i <= n; i++) fact *= i;
        sumProb += Math.pow(r, n) / fact;
      }
      let factC = 1;
      for (let i = 1; i <= numServers; i++) factC *= i;
      sumProb += (Math.pow(r, numServers) / factC) * (1 / (1 - rho));
      P0 = 1 / sumProb;
    }

    const P: number[] = [];
    for (let n = 0; n <= maxN; n++) {
      if (rho >= 1) {
        P[n] = 0;
      } else if (n < numServers) {
        let fact = 1;
        for (let i = 1; i <= n; i++) fact *= i;
        P[n] = P0 * (Math.pow(r, n) / fact);
      } else {
        let factC = 1;
        for (let i = 1; i <= numServers; i++) factC *= i;
        P[n] = P0 * (Math.pow(r, n) / (factC * Math.pow(numServers, n - numServers)));
      }
    }

    let Lq = 0;
    let Wq = 0;
    let W = 0;
    let L = 0;

    if (rho < 1) {
      let factC = 1;
      for (let i = 1; i <= numServers; i++) factC *= i;
      Lq = (P0 * Math.pow(r, numServers) * rho) / (factC * Math.pow(1 - rho, 2));
      Wq = Lq / lambda;
      W = Wq + 1 / mu;
      L = lambda * W;
    } else {
      Lq = Infinity;
      Wq = Infinity;
      W = Infinity;
      L = Infinity;
    }

    if (P.some((p) => !isFinite(p) && rho < 1)) {
      toast.error("Métricas inválidas devido a sistema instável (probabilidades matemáticas excedidas).");
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
