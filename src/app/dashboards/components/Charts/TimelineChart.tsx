import React from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { StoredService } from "../../../../types";

interface TimelineChartProps {
  service: StoredService;
}

export const TimelineChart: React.FC<TimelineChartProps> = ({ service }) => {
  return (
    <div className="mt-4 bg-[var(--element-bg)] border border-[var(--element-border)] p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        Gráfico de Linhas: Tempos por Tempo
      </h4>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart
          data={
            service.serviceTimes?.map((s, i) => ({
              time:
                service.timestamps && service.timestamps[i]
                  ? (service.timestamps[i] - service.timestamps[0]) / 1000
                  : i + 1,
              serviceTime: s ?? 0,
              waitTime: service.metrics?.waitingTimes?.[i] ?? 0,
              idleTime: service.metrics?.idleTimes?.[i] ?? 0,
            })) || []
          }
          margin={{ top: 20, right: 30, left: 40, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            label={{ value: "Tempo (s)", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{ value: "Tempo (s)", angle: -90, position: "left" }}
          />
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
          />
          <Line
            type="monotone"
            dataKey="serviceTime"
            stroke="var(--chart-1)"
            name="Serviço"
          />
          <Line
            type="monotone"
            dataKey="waitTime"
            stroke="var(--chart-2)"
            name="Espera"
          />
          <Line
            type="monotone"
            dataKey="idleTime"
            stroke="var(--chart-3)"
            name="Ocioso"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
