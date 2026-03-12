"use client";

import { useState } from "react";
import { QueueMetrics } from "../../../types";
import { caseStudies, CaseStudy } from "../utils/caseStudies";

type SimulationTab = "case-study" | "custom";

interface CustomParams {
  lambda: number;
  mu: number;
  numServers: number;
  maxN: number;
}

function calculateMmc(
  lambda: number,
  mu: number,
  numServers: number,
  maxN: number,
): QueueMetrics | null {
  if (lambda <= 0 || mu <= 0 || numServers < 1) return null;
  const rho = lambda / (numServers * mu);
  if (rho >= 1) return null;

  const r = lambda / mu;

  let factC = 1;
  for (let i = 1; i <= numServers; i++) factC *= i;

  let sumProb = 0;
  for (let n = 0; n < numServers; n++) {
    let fact = 1;
    for (let i = 1; i <= n; i++) fact *= i;
    sumProb += Math.pow(r, n) / fact;
  }
  sumProb += (Math.pow(r, numServers) / factC) * (1 / (1 - rho));

  const P0 = 1 / sumProb;

  const P: number[] = [];
  for (let n = 0; n <= maxN; n++) {
    if (n < numServers) {
      let fact = 1;
      for (let i = 1; i <= n; i++) fact *= i;
      P[n] = P0 * (Math.pow(r, n) / fact);
    } else {
      P[n] =
        P0 * (Math.pow(r, n) / (factC * Math.pow(numServers, n - numServers)));
    }
  }

  const Lq =
    (P0 * Math.pow(r, numServers) * rho) / (factC * Math.pow(1 - rho, 2));
  const Wq = Lq / lambda;
  const W = Wq + 1 / mu;
  const L = lambda * W;

  return { lambda, mu, rho, L, Lq, W, Wq, P, numServers };
}

export function useSimulationPage() {
  const [activeTab, setActiveTab] = useState<SimulationTab>("case-study");
  const [selectedStudyIndex, setSelectedStudyIndex] = useState(0);
  const [customParams, setCustomParams] = useState<CustomParams>({
    lambda: 0.5,
    mu: 1,
    numServers: 1,
    maxN: 10,
  });
  const [metrics, setMetrics] = useState<QueueMetrics | null>(null);
  const [chartData, setChartData] = useState<
    { time: number; arrivals: number; departures: number }[]
  >([]);
  const [studyName, setStudyName] = useState("");
  const [error, setError] = useState("");

  const loadStudy = () => {
    const study: CaseStudy = caseStudies[selectedStudyIndex];
    setMetrics(study.metrics);
    setChartData(study.chartData);
    setStudyName(study.name);
    setError("");
  };

  const calculateCustom = () => {
    const { lambda, mu, numServers, maxN } = customParams;
    const result = calculateMmc(lambda, mu, numServers, maxN);
    if (!result) {
      setError(
        "Sistema instável: ρ ≥ 1 ou parâmetros inválidos. Reduza λ ou aumente μ e o número de servidores.",
      );
      setMetrics(null);
      return;
    }
    setMetrics(result);
    setChartData([]);
    setStudyName(`M/M/${numServers} Personalizado (λ=${lambda}, μ=${mu})`);
    setError("");
  };

  return {
    activeTab,
    setActiveTab,
    selectedStudyIndex,
    setSelectedStudyIndex,
    customParams,
    setCustomParams,
    metrics,
    chartData,
    studyName,
    error,
    loadStudy,
    calculateCustom,
    caseStudies,
  };
}
