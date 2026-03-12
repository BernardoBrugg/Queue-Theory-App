"use client";

import { NavBar } from "../../components/NavBar";
import { AuthGuard } from "../../components/AuthGuard";
import { ServiceSetupWizard } from "./components/ServiceSetupWizard";
import { ServiceListCard } from "./components/ServiceListCard";
import { useServiceDefinitions } from "./hooks/useServiceDefinitions";
import { ClipboardList } from "lucide-react";

function ServicesContent() {
  const { services, loading, create, remove } = useServiceDefinitions();

  return (
    <div className="page-container">
      <NavBar />
      <main style={{ padding: "2.5rem 1.5rem" }}>
        <div className="content-wrapper">
          <div style={{ marginBottom: "2rem" }}>
            <div className="badge badge-accent" style={{ marginBottom: "0.5rem" }}>Passo 1 de 4</div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
              Meus Serviços
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              Crie um serviço para definir as filas corretamente antes de começar a cronometrar.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "2rem", alignItems: "start" }}>
            <ServiceSetupWizard onCreate={create} />
            <div>
              <h2 className="section-title">Serviços criados</h2>
              {loading && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[1, 2].map((i) => <div key={i} className="skeleton" style={{ height: 120 }} />)}
                </div>
              )}
              {!loading && services.length === 0 && (
                <div className="glass-card" style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                    <ClipboardList className="w-10 h-10" />
                  </div>
                  <p style={{ fontWeight: 500 }}>Nenhum serviço criado ainda.</p>
                  <p style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>Use o formulário ao lado para começar.</p>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {services.map((s) => <ServiceListCard key={s.id} service={s} onDelete={remove} />)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ServicesPage() {
  return <AuthGuard><ServicesContent /></AuthGuard>;
}
