import React from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

interface ChartDataPoint {
  time: number;
  arrivals: number;
  departures: number;
}

interface CumulativeChartProps {
  data: ChartDataPoint[];
}

export const CumulativeChart: React.FC<CumulativeChartProps> = ({ data }) => {
  return (
    <div className="mt-4 bg-[var(--element-bg)] border border-[var(--element-border)] p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        Gráfico Cumulativo
      </h4>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart
          width={800}
          height={300}
          data={data}
          margin={{ top: 20, right: 150, left: 40, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            label={{ value: "Tempo (s)", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{
              value: "Número de Clientes",
              angle: -90,
              position: "left",
            }}
          />
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
          />
          <Line
            type="monotone"
            dataKey="arrivals"
            stroke="var(--chart-1)"
            name="Chegadas"
          />
          <Line
            type="monotone"
            dataKey="departures"
            stroke="var(--chart-2)"
            name="Saídas"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
