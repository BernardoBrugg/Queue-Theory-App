"use client";

import { NavBar } from "../../components/NavBar";
import { caseStudies } from "./utils/caseStudies";

import { CaseStudyCard } from "./components/CaseStudyCard";
import { LoadedServices } from "./components/LoadedServices";
import { CustomSimulation } from "./components/CustomSimulation";
import { DiscreteEventSimulation } from "./components/DiscreteEventSimulation";
import { MonteCarloSimulation } from "./components/MonteCarloSimulation";
import { MarkovChainSimulation } from "./components/MarkovChainSimulation";

import { useSimulations } from "./hooks/useSimulations";

export default function Simulations() {
  const { services, loadCaseStudy, handleAddService } = useSimulations();

  return (
    <div className="page-container">
      <NavBar />
      <main style={{ padding: "2.5rem 1.5rem" }}>
        <div className="content-wrapper">
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "2rem" }}>
            Simulações e Estudos de Caso
          </h1>

          <div style={{ marginBottom: "2rem" }}>
            <h2 className="section-title">Estudos de Caso Pré-definidos</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
              {caseStudies.map((study, index) => (
                <CaseStudyCard key={index} study={study} onLoad={loadCaseStudy} />
              ))}
            </div>
          </div>

          <LoadedServices services={services} />
          <CustomSimulation onAddService={handleAddService} />
          <DiscreteEventSimulation onAddService={handleAddService} />
          <MonteCarloSimulation />
          <MarkovChainSimulation />
        </div>
      </main>
    </div>
  );
}

