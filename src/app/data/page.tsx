"use client";

import { useState } from "react";
import { NavBar } from "../../components/NavBar";
import { AuthGuard } from "../../components/AuthGuard";
import { RecordsTable } from "./components/RecordsTable";
import { useRecords } from "./hooks/useRecords";
import { ClipboardList, Download, ChevronLeft } from "lucide-react";

function DataContent() {
  const { services, records, loading, remove, exportCsv } = useRecords();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );

  const selectedService =
    services.find((s) => s.id === selectedServiceId) ?? null;
  const selectedRecords = selectedService
    ? records.filter((r) => r.serviceId === selectedService.id)
    : [];

  return (
    <div className="page-container">
      <NavBar />
      <main style={{ padding: "2.5rem 1.5rem" }}>
        <div className="content-wrapper">
          {}
          <div style={{ marginBottom: "2rem" }}>
            <div
              className="badge badge-accent"
              style={{ marginBottom: "0.5rem" }}
            >
              Passo 3 de 4
            </div>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "0.25rem",
              }}
            >
              Dados Registrados
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Selecione um serviço para visualizar e revisar os dados coletados.
            </p>
          </div>

          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="skeleton"
                  style={{ height: 110, borderRadius: "0.75rem" }}
                />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div
              className="glass-card"
              style={{ padding: "3rem", textAlign: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "0.75rem",
                  color: "var(--text-muted)",
                }}
              >
                <ClipboardList style={{ width: 48, height: 48 }} />
              </div>
              <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                Nenhum serviço encontrado.
              </p>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                Crie um serviço e registre dados com os cronômetros primeiro.
              </p>
            </div>
          ) : !selectedService ? (
                        <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              {services.map((s) => {
                const count = records.filter(
                  (r) => r.serviceId === s.id,
                ).length;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedServiceId(s.id)}
                    className="glass-card"
                    style={{
                      padding: "1.25rem",
                      textAlign: "left",
                      cursor: "pointer",
                      border: "1px solid var(--border)",
                      transition:
                        "border-color var(--transition-fast), box-shadow var(--transition-fast)",
                      background: "var(--surface)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "var(--accent)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 0 2px var(--accent-alpha, rgba(99,102,241,.2))";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "var(--border)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "none";
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: "0.35rem",
                        fontSize: "1rem",
                      }}
                    >
                      {s.name}
                    </p>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Criado em{" "}
                      {new Date(s.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.4rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span className="badge badge-accent">
                        {s.numArrivalQueues} fila
                        {s.numArrivalQueues > 1 ? "s" : ""}
                      </span>
                      <span className="badge badge-success">
                        {s.numServers} atend.
                      </span>
                      <span
                        className="badge"
                        style={{
                          background: "var(--surface-raised)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {count} registro{count !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* ── Data table for selected service ── */
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <button
                    onClick={() => setSelectedServiceId(null)}
                    className="btn btn-ghost btn-sm"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <ChevronLeft style={{ width: 16, height: 16 }} />
                    Voltar
                  </button>
                  <h2
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    {selectedService.name}
                  </h2>
                  <span
                    className="badge"
                    style={{
                      background: "var(--surface-raised)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {selectedRecords.length} registro
                    {selectedRecords.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <button
                  onClick={() => exportCsv(selectedService.id)}
                  className="btn btn-secondary btn-sm"
                  disabled={selectedRecords.length === 0}
                >
                  <Download
                    style={{ width: 14, height: 14, marginRight: "0.4rem" }}
                  />
                  Exportar CSV
                </button>
              </div>
              <RecordsTable records={selectedRecords} onDelete={remove} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function DataPage() {
  return (
    <AuthGuard>
      <DataContent />
    </AuthGuard>
  );
}
