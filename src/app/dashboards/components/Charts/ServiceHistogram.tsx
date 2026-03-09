import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

interface ServiceHistogramProps {
  histogramData: { bin: string; count: number }[];
}

export const ServiceHistogram: React.FC<ServiceHistogramProps> = ({ histogramData }) => {
  return (
    <div className="mt-4 bg-[var(--element-bg)] border border-[var(--element-border)] p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        Histograma de Tempos de Serviço
      </h4>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={histogramData}
          margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="bin"
            label={{
              value: "Tempo de Serviço (s)",
              position: "bottom",
            }}
          />
          <YAxis
            label={{
              value: "Frequência",
              angle: -90,
              position: "left",
            }}
          />
          <Tooltip />
          <Bar dataKey="count" fill="var(--chart-3)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
