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
  serviceStart?: string; 
}

export function calculateMetrics(
  data: QueueData[],
  selectedArrivalQueue: string,
  selectedServiceQueue: string,
  numServers: number,
  maxN: number,
  setResults: (res: QueueMetrics) => void,
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

    if (arrivalData.length === 0) {
      toast.error(
        "Nenhum registro de chegada encontrado para a fila selecionada.",
      );
      return;
    }
    if (serviceData.length === 0) {
      toast.error(
        "Nenhum registro de atendimento encontrado para a fila selecionada.",
      );
      return;
    }

    const arrivalElements = new Set(arrivalData.map((d) => d.element));
    const serviceElements = new Set(serviceData.map((d) => d.element));
    const commonElements = new Set(
      [...arrivalElements].filter((e) => serviceElements.has(e)),
    );

    const filteredArrivalData = arrivalData
      .filter(
        (d) =>
          commonElements.has(d.element) &&
          !isNaN(new Date(d.timestamp).getTime()),
      )
      .sort((a, b) => a.element - b.element);
    const filteredServiceData = serviceData
      .filter(
        (d) =>
          commonElements.has(d.element) &&
          !isNaN(new Date(d.arriving).getTime()) &&
          !isNaN(new Date(d.exiting).getTime()),
      )
      .sort((a, b) => a.element - b.element);

    if (filteredArrivalData.length === 0) {
      toast.error(
        "Não há elementos comuns válidos entre as filas de chegada e atendimento.",
      );
      return;
    }

    
    const sortedTimestamps = filteredArrivalData
      .map((d) => new Date(d.timestamp).getTime())
      .sort((a, b) => a - b);

    const lastTimestamp = sortedTimestamps[sortedTimestamps.length - 1];
    const firstTimestamp = sortedTimestamps[0];
    const totalTimeSpanStr = (lastTimestamp - firstTimestamp) / 1000;

    if (totalTimeSpanStr <= 0 || sortedTimestamps.length < 2) {
      toast.error(
        "Tempo insuficiente entre a primeira e a última chegada para calcular a taxa de chegada (λ).",
      );
      return;
    }

    const lambda = (sortedTimestamps.length - 1) / totalTimeSpanStr;

    
    const interArrivals = [];
    for (let i = 1; i < sortedTimestamps.length; i++) {
      interArrivals.push(
        (sortedTimestamps[i] - sortedTimestamps[i - 1]) / 1000,
      );
    }

    if (!isFinite(lambda) || lambda <= 0) {
      toast.error(
        "Erro ao calcular a taxa de chegada. Verifique os dados de entrada.",
      );
      return;
    }

    
    const serviceTimes = filteredServiceData.map((s) => {
      if (
        s.serviceStart &&
        s.exiting &&
        !isNaN(new Date(s.serviceStart).getTime())
      ) {
        return (
          (new Date(s.exiting).getTime() - new Date(s.serviceStart).getTime()) /
          1000
        );
      }
      
      return s.totalTime / 1000;
    });
    const validServiceTimes = serviceTimes.filter((t: number) => t > 0);

    if (validServiceTimes.length === 0) {
      toast.error(
        "Todos os tempos de serviço são zero ou inválidos. Por favor, registre atendimentos com duração adequada.",
      );
      return;
    }

    const avgServiceTime =
      validServiceTimes.reduce((a: number, b: number) => a + b, 0) /
      validServiceTimes.length;
    const mu = 1 / avgServiceTime;

    if (!isFinite(mu) || mu <= 0) {
      toast.error(
        "Erro ao calcular a taxa de atendimento. Verifique os dados de entrada.",
      );
      return;
    }

    
    const serviceByElement = new Map(
      filteredServiceData.map((s) => [s.element, s]),
    );
    const pairedData = filteredArrivalData
      .map((a) => ({ arrival: a, service: serviceByElement.get(a.element) }))
      .filter(
        (
          p,
        ): p is {
          arrival: typeof p.arrival;
          service: NonNullable<typeof p.service>;
        } => !!p.service,
      );

    if (pairedData.length === 0) {
      toast.error(
        "Não há elementos comuns válidos entre as filas de chegada e atendimento.",
      );
      return;
    }

    const waitingTimes = [];
    for (const { arrival, service } of pairedData) {
      const arrivalTime = new Date(arrival.timestamp).getTime();
      const serviceStartMs =
        service.serviceStart && !isNaN(new Date(service.serviceStart).getTime())
          ? new Date(service.serviceStart).getTime()
          : new Date(service.arriving).getTime();
      if (serviceStartMs < arrivalTime) {
        toast.error(
          `Para o elemento ${arrival.element}, o tempo de início do atendimento deve ser posterior ao tempo de chegada.`,
        );
        return;
      }
      waitingTimes.push((serviceStartMs - arrivalTime) / 1000);
    }

    const rho = lambda / (numServers * mu);
    if (rho >= 1) {
      toast.warn(
        `O sistema está sobrecarregado (ρ = ${rho.toFixed(4)} ≥ 1). As fórmulas de estado estacionário não se aplicam — L, Lq, W e Wq são valores empíricos observados, não teóricos.`,
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
        P[n] =
          P0 *
          (Math.pow(r, n) / (factC * Math.pow(numServers, n - numServers)));
      }
    }

    let Lq = 0;
    let Wq = 0;
    let W = 0;
    let L = 0;

    if (rho < 1) {
      let factC = 1;
      for (let i = 1; i <= numServers; i++) factC *= i;
      Lq =
        (P0 * Math.pow(r, numServers) * rho) / (factC * Math.pow(1 - rho, 2));
      Wq = Lq / lambda;
      W = Wq + 1 / mu;
      L = lambda * W;
    } else {
      
      
      Wq = waitingTimes.reduce((a, b) => a + b, 0) / waitingTimes.length;
      W = Wq + 1 / mu;
      Lq = lambda * Wq;
      L = lambda * W;
    }

    if (P.some((p) => !isFinite(p) && rho < 1)) {
      toast.error(
        "Métricas inválidas devido a sistema instável (probabilidades matemáticas excedidas).",
      );
      return;
    }

    const idleTimes: number[] = [];
    
    const sortedPairedService = [...pairedData]
      .map((p) => p.service)
      .sort((a, b) => {
        const ta = a.serviceStart
          ? new Date(a.serviceStart).getTime()
          : new Date(a.arriving).getTime();
        const tb = b.serviceStart
          ? new Date(b.serviceStart).getTime()
          : new Date(b.arriving).getTime();
        return ta - tb;
      });
    let serverBusyUntil = new Date(pairedData[0].arrival.timestamp).getTime();
    let totalIdleTime = 0;
    for (const sd of sortedPairedService) {
      const serviceStartMs =
        sd.serviceStart && !isNaN(new Date(sd.serviceStart).getTime())
          ? new Date(sd.serviceStart).getTime()
          : new Date(sd.arriving).getTime();
      const serviceEndMs = new Date(sd.exiting).getTime();
      const idleForThis = Math.max(0, serviceStartMs - serverBusyUntil);
      idleTimes.push(idleForThis / 1000);
      totalIdleTime += idleForThis;
      serverBusyUntil = serviceEndMs;
    }
    const spanMs =
      serverBusyUntil - new Date(pairedData[0].arrival.timestamp).getTime();
    const idleTime = totalIdleTime / 1000;
    const idleProportion = spanMs > 0 ? idleTime / (spanMs / 1000) : 0;

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
      timestamps: pairedData.map((p) =>
        new Date(p.arrival.timestamp).getTime(),
      ),
    });
    toast.success("Métricas calculadas com sucesso!");
  } catch (error) {
    console.error("Erro ao calcular métricas:", error);
    toast.error("Erro ao calcular métricas.");
  }
}
