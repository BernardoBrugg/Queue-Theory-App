import { QueueMetrics } from "../../../types";

export interface CaseStudy {
  name: string;
  description: string;
  metrics: QueueMetrics;
  chartData: { time: number; arrivals: number; departures: number }[];
}

export const caseStudies: CaseStudy[] = [
  {
    name: "Estudo de Caso 1: Sistema M/M/1 Estável",
    description:
      "Um sistema de fila simples com taxa de chegada λ = 0.5 clientes/min e taxa de serviço μ = 1 cliente/min. Sistema estável com ρ = 0.5.",
    metrics: {
      lambda: 0.5,
      mu: 1,
      rho: 0.5,
      L: 1,
      Lq: 0.5,
      W: 2,
      Wq: 1,
      P: [
        0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625, 0.0078125, 0.00390625,
        0.001953125, 0.0009765625, 0.00048828125,
      ],
      numServers: 1,
    },
    chartData: [
      { time: 0, arrivals: 0, departures: 0 },
      { time: 1, arrivals: 1, departures: 0 },
      { time: 2, arrivals: 1, departures: 1 },
      { time: 3, arrivals: 2, departures: 1 },
      { time: 4, arrivals: 2, departures: 2 },
      { time: 5, arrivals: 3, departures: 2 },
    ],
  },
  {
    name: "Estudo de Caso 2: Sistema M/M/1 Sobrecarregado",
    description:
      "Sistema com alta utilização ρ = 0.8, λ = 0.8, μ = 1. Mostra o impacto da sobrecarga.",
    metrics: {
      lambda: 0.8,
      mu: 1,
      rho: 0.8,
      L: 4,
      Lq: 3.2,
      W: 5,
      Wq: 4,
      P: [
        0.2, 0.16, 0.128, 0.1024, 0.08192, 0.065536, 0.0524288, 0.04194304,
        0.033554432, 0.0268435456, 0.02147483648,
      ],
      numServers: 1,
    },
    chartData: [
      { time: 0, arrivals: 0, departures: 0 },
      { time: 1, arrivals: 1, departures: 0 },
      { time: 2, arrivals: 2, departures: 0 },
      { time: 3, arrivals: 3, departures: 0 },
      { time: 4, arrivals: 4, departures: 1 },
      { time: 5, arrivals: 5, departures: 1 },
    ],
  },
  {
    name: "Estudo de Caso 3: Sistema Eficiente",
    description:
      "Sistema com baixa espera, λ = 0.2, μ = 2. ρ = 0.1, muito eficiente.",
    metrics: {
      lambda: 0.2,
      mu: 2,
      rho: 0.1,
      L: 0.1111,
      Lq: 0.01111,
      W: 0.5556,
      Wq: 0.0556,
      P: [
        0.9, 0.09, 0.009, 0.0009, 0.00009, 0.000009, 0.0000009, 0.00000009,
        0.000000009, 0.0000000009, 0.00000000009,
      ],
      numServers: 1,
    },
    chartData: [
      { time: 0, arrivals: 0, departures: 0 },
      { time: 1, arrivals: 1, departures: 1 },
      { time: 2, arrivals: 1, departures: 1 },
      { time: 3, arrivals: 2, departures: 2 },
      { time: 4, arrivals: 2, departures: 2 },
      { time: 5, arrivals: 3, departures: 3 },
    ],
  },
  {
    name: "Estudo de Caso 4: Sistema M/M/2 Estável",
    description:
      "Sistema com dois servidores, λ = 0.8 clientes/min, μ = 0.5 clientes/min por servidor. ρ = 0.8, sistema estável com múltiplos servidores.",
    metrics: {
      lambda: 0.8,
      mu: 0.5,
      rho: 0.8,
      L: 4.4444,
      Lq: 2.8444,
      W: 5.5555,
      Wq: 3.5555,
      P: [
        0.1111, 0.1778, 0.1422, 0.1138, 0.091, 0.0727, 0.0582, 0.0466, 0.0373,
        0.0298, 0.0239,
      ],
      numServers: 2,
    },
    chartData: [
      { time: 0, arrivals: 0, departures: 0 },
      { time: 1, arrivals: 1, departures: 0 },
      { time: 2, arrivals: 1, departures: 1 },
      { time: 3, arrivals: 2, departures: 1 },
      { time: 4, arrivals: 2, departures: 2 },
      { time: 5, arrivals: 3, departures: 2 },
    ],
  },
  {
    name: "Estudo de Caso 5: Sistema M/M/3 Eficiente",
    description:
      "Sistema com três servidores, λ = 1.2 clientes/min, μ = 0.5 clientes/min por servidor. ρ = 0.8, demonstra eficiência com mais servidores.",
    metrics: {
      lambda: 1.2,
      mu: 0.5,
      rho: 0.8,
      L: 4.9888,
      Lq: 2.5888,
      W: 4.1573,
      Wq: 2.1573,
      P: [
        0.0562, 0.1348, 0.1619, 0.1294, 0.1035, 0.0828, 0.0663, 0.053, 0.0424,
        0.0339, 0.0271,
      ],
      numServers: 3,
    },
    chartData: [
      { time: 0, arrivals: 0, departures: 0 },
      { time: 1, arrivals: 1, departures: 0 },
      { time: 2, arrivals: 2, departures: 1 },
      { time: 3, arrivals: 3, departures: 2 },
      { time: 4, arrivals: 3, departures: 3 },
      { time: 5, arrivals: 4, departures: 3 },
    ],
  },
];
