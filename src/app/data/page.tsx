"use client";

import { useState } from "react";
import { NavBar } from "../../components/NavBar";
import { AuthGuard } from "../../components/AuthGuard";
import { RecordsTable } from "./components/RecordsTable";
import { useRecords } from "./hooks/useRecords";
import { ClipboardList, Download } from "lucide-react";

function DataContent() {
  const { 
    services, records, loading, remove, exportCsv 
  } = useRecords();
  const [selectedServiceId, setSelectedServiceId] = useState<string>("all");

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
            
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <select
                className="input"
                style={{ minWidth: 200, padding: "0.6rem 1rem" }}
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
              >
                <option value="all">Todos os Serviços</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <button 
                onClick={() => exportCsv(selectedServiceId === "all" ? undefined : selectedServiceId)} 
                className="btn btn-secondary" 
                disabled={records.length === 0}
              >
                <Download className="w-4 h-4 mr-2" /> Exportar CSV
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[1, 2, 3, 4, 5].map((i) => <div key={i} className="skeleton" style={{ height: 48 }} />)}
            </div>
          ) : services.length === 0 ? (
            <div className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem", color: "var(--text-muted)" }}>
                <ClipboardList className="w-12 h-12" />
              </div>
              <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Nenhum serviço ou registro encontrado.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {services
                .filter(s => selectedServiceId === "all" || s.id === selectedServiceId)
                .map((service) => {
                const serviceRecords = records.filter(r => r.serviceId === service.id);
                if (serviceRecords.length === 0) return null;
                
                return (
                  <div key={service.id} style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", padding: "0 0.5rem" }}>
                      <h2 className="text-xl font-bold text-[var(--text-primary)]">{service.name}</h2>
                      <button onClick={() => exportCsv(service.id)} className="btn btn-sm btn-secondary">
                        <Download className="w-4 h-4 mr-2" /> Exportar CSV ({service.name})
                      </button>
                    </div>
                    <RecordsTable records={serviceRecords} onDelete={remove} />
                  </div>
                );
              })}
              {(selectedServiceId === "all" && records.filter(r => !services.find(s => s.id === r.serviceId)).length > 0) && (
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", padding: "0 0.5rem" }}>
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">Registros sem Serviço Atribuído</h2>
                    <button onClick={() => exportCsv()} className="btn btn-sm btn-secondary">
                      <Download className="w-4 h-4 mr-2" /> Exportar CSV
                    </button>
                  </div>
                  <RecordsTable records={records.filter(r => !services.find(s => s.id === r.serviceId))} onDelete={remove} />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function DataPage() {
  return <AuthGuard><DataContent /></AuthGuard>;
}
