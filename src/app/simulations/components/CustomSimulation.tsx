import React, { useState } from "react";
import MathRenderer from "../../../components/MathRenderer";
import { XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

import { QueueMetrics } from "../../../types";

interface CustomSimulationProps {
  onAddService: (service: {
    name: string;
    arrivalQueue: string;
    serviceQueue: string;
    metrics: QueueMetrics;
  }) => void;
}

export function CustomSimulation({ onAddService }: CustomSimulationProps) {
  const [customLambda, setCustomLambda] = useState(0.5);
  const [customMu, setCustomMu] = useState(1);
  const [customNumServers, setCustomNumServers] = useState(1);
  const [customMetrics, setCustomMetrics] = useState<QueueMetrics | null>(null);
  const [customMaxN, setCustomMaxN] = useState(10);

  const calculateCustomMetrics = () => {
    const lambda = customLambda;
    const mu = customMu;
    const numServers = customNumServers;
    const rho = lambda / (numServers * mu);
    if (rho >= 1) {
      alert("Sistema instável (ρ >= 1).");
      return;
    }
    const r = lambda / mu;
    let P0 = 0;
    
    if (rho < 1) {
      let sumProb = 0;
      for (let n = 0; n < numServers; n++) {
        let fact = 1;
        for (let i = 1; i <= n; i++) fact *= i;
        sumProb += Math.pow(r, n) / fact;
      }
      let factC = 1;
      for (let i = 1; i <= numServers; i++) factC *= i;
      sumProb += (Math.pow(r, numServers) / factC) * (1 / (1 - rho));
      P0 = 1 / sumProb;
    }

    const N = customMaxN;
    const P: number[] = [];
    for (let n = 0; n <= N; n++) {
      if (rho >= 1) {
        P[n] = 0;
      } else if (n < numServers) {
        let fact = 1;
        for (let i = 1; i <= n; i++) fact *= i;
        P[n] = P0 * (Math.pow(r, n) / fact);
      } else {
        let factC = 1;
        for (let i = 1; i <= numServers; i++) factC *= i;
        P[n] = P0 * (Math.pow(r, n) / (factC * Math.pow(numServers, n - numServers)));
      }
    }

    let Lq = 0;
    let Wq = 0;
    let W = 0;
    let L = 0;

    if (rho < 1) {
      let factC = 1;
      for (let i = 1; i <= numServers; i++) factC *= i;
      Lq = (P0 * Math.pow(r, numServers) * rho) / (factC * Math.pow(1 - rho, 2));
      Wq = Lq / lambda;
      W = Wq + 1 / mu;
      L = lambda * W;
    } else {
      Lq = Infinity;
      Wq = Infinity;
      W = Infinity;
      L = Infinity;
    }

    setCustomMetrics({ lambda, mu, rho, L, Lq, W, Wq, P, numServers });
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">
        Simulação Personalizada
      </h2>
      <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              <MathRenderer math="\lambda" /> (taxa de chegada)
            </label>
            <input
              type="number"
              step="0.1"
              value={customLambda}
              onChange={(e) => setCustomLambda(parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--element-border)] rounded-lg text-[var(--text-primary)]"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              <MathRenderer math="\mu" /> (taxa de serviço por servidor)
            </label>
            <input
              type="number"
              step="0.1"
              value={customMu}
              onChange={(e) => setCustomMu(parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--element-border)] rounded-lg text-[var(--text-primary)]"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              Número de Servidores (c)
            </label>
            <input
              type="number"
              min="1"
              value={customNumServers}
              onChange={(e) => setCustomNumServers(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--element-border)] rounded-lg text-[var(--text-primary)]"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              Máximo n para P(n)
            </label>
            <input
              type="number"
              min="1"
              value={customMaxN}
              onChange={(e) => setCustomMaxN(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--element-border)] rounded-lg text-[var(--text-primary)]"
            />
          </div>
        </div>
        <button onClick={calculateCustomMetrics} className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Calcular Métricas
        </button>
      </div>
      {customMetrics && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
            Resultados da Simulação Personalizada
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <MathRenderer math="\lambda" />: {customMetrics.lambda.toFixed(4)}
            </div>
            <div>
              <MathRenderer math="\mu" />: {customMetrics.mu.toFixed(4)}
            </div>
            <div>
              <MathRenderer math="\rho" />: {customMetrics.rho.toFixed(4)}
            </div>
            <div>Servidores: {customMetrics.numServers}</div>
            <div>L: {customMetrics.L.toFixed(4)}</div>
            <div>
              <MathRenderer math="L_q" />: {customMetrics.Lq.toFixed(4)}
            </div>
            <div>W: {customMetrics.W.toFixed(4)} s</div>
            <div>
              <MathRenderer math="W_q" />: {customMetrics.Wq.toFixed(4)} s
            </div>
            <div>P0: {customMetrics.P[0].toFixed(4)}</div>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Probabilidades P(n):
            </h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {customMetrics.P.map((p, n) => (
                <div key={n}>
                  P({n}): {p.toFixed(4)}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Gráfico de Probabilidades P(n)
            </h4>
            <BarChart
              width={800}
              height={300}
              data={customMetrics.P.map((p, n) => ({ n, p }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="n" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="p" fill="var(--chart-1)" />
            </BarChart>
          </div>
          <button
            onClick={() => {
              const newService = {
                name: `Simulação Personalizada M/M/${customNumServers}`,
                arrivalQueue: "Chegada Personalizada",
                serviceQueue: "Atendimento Personalizado",
                metrics: customMetrics,
              };
              onAddService(newService);
              alert("Simulação adicionada aos Serviços!");
            }}
            className="btn btn-secondary"
            style={{ marginTop: "1rem" }}
          >
            Adicionar aos Serviços
          </button>
        </div>
      )}
    </div>
  );
}
