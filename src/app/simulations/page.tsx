"use client";

import { Nav } from "../../components/Nav";
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
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-[var(--bg-gradient-start)] via-[var(--element-bg)] to-[var(--bg-gradient-end)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] mb-8 text-center">
            Simulações e Estudos de Caso
          </h1>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              Estudos de Caso Pré-definidos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((study, index) => (
                <CaseStudyCard
                  key={index}
                  study={study}
                  onLoad={loadCaseStudy}
                />
              ))}
            </div>
          </div>

          <LoadedServices services={services} />
          <CustomSimulation onAddService={handleAddService} />
          <DiscreteEventSimulation onAddService={handleAddService} />
          <MonteCarloSimulation />
          <MarkovChainSimulation />
        </div>
      </div>
    </>
  );
}
