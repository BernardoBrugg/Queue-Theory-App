"use client";

import { QueueRecord } from "../../../types";

interface RecordsTableProps {
  records: QueueRecord[];
  onDelete: (id: string) => void;
}

export function RecordsTable({ records, onDelete }: RecordsTableProps) {
  if (records.length === 0) {
    return (
      <div className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📋</div>
        <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Nenhum registro encontrado.</p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.375rem" }}>Use os cronômetros para registrar chegadas e atendimentos.</p>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            {["Fila", "Tipo", "Elemento", "Chegada", "Saída", "Duração (s)", ""].map((h) => (
              <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={r.id ?? i} style={{ borderBottom: "1px solid var(--border)", transition: "background var(--transition-fast)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-raised)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <td style={{ padding: "0.625rem 1rem", color: "var(--text-primary)", fontWeight: 500 }}>{r.queue}</td>
              <td style={{ padding: "0.625rem 1rem" }}>
                <span className={`badge ${r.type === "arrival" ? "badge-accent" : "badge-success"}`}>
                  {r.type === "arrival" ? "Chegada" : "Atendimento"}
                </span>
              </td>
              <td style={{ padding: "0.625rem 1rem", color: "var(--text-primary)" }}>{r.element}</td>
              <td style={{ padding: "0.625rem 1rem", color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                {r.arriving ? new Date(r.arriving).toLocaleTimeString("pt-BR") : "—"}
              </td>
              <td style={{ padding: "0.625rem 1rem", color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                {r.exiting ? new Date(r.exiting).toLocaleTimeString("pt-BR") : "—"}
              </td>
              <td style={{ padding: "0.625rem 1rem", color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>
                {r.totalTime > 0 ? (r.totalTime / 1000).toFixed(2) : "—"}
              </td>
              <td style={{ padding: "0.625rem 1rem" }}>
                {r.id && (
                  <button onClick={() => onDelete(r.id!)} className="btn btn-ghost btn-sm"
                    style={{ color: "var(--danger)", padding: "0.25rem" }} aria-label="Excluir">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
                    </svg>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
