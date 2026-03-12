"use client";

import { QueueMetrics } from "../../../types";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

interface MetricsPanelProps {
  metrics: QueueMetrics;
}

const METRIC_ITEMS = (m: QueueMetrics) => [
  { key: "λ", label: "Taxa de Chegada", value: m.lambda, unit: "/s", desc: "Clientes chegando por segundo" },
  { key: "μ", label: "Taxa de Serviço", value: m.mu, unit: "/s", desc: "Clientes atendidos por segundo" },
  { key: "ρ", label: "Utilização", value: m.rho, unit: "", desc: "Quanto do sistema está ocupado" },
  { key: "L", label: "Clientes no Sistema", value: m.L, unit: "", desc: "Média de clientes no sistema" },
  { key: "Lq", label: "Clientes na Fila", value: m.Lq, unit: "", desc: "Média de clientes esperando" },
  { key: "W", label: "Tempo no Sistema", value: m.W, unit: "s", desc: "Tempo médio total" },
  { key: "Wq", label: "Tempo de Espera", value: m.Wq, unit: "s", desc: "Tempo médio esperando" },
  { key: "ρ ocioso", label: "Proporção Ociosa", value: m.idleProportion, unit: "", desc: "Fração do tempo sem clientes" },
];

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <div>
      <h2 className="section-title">Métricas do Sistema</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.875rem", marginBottom: "2rem" }}>
        {METRIC_ITEMS(metrics).map(({ key, label, value, unit, desc }) => (
          <div key={key} className="glass-card animate-fade-in" style={{ padding: "1rem" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>{key}</div>
            <div className="metric-value">{value != null && isFinite(value) ? `${value.toFixed(4)}${unit}` : "N/A"}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{label}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.125rem" }}>{desc}</div>
          </div>
        ))}
      </div>

      {metrics.P && metrics.P.length > 0 && (
        <div className="glass-card" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
          <h3 className="section-title" style={{ fontSize: "1rem" }}>Probabilidades P(n) — chance de haver N clientes simultâneos</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={metrics.P.map((p, n) => ({ n, p: p ?? 0 }))} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="n" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
              <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }} />
              <Bar dataKey="p" fill="var(--accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
