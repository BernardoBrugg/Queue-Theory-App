import React from "react";
import { StoredService } from "../../../../types";

interface PDFMetricsTableProps {
  service: StoredService;
}

export function PDFMetricsTable({ service }: PDFMetricsTableProps) {
  return (
    <>
      <h2>Métricas Principais</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <tbody>
          <tr>
            <td>
              <strong>λ (taxa de chegada):</strong>{" "}
              {isFinite(service.metrics.lambda)
                ? service.metrics.lambda.toFixed(4)
                : "N/A"}{" "}
              chegadas/s
            </td>
            <td>
              <strong>μ (taxa de serviço):</strong>{" "}
              {isFinite(service.metrics.mu)
                ? service.metrics.mu.toFixed(4)
                : "N/A"}{" "}
              atendimentos/s
            </td>
            <td>
              <strong>ρ (utilização):</strong>{" "}
              {isFinite(service.metrics.rho)
                ? service.metrics.rho.toFixed(4)
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td>
              <strong>L (clientes no sistema):</strong>{" "}
              {isFinite(service.metrics.L)
                ? service.metrics.L.toFixed(4)
                : "N/A"}
            </td>
            <td>
              <strong>Lq (clientes na fila):</strong>{" "}
              {isFinite(service.metrics.Lq)
                ? service.metrics.Lq.toFixed(4)
                : "N/A"}
            </td>
            <td>
              <strong>W (tempo no sistema):</strong>{" "}
              {isFinite(service.metrics.W)
                ? service.metrics.W.toFixed(4)
                : "N/A"}{" "}
              s
            </td>
          </tr>
          <tr>
            <td>
              <strong>Wq (tempo na fila):</strong>{" "}
              {isFinite(service.metrics.Wq)
                ? service.metrics.Wq.toFixed(4)
                : "N/A"}{" "}
              s
            </td>
            <td>
              <strong>P0 (probabilidade de vazio):</strong>{" "}
              {service.metrics.P?.[0] !== null &&
              isFinite(service.metrics.P?.[0] as number)
                ? service.metrics.P[0].toFixed(4)
                : "N/A"}
            </td>
            <td>
              <strong>Tempo Ocioso Médio:</strong>{" "}
              {service.metrics.idleTime != null && isFinite(service.metrics.idleTime)
                ? service.metrics.idleTime.toFixed(4)
                : "N/A"}{" "}
              s
            </td>
          </tr>
          <tr>
            <td>
              <strong>Proporção Ociosa:</strong>{" "}
              {service.metrics.idleProportion != null && isFinite(service.metrics.idleProportion)
                ? service.metrics.idleProportion.toFixed(4)
                : "N/A"}
            </td>
            <td>
              <strong>Tempo Médio de Serviço:</strong>{" "}
              {service.metrics.avgServiceTime != null && isFinite(service.metrics.avgServiceTime)
                ? service.metrics.avgServiceTime.toFixed(4)
                : "N/A"}{" "}
              s
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <h2>Probabilidades P(n)</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {service.metrics.P && service.metrics.P.length > 0 ? (
          service.metrics.P.map((p, n) => (
            <div key={n}>
              P({n}): {p !== null && isFinite(p) ? p.toFixed(4) : "N/A"}
            </div>
          ))
        ) : (
          <div>No P data available</div>
        )}
      </div>
    </>
  );
}
