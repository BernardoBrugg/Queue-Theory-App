# simulations

Página de simulação teórica M/M/c. Permite explorar métricas de sistemas de fila sem coleta de dados reais, usando estudos de caso pré-definidos ou parâmetros personalizados.

## Arquitetura

```
simulations/
├── page.tsx                         # Página principal (orquestrador)
├── hooks/
│   ├── useSimulationPage.ts         # Estado da página e cálculo M/M/c
│   └── useSimulations.ts            # Hook legado (não usado pela página atual)
├── components/
│   ├── StudySelector.tsx            # Painel de seleção com abas (Estudo / Personalizado)
│   ├── SimulationChartsGrid.tsx     # Grades de gráficos específicos para simulações
│   ├── CaseStudyCard.tsx            # Card de estudo de caso (componente legado)
│   ├── CustomSimulation.tsx         # Simulação personalizada (componente legado)
│   ├── LoadedServices.tsx           # Serviços carregados (componente legado)
│   ├── DiscreteEventSimulation.tsx  # Simulação discreta (componente legado)
│   ├── MonteCarloSimulation.tsx     # Monte Carlo (componente legado)
│   └── MarkovChainSimulation.tsx    # Cadeia de Markov (componente legado)
└── utils/
    └── caseStudies.ts               # Dados dos 5 estudos de caso pré-definidos
```

## Fluxo

1. O usuário seleciona uma aba: **Estudos de Caso** ou **Personalizado**
2. Em Estudos de Caso: escolhe um dos 5 estudos no dropdown e clica em "Visualizar"
3. Em Personalizado: insere λ, μ, c e maxN e clica em "Calcular"
4. O hook `useSimulationPage` calcula as métricas M/M/c
5. `MetricsPanel` (do módulo dashboards) exibe os indicadores
6. `SimulationChartsGrid` exibe gráficos de tempos, clientes, P(n) e fluxo acumulado

## Gráficos disponíveis (`SimulationChartsGrid`)

| Gráfico           | Dados                                             |
| ----------------- | ------------------------------------------------- |
| Tempos Médios     | W, Wq, 1/μ                                        |
| Clientes Médios   | L, Lq                                             |
| Distribuição P(n) | Array P[] das probabilidades de estado            |
| Fluxo Acumulado   | chartData dos estudos de caso (chegadas × saídas) |
