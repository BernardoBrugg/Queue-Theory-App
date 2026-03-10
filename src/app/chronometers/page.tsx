"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { NavBar } from "../../components/NavBar";
import { AuthGuard } from "../../components/AuthGuard";
import { ChronometerCard } from "./components/ChronometerCard";
import { useChronometerPage } from "./hooks/useChronometerPage";

function ChronometerPageInner() {
  const params = useSearchParams();
  const serviceId = params.get("service");
  const { 
    definition, queues, loading, session, 
    getNextElementId, pushToWaitlist, popFromWaitlist 
  } = useChronometerPage(serviceId);

  if (loading || !definition) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: 260, borderRadius: "var(--radius-lg)" }} />)}
      </div>
    );
  }

  const arrivalQueues = queues.filter(q => q.type === "arrival");
  const serviceQueues = queues.filter(q => q.type === "service");
  const waitlistSize = session?.waitingPool?.length ?? 0;

  return (
    <>
      <div style={{ marginBottom: "2.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem" }}>
        <div>
          <div className="badge badge-accent" style={{ marginBottom: "0.5rem" }}>Passo 2 de 4</div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            {definition.name}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            {definition.numArrivalQueues} Entrada(s) · {definition.numServers} Posto(s) de Atendimento
          </p>
        </div>
        <div className="glass-card" style={{ padding: "0.75rem 1.25rem", border: "1px solid var(--accent-cyan)", textAlign: "right", minWidth: "160px" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--accent-cyan)", fontWeight: 700, textTransform: "uppercase" }}>Fila Única de Espera</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{waitlistSize} <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>pessoas</span></div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "4px", height: "1.5rem", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)" }} />
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>Entradas (Chegadas)</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {arrivalQueues.map((q) => (
              <ChronometerCard 
                key={q.name} 
                serviceId={serviceId!}
                queueName={q.name} 
                queueType={q.type}
                numServers={q.numServers} 
                getNextElementId={getNextElementId}
                pushToWaitlist={pushToWaitlist}
                popFromWaitlist={popFromWaitlist}
              />
            ))}
          </div>
        </section>

        <section>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "4px", height: "1.5rem", borderRadius: "var(--radius-full)", background: "var(--accent)" }} />
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>Postos de Atendimento</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {serviceQueues.map((q) => (
              <ChronometerCard 
                key={q.name} 
                serviceId={serviceId!}
                queueName={q.name} 
                queueType={q.type}
                numServers={q.numServers} 
                getNextElementId={getNextElementId}
                pushToWaitlist={pushToWaitlist}
                popFromWaitlist={popFromWaitlist}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function ChronometerPageBody() {
  return (
    <div className="page-container">
      <NavBar />
      <main style={{ padding: "2.5rem 1.5rem" }}>
        <div className="content-wrapper">
          <Suspense fallback={<div style={{ color: "var(--text-muted)" }}>Carregando...</div>}>
            <ChronometerPageInner />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default function ChronometerPage() {
  return <AuthGuard><ChronometerPageBody /></AuthGuard>;
}
