import React, { useState } from "react";
import MathRenderer from "../../../components/MathRenderer";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

import { QueueMetrics } from "../../../types";

interface DiscreteEventSimulationProps {
  onAddService: (service: {
    name: string;
    arrivalQueue: string;
    serviceQueue: string;
    metrics: QueueMetrics;
  }) => void;
}

export function DiscreteEventSimulation({
  onAddService,
}: DiscreteEventSimulationProps) {
  const [arrivalRate, setArrivalRate] = useState(0.5);
  const [serviceRate, setServiceRate] = useState(1);
  const [numServers, setNumServers] = useState(1);
  const [simulationTime, setSimulationTime] = useState(100);
  const [simulationResults, setSimulationResults] = useState<{
    chartData: {
      time: number;
      queueLength: number;
      serverUtilization: number;
    }[];
    metrics: QueueMetrics;
  } | null>(null);

  const runDiscreteEventSimulation = () => {
    // Simple discrete event simulation for M/M/1 or M/M/c
    const servers: { busyUntil: number; serving: boolean }[] = Array.from(
      { length: numServers },
      () => ({ busyUntil: 0, serving: false })
    );
    let currentTime = 0;
    const queue: number[] = [];
    let nextArrival = -Math.log(Math.random()) / arrivalRate;
    let nextDeparture = Infinity;
    let totalArrivals = 0;
    let totalQueueTime = 0;
    let totalSystemTime = 0;
    let maxQueueLength = 0;
    const chartData: {
      time: number;
      queueLength: number;
      serverUtilization: number;
    }[] = [];

    while (currentTime < simulationTime) {
      if (nextArrival < nextDeparture) {
        // Arrival
        currentTime = nextArrival;
        totalArrivals++;
        const arrivalTime = currentTime;
        let assignedServer = -1;
        for (let i = 0; i < numServers; i++) {
          if (!servers[i].serving) {
            assignedServer = i;
            break;
          }
        }
        if (assignedServer !== -1) {
          // Server available
          servers[assignedServer].serving = true;
          servers[assignedServer].busyUntil =
            currentTime + -Math.log(Math.random()) / serviceRate;
          totalSystemTime += servers[assignedServer].busyUntil - currentTime;
        } else {
          // Queue
          queue.push(arrivalTime);
          maxQueueLength = Math.max(maxQueueLength, queue.length);
        }
        nextArrival = currentTime + -Math.log(Math.random()) / arrivalRate;
      } else {
        // Departure
        currentTime = nextDeparture;
        let departingServer = -1;
        for (let i = 0; i < numServers; i++) {
          if (servers[i].busyUntil === currentTime) {
            departingServer = i;
            break;
          }
        }
        if (departingServer !== -1) {
          servers[departingServer].serving = false;
          if (queue.length > 0) {
            const nextCustomer = queue.shift()!;
            totalQueueTime += currentTime - nextCustomer;
            servers[departingServer].serving = true;
            servers[departingServer].busyUntil =
              currentTime + -Math.log(Math.random()) / serviceRate;
            totalSystemTime += servers[departingServer].busyUntil - currentTime;
          }
        }
        nextDeparture = Math.min(...servers.map((s) => s.busyUntil));
      }
      const busyServers = servers.filter((s) => s.serving).length;
      chartData.push({
        time: currentTime,
        queueLength: queue.length,
        serverUtilization: busyServers / numServers,
      });
    }

    const L = totalSystemTime / simulationTime;
    const Lq = totalQueueTime / simulationTime;
    const W = totalSystemTime / totalArrivals;
    const Wq = totalQueueTime / totalArrivals;
    const rho = arrivalRate / (numServers * serviceRate);
    const P: (number | null)[] = [null]; // Not calculated in simulation

    setSimulationResults({
      chartData,
      metrics: {
        lambda: arrivalRate,
        mu: serviceRate,
        rho,
        L,
        Lq,
        W,
        Wq,
        P: (P as (number | null)[]).map((p) => (p === null ? 0 : p)),
        numServers,
      },
    });
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2 className="section-title">
        Simulação por Eventos Discretos
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
              value={arrivalRate}
              onChange={(e) => setArrivalRate(parseFloat(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              <MathRenderer math="\mu" /> (taxa de serviço por servidor)
            </label>
            <input
              type="number"
              step="0.1"
              value={serviceRate}
              onChange={(e) => setServiceRate(parseFloat(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              Número de Servidores (c)
            </label>
            <input
              type="number"
              min="1"
              value={numServers}
              onChange={(e) => setNumServers(parseInt(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">
              Tempo de Simulação
            </label>
            <input
              type="number"
              value={simulationTime}
              onChange={(e) => setSimulationTime(parseFloat(e.target.value))}
              className="input"
            />
          </div>
        </div>
        <button onClick={runDiscreteEventSimulation} className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Executar Simulação
        </button>
      </div>
      {simulationResults && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
            Resultados da Simulação por Eventos Discretos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <MathRenderer math="\lambda" />:{" "}
              {simulationResults.metrics.lambda.toFixed(4)}
            </div>
            <div>
              <MathRenderer math="\mu" />:{" "}
              {simulationResults.metrics.mu.toFixed(4)}
            </div>
            <div>
              <MathRenderer math="\rho" />:{" "}
              {simulationResults.metrics.rho.toFixed(4)}
            </div>
            <div>Servidores: {simulationResults.metrics.numServers}</div>
            <div>L: {simulationResults.metrics.L.toFixed(4)}</div>
            <div>
              <MathRenderer math="L_q" />:{" "}
              {simulationResults.metrics.Lq.toFixed(4)}
            </div>
            <div>W: {simulationResults.metrics.W.toFixed(4)} s</div>
            <div>
              <MathRenderer math="W_q" />:{" "}
              {simulationResults.metrics.Wq.toFixed(4)} s
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Gráfico da Simulação
            </h4>
            <LineChart
              width={800}
              height={300}
              data={simulationResults.chartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="queueLength"
                stroke="var(--chart-1)"
              />
              <Line
                type="monotone"
                dataKey="serverUtilization"
                stroke="var(--chart-2)"
              />
            </LineChart>
          </div>
          <button
            onClick={() => {
              const newService = {
                name: `Simulação Discreta M/M/${numServers}`,
                arrivalQueue: "Chegada Discreta",
                serviceQueue: "Atendimento Discreto",
                metrics: simulationResults.metrics,
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
