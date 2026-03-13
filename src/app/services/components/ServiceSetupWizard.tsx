"use client";

import { useState } from "react";
import { ServiceDefinition } from "../../../types";

type FormState = {
  name: string;
  numArrivalQueues: number;
  numServers: number;
};

const DEFAULT_FORM: FormState = { name: "", numArrivalQueues: 1, numServers: 1 };

interface ServiceSetupWizardProps {
  onCreate: (data: Omit<ServiceDefinition, "id" | "createdAt">) => Promise<void>;
}

export function ServiceSetupWizard({ onCreate }: ServiceSetupWizardProps) {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("O nome do serviço é obrigatório."); return; }
    if (form.numArrivalQueues < 1) { setError("Mínimo 1 fila de chegada."); return; }
    if (form.numServers < 1) { setError("Mínimo 1 atendente."); return; }
    setError("");
    setLoading(true);
    try {
      await onCreate({ name: form.name.trim(), numArrivalQueues: form.numArrivalQueues, numServers: form.numServers });
      setForm(DEFAULT_FORM);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: "2rem", maxWidth: 480 }}>
      <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>Criar novo serviço</h2>
      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
        Defina o nome, o número de filas de chegada e quantos atendentes estarão disponíveis.
      </p>

      {error && (
        <div className="badge badge-danger" style={{ marginBottom: "1rem", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)" }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label className="label" htmlFor="svc-name">Nome do Serviço</label>
          <input id="svc-name" className="input" placeholder="Ex: Caixa do supermercado A"
            value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          <div>
            <label className="label" htmlFor="svc-queues">Filas de chegada</label>
            <input id="svc-queues" className="input" type="number" min={1} max={10}
              value={form.numArrivalQueues}
              onChange={(e) => setForm((f) => ({ ...f, numArrivalQueues: Math.max(1, Number(e.target.value)) }))} />
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Filas onde clientes chegam</p>
          </div>
          <div>
            <label className="label" htmlFor="svc-servers">Atendentes</label>
            <input id="svc-servers" className="input" type="number" min={1} max={20}
              value={form.numServers}
              onChange={(e) => setForm((f) => ({ ...f, numServers: Math.max(1, Number(e.target.value)) }))} />
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Pessoas que atendem</p>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: "0.5rem" }}>
          {loading ? "Criando..." : "Criar Serviço →"}
        </button>
      </div>
    </form>
  );
}
