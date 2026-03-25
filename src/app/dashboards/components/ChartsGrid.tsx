"use client";

import { QueueMetrics } from "../../../types";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface ChartsGridProps {
  metrics: QueueMetrics;
}

export function ChartsGrid({ metrics }: ChartsGridProps) {
  const chartStyle = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" };
  const axisStyle = { fill: "var(--text-secondary)", fontSize: 11 };

  const timeCompData = [
    { name: "Serviço", value: metrics.avgServiceTime ?? 0 },
    { name: "Espera", value: metrics.Wq ?? 0 },
    { name: "Ocioso", value: metrics.idleTime ?? 0 },
  ];

  const timelineData = metrics.serviceTimes?.map((s, i) => ({
    n: i + 1,
    serviceTime: s ?? 0,
    waitTime: metrics.waitingTimes?.[i] ?? 0,
    idleTime: metrics.idleTimes?.[i] ?? 0,
  })) ?? [];

  const probData = metrics.P?.map((p, i) => ({
    state: i,
    probability: (p * 100).toFixed(2),
  })) ?? [];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
      {}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>Comparação de Tempos Médios (s)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={timeCompData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={chartStyle} cursor={{ fill: "var(--surface-hover)" }} />
            <Bar dataKey="value" fill="url(#colorCyan)" radius={[4, 4, 0, 0]} />
            <defs>
              <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {}
      {probData.length > 0 && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>Distribuição de Probabilidade (Pn)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={probData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="state" tick={axisStyle} axisLine={false} tickLine={false} label={{ value: "Nº Clientes (n)", position: "insideBottom", offset: -5, fill: "var(--text-muted)", fontSize: 10 }} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={chartStyle} />
              <Line type="monotone" dataKey="probability" stroke="var(--accent)" strokeWidth={3} dot={{ r: 3, fill: "var(--surface)" }} activeDot={{ r: 6 }} name="Probabilidade" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {}
      {timelineData.length > 0 && (
        <div className="glass-card" style={{ padding: "1.5rem", gridColumn: "1 / -1" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>Dinâmica de Tempos por Cliente</h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={timelineData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="n" tick={axisStyle} axisLine={false} tickLine={false} label={{ value: "Ordem de Chegada", position: "insideBottom", offset: -5, fill: "var(--text-muted)", fontSize: 10 }} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} unit="s" />
              <Tooltip contentStyle={chartStyle} />
              <Legend wrapperStyle={{ fontSize: "0.75rem", paddingTop: "10px" }} iconType="circle" />
              <Line type="monotone" dataKey="serviceTime" stroke="var(--accent-cyan)" name="T. Serviço" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="waitTime" stroke="var(--error)" name="T. Espera" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
