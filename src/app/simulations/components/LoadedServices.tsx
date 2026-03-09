import React from "react";
import MathRenderer from "../../../components/MathRenderer";
import { XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import { QueueMetrics } from "../../../types";

interface StoredService {
  id: string;
  name: string;
  arrivalQueue: string;
  serviceQueue: string;
  metrics: QueueMetrics;
  serviceTimes: number[];
  waitingTimes: number[];
  idleTimes: number[];
}

interface LoadedServicesProps {
  services: StoredService[];
}

export function LoadedServices({ services }: LoadedServicesProps) {
  if (services.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
        Serviços Carregados
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[var(--element-bg)] border border-[var(--element-border)] p-6 rounded-lg shadow-sm hover:shadow-md transition-colors duration-200"
          >
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              {service.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <MathRenderer math="\lambda" />:{" "}
                {isFinite(service.metrics.lambda)
                  ? service.metrics.lambda.toFixed(4)
                  : "N/A"}{" "}
                chegadas/s
              </div>
              <div>
                <MathRenderer math="\mu" />:{" "}
                {isFinite(service.metrics.mu)
                  ? service.metrics.mu.toFixed(4)
                  : "N/A"}{" "}
                atendimentos/s
              </div>
              <div>
                <MathRenderer math="\rho" />:{" "}
                {isFinite(service.metrics.rho)
                  ? service.metrics.rho.toFixed(4)
                  : "N/A"}
              </div>
              <div>
                L:{" "}
                {isFinite(service.metrics.L)
                  ? service.metrics.L.toFixed(4)
                  : "N/A"}
              </div>
              <div>
                <MathRenderer math="L_q" />:{" "}
                {isFinite(service.metrics.Lq)
                  ? service.metrics.Lq.toFixed(4)
                  : "N/A"}
              </div>
              <div>
                W:{" "}
                {isFinite(service.metrics.W)
                  ? service.metrics.W.toFixed(4)
                  : "N/A"}{" "}
                s
              </div>
              <div>
                <MathRenderer math="W_q" />:{" "}
                {isFinite(service.metrics.Wq)
                  ? service.metrics.Wq.toFixed(4)
                  : "N/A"}{" "}
                s
              </div>
              <div>
                P0:{" "}
                {service.metrics.P?.[0] !== null &&
                isFinite(service.metrics.P?.[0])
                  ? service.metrics.P[0].toFixed(4)
                  : "N/A"}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Gráfico de Probabilidades P(n)
              </h4>
              <BarChart
                width={800}
                height={300}
                data={
                  service.metrics.P?.map((p, n) => ({
                    n,
                    p: p !== null ? p : 0,
                  })) || []
                }
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="n" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="p" fill="var(--chart-1)" />
              </BarChart>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
