"use client";

import { Nav } from "../../components/Nav";
import { ServiceCard } from "./components/ServiceCard";
import { QueueSelector } from "./components/QueueSelector";
import { MetricsResults } from "./components/MetricsResults";
import { useDashboardMetrics } from "./hooks/useDashboardMetrics";

export default function Dashboards() {
  const {
    data,
    services,
    selectedArrivalQueue,
    setSelectedArrivalQueue,
    selectedServiceQueue,
    setSelectedServiceQueue,
    results,
    setResults,
    numServers,
    setNumServers,
    maxN,
    setMaxN,
    newServiceName,
    setNewServiceName,
    arrivalQueues,
    serviceQueues,
    getCumulativeData,
    calculateQueueMetrics,
    createService,
    deleteService,
    exportServiceToPDF,
    clearAllData,
  } = useDashboardMetrics();

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-[var(--bg-gradient-start)] via-[var(--element-bg)] to-[var(--bg-gradient-end)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] text-center flex-1">
              Dashboards
            </h1>
            <button
              onClick={clearAllData}
              className="px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
            >
              Limpar Dados
            </button>
          </div>
          <div
            className="mb-8"
            style={{ animationDelay: "0.2s" }}
          >
            <QueueSelector
              selectedArrivalQueue={selectedArrivalQueue}
              setSelectedArrivalQueue={setSelectedArrivalQueue}
              selectedServiceQueue={selectedServiceQueue}
              setSelectedServiceQueue={setSelectedServiceQueue}
              numServers={numServers}
              setNumServers={setNumServers}
              maxN={maxN}
              setMaxN={setMaxN}
              calculateQueueMetrics={calculateQueueMetrics}
              arrivalQueues={arrivalQueues}
              serviceQueues={serviceQueues}
              data={data}
            />
            <MetricsResults
              results={results}
              newServiceName={newServiceName}
              setNewServiceName={setNewServiceName}
              createService={createService}
            />
          </div>
          <div className="grid grid-cols-1 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                deleteService={deleteService}
                exportServiceToPDF={exportServiceToPDF}
                getCumulativeData={getCumulativeData}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
