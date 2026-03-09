import React, { useState } from "react";
import MathRenderer from "../../../components/MathRenderer";
import { toast } from "react-toastify";

export function MonteCarloSimulation() {
  const [monteLambda, setMonteLambda] = useState(0.5);
  const [monteMu, setMonteMu] = useState(1);
  const [monteNumServers, setMonteNumServers] = useState(1);
  const [monteTime, setMonteTime] = useState(100);
  const [monteRuns, setMonteRuns] = useState(10);
  const [monteResults, setMonteResults] = useState<{
    avgQueueLength: number;
    avgUtilization: number;
    avgWaitingTime: number;
  } | null>(null);

  const runMonteCarlo = () => {
    const lambda = monteLambda;
    const mu = monteMu;
    const c = monteNumServers;
    const rho = lambda / (c * mu);
    if (rho >= 1) {
      toast.error("Sistema instável (ρ >= 1). A simulação não pode ser executada.");
      return;
    }
    const totalTime = monteTime;
    const numRuns = monteRuns;
    let totalQueueLength = 0;
    let totalUtilization = 0;
    let totalWaitingTime = 0;

    for (let run = 0; run < numRuns; run++) {
      let currentTime = 0;
      let nextArrival = -Math.log(Math.random()) / lambda;
      const departures: number[] = new Array(c).fill(Infinity);
      const queue: number[] = [];
      let inService = 0;
      let queueLengthSum = 0;
      let utilizationSum = 0;
      let customerCount = 0;
      let waitingTimeSum = 0;

      while (currentTime < totalTime) {
        const nextEventTime = Math.min(nextArrival, ...departures);
        if (nextEventTime > totalTime) break;
        const timeDiff = nextEventTime - currentTime;
        queueLengthSum += (queue.length + inService) * timeDiff;
        utilizationSum += inService * timeDiff;
        currentTime = nextEventTime;

        if (nextEventTime === nextArrival) {
          const arrivalTime = currentTime;
          queue.push(arrivalTime);
          nextArrival = currentTime + -Math.log(Math.random()) / lambda;
          customerCount++;
          for (let i = 0; i < c; i++) {
            if (departures[i] === Infinity) {
              const serviceTime = -Math.log(Math.random()) / mu;
              departures[i] = currentTime + serviceTime;
              inService++;
              const waitTime = currentTime - arrivalTime;
              waitingTimeSum += waitTime;
              queue.shift();
              break;
            }
          }
        } else {
          for (let i = 0; i < c; i++) {
            if (departures[i] === nextEventTime) {
              departures[i] = Infinity;
              inService--;
              if (queue.length > 0) {
                const arrivalTime = queue.shift()!;
                const serviceTime = -Math.log(Math.random()) / mu;
                departures[i] = currentTime + serviceTime;
                inService++;
                const waitTime = currentTime - arrivalTime;
                waitingTimeSum += waitTime;
              }
              break;
            }
          }
        }
      }
      const avgQueueLength = queueLengthSum / totalTime;
      const avgUtilization = utilizationSum / (totalTime * c);
      const avgWaitingTime = waitingTimeSum / customerCount;

      totalQueueLength += avgQueueLength;
      totalUtilization += avgUtilization;
      totalWaitingTime += avgWaitingTime;
    }

    setMonteResults({
      avgQueueLength: totalQueueLength / numRuns,
      avgUtilization: totalUtilization / numRuns,
      avgWaitingTime: totalWaitingTime / numRuns,
    });
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
        Simulação de Monte Carlo
      </h2>
      <div className="bg-[var(--element-bg)] border border-[var(--element-border)] p-6 rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              <MathRenderer math="\lambda" /> (taxa de chegada)
            </label>
            <input
              type="number"
              step="0.1"
              value={monteLambda}
              onChange={(e) => setMonteLambda(parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--element-border)] rounded-lg text-[var(--text-primary)]"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              <MathRenderer math="\mu" /> (taxa de serviço)
            </label>
            <input
              type="number"
              step="0.1"
              value={monteMu}
              onChange={(e) => setMonteMu(parseFloat(e.target.value))}
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
              value={monteNumServers}
              onChange={(e) => setMonteNumServers(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--element-border)] rounded-lg text-[var(--text-primary)]"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              Tempo de Simulação
            </label>
            <input
              type="number"
              min="10"
              value={monteTime}
              onChange={(e) => setMonteTime(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--element-border)] rounded-lg text-[var(--text-primary)]"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              Número de Rodadas
            </label>
            <input
              type="number"
              min="1"
              value={monteRuns}
              onChange={(e) => setMonteRuns(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--element-border)] rounded-lg text-[var(--text-primary)]"
            />
          </div>
        </div>
        <button
          onClick={runMonteCarlo}
          className="px-6 py-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] text-white rounded-xl font-semibold hover:from-[var(--accent)] hover:to-[var(--accent)] transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Executar Monte Carlo
        </button>

        {monteResults && (
          <div className="mt-6 border-t border-[var(--element-border)] pt-4">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              Resultados Médios (Monte Carlo)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                Tamanho da Fila:{" "}
                <span className="font-bold">
                  {monteResults.avgQueueLength.toFixed(4)}
                </span>
              </div>
              <div>
                Utilização (ρ):{" "}
                <span className="font-bold">
                  {monteResults.avgUtilization.toFixed(4)}
                </span>
              </div>
              <div>
                Tempo de Espera:{" "}
                <span className="font-bold">
                  {monteResults.avgWaitingTime.toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
