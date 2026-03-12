import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { QueueMetrics } from "../../../../types";

interface TimeComparisonChartProps {
  metrics: QueueMetrics;
}

export const TimeComparisonChart: React.FC<TimeComparisonChartProps> = ({ metrics }) => {
  return (
    <div className="mt-4 bg-[var(--element-bg)] border border-[var(--element-border)] p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        Comparação de Tempos Médios
      </h4>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={[
            {
              name: "Tempo Médio de Serviço",
              value:
                metrics?.avgServiceTime != null && isFinite(metrics.avgServiceTime)
                  ? metrics.avgServiceTime
                  : 0,
            },
            {
              name: "Tempo Médio de Espera",
              value:
                metrics?.Wq != null && isFinite(metrics.Wq)
                  ? metrics.Wq
                  : 0,
            },
            {
              name: "Tempo Ocioso",
              value:
                metrics?.idleTime != null && isFinite(metrics.idleTime)
                  ? metrics.idleTime
                  : 0,
            },
          ]}
          margin={{ top: 20, right: 30, left: 40, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{}} />
          <YAxis
            label={{ value: "Tempo (s)", angle: -90, position: "left" }}
          />
          <Tooltip />
          <Bar dataKey="value" fill="var(--chart-4)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
