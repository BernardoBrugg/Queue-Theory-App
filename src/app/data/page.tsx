"use client";

import { NavBar } from "../../components/NavBar";
import { AuthGuard } from "../../components/AuthGuard";
import { RecordsTable } from "./components/RecordsTable";
import { useRecords } from "./hooks/useRecords";

function DataContent() {
  const { 
    services, selectedService, setSelectedService,
    records, loading, queues, filter, setFilter, remove, exportCsv 
  } = useRecords();

  return (
    <div className="page-container">
      <NavBar />
      <main style={{ padding: "2.5rem 1.5rem" }}>
        <div className="content-wrapper">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
            <div>
              <div className="badge badge-accent" style={{ marginBottom: "0.5rem" }}>Passo 3 de 4</div>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.25rem" }}>Dados Registrados</h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Revise os dados coletados antes de calcular as métricas.</p>
            </div>
            
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <select
                className="input"
                style={{ minWidth: 200, padding: "0.6rem 1rem" }}
                value={selectedService?.id || ""}
                onChange={(e) => {
                  const s = services.find((x) => x.id === e.target.value);
                  setSelectedService(s || null);
                }}
              >
                <option value="" disabled>Selecione um Serviço</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>

              <button onClick={exportCsv} className="btn btn-secondary" disabled={records.length === 0}>
                ↓ Exportar CSV
              </button>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Filtrar:</span>
            <button className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-secondary"}`} onClick={() => setFilter("all")}>
              Todos ({records.length})
            </button>
            {queues.map((q) => (
              <button key={q} className={`btn btn-sm ${filter === q ? "btn-primary" : "btn-secondary"}`} onClick={() => setFilter(q)}>
                {q}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[1, 2, 3, 4, 5].map((i) => <div key={i} className="skeleton" style={{ height: 48 }} />)}
            </div>
          ) : (
            <RecordsTable records={records} onDelete={remove} />
          )}
        </div>
      </main>
    </div>
  );
}

export default function DataPage() {
  return <AuthGuard><DataContent /></AuthGuard>;
}
