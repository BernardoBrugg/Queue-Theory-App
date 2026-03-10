"use client";

import { NavBar } from "../../components/NavBar";
import { AuthGuard } from "../../components/AuthGuard";
import { MetricsPanel } from "./components/MetricsPanel";
import { ChartsGrid } from "./components/ChartsGrid";
import { useDashboard } from "./hooks/useDashboard";

function DashboardContent() {
  const { services, selectedService, setSelectedService, maxN, setMaxN, metrics, loading, calculate } = useDashboard();

  return (
    <div className="page-container">
      <NavBar />
      <main style={{ padding: "2.5rem 1.5rem" }}>
        <div className="content-wrapper">
          <div style={{ marginBottom: "2rem" }}>
            <div className="badge badge-accent" style={{ marginBottom: "0.5rem" }}>Passo 4 de 4</div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.25rem" }}>Painel de Métricas</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Selecione um serviço e calcule as métricas M/M/c automaticamente.</p>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-end" }}>
              <div style={{ flex: "1 1 240px" }}>
                <label className="label" htmlFor="dash-service">Serviço</label>
                <select id="dash-service" className="input"
                  value={selectedService?.id ?? ""}
                  onChange={(e) => setSelectedService(services.find((s) => s.id === e.target.value) ?? null)}>
                  <option value="">Selecione um serviço...</option>
                  {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div style={{ flex: "0 1 140px" }}>
                <label className="label" htmlFor="dash-maxn">Máximo N (estados)</label>
                <input id="dash-maxn" className="input" type="number" min={5} max={50} value={maxN}
                  onChange={(e) => setMaxN(Math.max(5, Number(e.target.value)))} />
              </div>
              <button className="btn btn-primary" onClick={calculate} disabled={loading || !selectedService} style={{ alignSelf: "flex-end" }}>
                {loading ? "Calculando..." : "Calcular →"}
              </button>
            </div>
            {!selectedService && services.length === 0 && (
              <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                💡 Primeiro crie um serviço na página <strong>Serviços</strong> e registre dados com os <strong>Cronômetros</strong>.
              </p>
            )}
          </div>

          {metrics && (
            <div className="animate-slide-up">
              <MetricsPanel metrics={metrics} />
              <ChartsGrid metrics={metrics} />
            </div>
          )}

          {!metrics && !loading && (
            <div className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📊</div>
              <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Nenhuma métrica calculada ainda.</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.375rem" }}>
                Selecione um serviço acima e clique em &quot;Calcular&quot;.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return <AuthGuard><DashboardContent /></AuthGuard>;
}
