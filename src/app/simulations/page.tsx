"use client";

import { BarChart2 } from "lucide-react";
import { NavBar } from "../../components/NavBar";
import { MetricsPanel } from "../dashboards/components/MetricsPanel";
import { StudySelector } from "./components/StudySelector";
import { SimulationChartsGrid } from "./components/SimulationChartsGrid";
import { useSimulationPage } from "./hooks/useSimulationPage";

export default function Simulations() {
  const {
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
  } = useSimulationPage();

  return (
    <div className="page-container">
      <NavBar />
      <main style={{ padding: "2.5rem 1.5rem" }}>
        <div className="content-wrapper">
          <div style={{ marginBottom: "2rem" }}>
            <div
              className="badge badge-accent"
              style={{ marginBottom: "0.5rem" }}
            >
              Análise Teórica
            </div>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "0.25rem",
              }}
            >
              Simulações M/M/c
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Selecione um estudo de caso pré-definido ou configure parâmetros
              personalizados para visualizar as métricas do sistema.
            </p>
          </div>

          <StudySelector
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedStudyIndex={selectedStudyIndex}
            setSelectedStudyIndex={setSelectedStudyIndex}
            customParams={customParams}
            setCustomParams={setCustomParams}
            onLoadStudy={loadStudy}
            onCalculateCustom={calculateCustom}
            error={error}
          />

          {metrics && (
            <div className="animate-slide-up">
              {studyName && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    marginBottom: "1.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Resultados — {studyName}
                </p>
              )}
              <MetricsPanel metrics={metrics} />
              <div style={{ marginTop: "1.25rem" }}>
                <SimulationChartsGrid metrics={metrics} chartData={chartData} />
              </div>
            </div>
          )}

          {!metrics && (
            <div
              className="glass-card"
              style={{ padding: "3rem", textAlign: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "0.75rem",
                  color: "var(--text-muted)",
                }}
              >
                <BarChart2 className="w-12 h-12" />
              </div>
              <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                Nenhuma simulação carregada ainda.
              </p>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                  marginTop: "0.375rem",
                }}
              >
                Selecione um estudo de caso ou insira parâmetros personalizados
                acima.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
