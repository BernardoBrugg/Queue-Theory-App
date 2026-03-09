import React from "react";
import { StoredService } from "../../../types";
import { ProbabilityChart } from "./Charts/ProbabilityChart";
import { CumulativeChart } from "./Charts/CumulativeChart";
import { ServiceHistogram } from "./Charts/ServiceHistogram";
import { TimeComparisonChart } from "./Charts/TimeComparisonChart";
import { TimelineChart } from "./Charts/TimelineChart";

interface ChartDataPoint {
  time: number;
  arrivals: number;
  departures: number;
}

interface ServiceCardProps {
  service: StoredService;
  index: number;
  deleteService: (index: number) => void;
  exportServiceToPDF: (service: StoredService) => void;
  getCumulativeData: (service: StoredService) => ChartDataPoint[];
}

export const ServiceCard = React.memo(function ServiceCard({
  service,
  index,
  deleteService,
  exportServiceToPDF,
  getCumulativeData,
}: ServiceCardProps) {
  const histogramData = React.useMemo(() => {
    try {
      if (!service.serviceTimes || service.serviceTimes.length === 0) return [];
      const validServiceTimes = service.serviceTimes.filter(
        (t) => t !== null && isFinite(t)
      );
      if (validServiceTimes.length === 0) return [];
      const bins = 10;
      const min = Math.min(...validServiceTimes);
      const max = Math.max(...validServiceTimes);
      if (!isFinite(min) || !isFinite(max) || min === max) return [];
      const binSize = (max - min) / bins;
      const data = [];
      for (let i = 0; i < bins; i++) {
        const binStart = min + i * binSize;
        const binEnd = min + (i + 1) * binSize;
        const count = validServiceTimes.filter(
          (t) => t >= binStart && t < binEnd
        ).length;
        data.push({
          bin: `${binStart.toFixed(2)}-${binEnd.toFixed(2)}`,
          count,
        });
      }
      return data;
    } catch (error) {
      console.error("Error calculating histogram data:", error);
      return [];
    }
  }, [service.serviceTimes]);

  const cumulativeData = React.useMemo(
    () => getCumulativeData(service),
    [service, getCumulativeData]
  );

  return (
    <div className="bg-[var(--element-bg)] border-2 border-[var(--element-border)] p-6 rounded-[var(--border-radius-large)] shadow-xl hover:shadow-2xl transition-all duration-500">
      <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
        {service.name}
      </h3>
      <p className="text-[var(--text-primary)] mb-2 font-medium">
        <span className="font-semibold">Fila de Chegada:</span> {service.arrivalQueue}
      </p>
      <p className="text-[var(--text-primary)] mb-4 font-medium">
        <span className="font-semibold">Fila de Atendimento:</span> {service.serviceQueue}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-[var(--text-primary)] bg-[var(--element-bg)] border border-[var(--element-border)] p-3 rounded-lg">
          <span className="font-semibold">λ:</span>{" "}
          {service.metrics?.lambda != null && isFinite(service.metrics.lambda)
            ? service.metrics.lambda.toFixed(4)
            : "N/A"}{" "}
          chegadas/s
        </div>
        <div className="text-[var(--text-primary)] bg-[var(--element-bg)] border border-[var(--element-border)] p-3 rounded-lg">
          <span className="font-semibold">μ:</span>{" "}
          {service.metrics?.mu != null && isFinite(service.metrics.mu)
            ? service.metrics.mu.toFixed(4)
            : "N/A"}{" "}
          atendimentos/s
        </div>
        <div className="text-[var(--text-primary)] bg-[var(--element-bg)] border border-[var(--element-border)] p-3 rounded-lg">
          <span className="font-semibold">ρ:</span>{" "}
          {service.metrics?.rho != null && isFinite(service.metrics.rho)
            ? service.metrics.rho.toFixed(4)
            : "N/A"}
        </div>
        <div className="text-[var(--text-primary)] bg-[var(--element-bg)] border border-[var(--element-border)] p-3 rounded-lg">
          <span className="font-semibold">L:</span>{" "}
          {service.metrics?.L != null && isFinite(service.metrics.L)
            ? service.metrics.L.toFixed(4)
            : "N/A"}
        </div>
        <div className="text-[var(--text-primary)] bg-[var(--element-bg)] border border-[var(--element-border)] p-3 rounded-lg">
          <span className="font-semibold">Lq:</span>{" "}
          {service.metrics?.Lq != null && isFinite(service.metrics.Lq)
            ? service.metrics.Lq.toFixed(4)
            : "N/A"}
        </div>
        <div className="text-[var(--text-primary)] bg-[var(--element-bg)] border border-[var(--element-border)] p-3 rounded-lg">
          <span className="font-semibold">W:</span>{" "}
          {service.metrics?.W != null && isFinite(service.metrics.W)
            ? service.metrics.W.toFixed(4)
            : "N/A"}{" "}
          s
        </div>
        <div className="text-[var(--text-primary)] bg-[var(--element-bg)] border border-[var(--element-border)] p-3 rounded-lg">
          <span className="font-semibold">Wq:</span>{" "}
          {service.metrics?.Wq != null && isFinite(service.metrics.Wq)
            ? service.metrics.Wq.toFixed(4)
            : "N/A"}{" "}
          s
        </div>
        <div className="text-[var(--text-primary)] bg-[var(--element-bg)] border border-[var(--element-border)] p-3 rounded-lg">
          <span className="font-semibold">P0:</span>{" "}
          {service.metrics?.P?.[0] != null && isFinite(service.metrics.P[0])
            ? service.metrics.P[0].toFixed(4)
            : "N/A"}
        </div>
        <div className="text-[var(--text-primary)] bg-[var(--element-bg)] border border-[var(--element-border)] p-3 rounded-lg">
          <span className="font-semibold">Tempo Ocioso Médio:</span>{" "}
          {service.metrics?.idleTime != null &&
          isFinite(service.metrics.idleTime)
            ? service.metrics.idleTime.toFixed(4)
            : "N/A"}{" "}
          s
        </div>
        <div className="text-[var(--text-primary)] bg-[var(--element-bg)] border border-[var(--element-border)] p-3 rounded-lg">
          <span className="font-semibold">Proporção Ociosa:</span>{" "}
          {service.metrics?.idleProportion != null &&
          isFinite(service.metrics.idleProportion)
            ? service.metrics.idleProportion.toFixed(4)
            : "N/A"}
        </div>
      </div>
      <div className="mb-4 bg-[var(--element-bg)] border border-[var(--element-border)] p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Probabilidades P(n):
        </h4>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {service.metrics?.P && service.metrics.P.length > 0 ? (
            service.metrics.P.map((p, n) => (
              <div key={n} className="text-[var(--text-primary)]">
                P({n}): {p != null && isFinite(p) ? p.toFixed(4) : "N/A"}
              </div>
            ))
          ) : (
            <div key="no-p" className="text-[var(--text-primary)]">No P data available</div>
          )}
        </div>
      </div>
      <ProbabilityChart metrics={service.metrics} />
      <CumulativeChart data={cumulativeData} />
      <ServiceHistogram histogramData={histogramData} />
      <TimeComparisonChart metrics={service.metrics} />
      <TimelineChart service={service} />
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => deleteService(index)}
          className="btn-danger"
        >
          Excluir Serviço
        </button>
        <button
          onClick={() => exportServiceToPDF(service)}
          className="btn-primary"
        >
          Exportar para PDF
        </button>
      </div>
    </div>
  );
});
