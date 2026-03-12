"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { QueueMetrics } from "../../../types";

interface SimulationChartsGridProps {
  metrics: QueueMetrics;
  chartData: { time: number; arrivals: number; departures: number }[];
}

export function SimulationChartsGrid({
  metrics,
  chartData,
}: SimulationChartsGridProps) {
  const axisStyle = { fill: "var(--text-secondary)", fontSize: 11 };
  const tooltipStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
  };

  const timeData = [
    { name: "W (sistema)", value: parseFloat(metrics.W.toFixed(4)) },
    { name: "Wq (fila)", value: parseFloat(metrics.Wq.toFixed(4)) },
    { name: "1/μ (serviço)", value: parseFloat((1 / metrics.mu).toFixed(4)) },
  ];

  const clientData = [
    { name: "L (no sistema)", value: parseFloat(metrics.L.toFixed(4)) },
    { name: "Lq (na fila)", value: parseFloat(metrics.Lq.toFixed(4)) },
  ];

  const probData =
    metrics.P?.map((p, i) => ({
      state: i,
      probability: parseFloat((p * 100).toFixed(3)),
    })) ?? [];

  const hasBothExtras = probData.length > 0 && chartData.length > 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.25rem",
      }}
    >
      <div className="glass-card" style={{ padding: "1.25rem" }}>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "1rem",
          }}
        >
          Tempos Médios (s)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={timeData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar
              dataKey="value"
              fill="var(--accent-cyan)"
              radius={[4, 4, 0, 0]}
              name="Tempo (s)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card" style={{ padding: "1.25rem" }}>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "1rem",
          }}
        >
          Clientes Médios no Sistema
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={clientData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={axisStyle}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar
              dataKey="value"
              fill="var(--accent)"
              radius={[4, 4, 0, 0]}
              name="Clientes"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {probData.length > 0 && (
        <div
          className="glass-card"
          style={{
            padding: "1.25rem",
            gridColumn: hasBothExtras ? "auto" : "1 / -1",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Distribuição de Probabilidade P(n)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={probData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="state"
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "n (clientes)",
                  position: "insideBottom",
                  offset: -5,
                  fill: "var(--text-muted)",
                  fontSize: 10,
                }}
              />
              <YAxis
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
                unit="%"
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="probability"
                stroke="var(--accent)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--surface)" }}
                activeDot={{ r: 5 }}
                name="P(n) %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {chartData.length > 0 && (
        <div
          className="glass-card"
          style={{
            padding: "1.25rem",
            gridColumn: hasBothExtras ? "auto" : "1 / -1",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Fluxo Acumulado (Chegadas × Saídas)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Tempo (min)",
                  position: "insideBottom",
                  offset: -5,
                  fill: "var(--text-muted)",
                  fontSize: 10,
                }}
              />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend
                wrapperStyle={{ fontSize: "0.75rem", paddingTop: "10px" }}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="arrivals"
                stroke="var(--accent-cyan)"
                strokeWidth={2.5}
                dot={false}
                name="Chegadas"
              />
              <Line
                type="monotone"
                dataKey="departures"
                stroke="var(--accent)"
                strokeWidth={2.5}
                dot={false}
                name="Saídas"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
