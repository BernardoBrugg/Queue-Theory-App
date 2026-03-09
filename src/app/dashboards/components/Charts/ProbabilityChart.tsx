import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { QueueMetrics } from "../../../../types";

interface ProbabilityChartProps {
  metrics: QueueMetrics;
}

export const ProbabilityChart: React.FC<ProbabilityChartProps> = ({ metrics }) => {
  if (!metrics?.P || metrics.P.length === 0) return null;

  return (
    <div className="mt-4 bg-[var(--element-bg)] border border-[var(--element-border)] p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        Gráfico de Probabilidades P(n)
      </h4>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={
            metrics.P.map((p, n) => ({
              n,
              p: p ?? 0,
            })) || []
          }
          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="n" />
          <YAxis
            label={{
              value: "Probabilidade",
              angle: -90,
              position: "left",
            }}
          />
          <Tooltip />
          <Bar dataKey="p" fill="var(--chart-1)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
