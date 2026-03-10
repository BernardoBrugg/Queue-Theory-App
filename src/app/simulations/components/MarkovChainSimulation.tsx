import React, { useState } from "react";
import MathRenderer from "../../../components/MathRenderer";
import { toast } from "react-toastify";
import { XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";

export function MarkovChainSimulation() {
  const [markovLambda, setMarkovLambda] = useState(0.5);
  const [markovMu, setMarkovMu] = useState(1);
  const [markovNumServers, setMarkovNumServers] = useState(1);
  const [markovSteps, setMarkovSteps] = useState(100);
  const [markovResults, setMarkovResults] = useState<{ step: number; state: number }[] | null>(null);
  const [currentMarkovState, setCurrentMarkovState] = useState(0);
  const [markovStepOffset, setMarkovStepOffset] = useState(0);

  const runMarkovChain = () => {
    const lambda = markovLambda;
    const mu = markovMu;
    const c = markovNumServers;
    const rho = lambda / (c * mu);
    if (rho >= 1) {
      toast.error("Sistema instável (ρ >= 1). A simulação não pode ser executada.");
      return;
    }
    const steps = markovSteps;
    let currentState = 0;
    const data: { step: number; state: number }[] = [{ step: 0, state: 0 }];
    for (let step = 1; step <= steps; step++) {
      const arrivalProb = lambda / (lambda + Math.min(c, currentState) * mu);
      const rand = Math.random();
      if (rand < arrivalProb) {
        currentState++;
      } else {
        if (currentState > 0) currentState--;
      }
      data.push({ step, state: currentState });
    }
    setMarkovResults(data);
    setCurrentMarkovState(currentState);
    setMarkovStepOffset(steps);
  };

  const continueMarkovChain = () => {
    if (!markovResults) {
      toast.error("Execute a simulação inicial primeiro.");
      return;
    }
    const lambda = markovLambda;
    const mu = markovMu;
    const c = markovNumServers;
    const steps = markovSteps;
    let currentState = currentMarkovState;
    const data = [...markovResults];
    for (let step = 1; step <= steps; step++) {
      const arrivalProb = lambda / (lambda + Math.min(c, currentState) * mu);
      const rand = Math.random();
      if (rand < arrivalProb) {
        currentState++;
      } else {
        if (currentState > 0) currentState--;
      }
      data.push({ step: markovStepOffset + step, state: currentState });
    }
    setMarkovResults(data);
    setCurrentMarkovState(currentState);
    setMarkovStepOffset(markovStepOffset + steps);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">
        Simulação de Cadeia de Markov (Tempo Discreto)
      </h2>
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              <MathRenderer math="\lambda" /> (transição de chegada)
            </label>
            <input
              type="number"
              step="0.1"
              value={markovLambda}
              onChange={(e) => setMarkovLambda(parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--element-border)] rounded-lg text-[var(--text-primary)]"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              <MathRenderer math="\mu" /> (transição de serviço)
            </label>
            <input
              type="number"
              step="0.1"
              value={markovMu}
              onChange={(e) => setMarkovMu(parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--element-border)] rounded-lg text-[var(--text-primary)]"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              Servidores (c)
            </label>
            <input
              type="number"
              min="1"
              value={markovNumServers}
              onChange={(e) => setMarkovNumServers(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--element-border)] rounded-lg text-[var(--text-primary)]"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              Passos (Steps)
            </label>
            <input
              type="number"
              min="10"
              value={markovSteps}
              onChange={(e) => setMarkovSteps(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--element-border)] rounded-lg text-[var(--text-primary)]"
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button onClick={runMarkovChain} className="btn btn-primary">
            Iniciar Cadeia
          </button>
          <button onClick={continueMarkovChain} disabled={!markovResults} className="btn btn-secondary">
            Continuar Cadeia (+ {markovSteps} passos)
          </button>
        </div>

        {markovResults && (
          <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem", overflowX: "auto" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
              Evolução do Estado
            </h3>
            <LineChart
              width={800}
              height={300}
              data={markovResults}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="step" />
              <YAxis />
              <Tooltip />
              <Line
                type="stepAfter"
                dataKey="state"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </div>
        )}
      </div>
    </div>
  );
}
