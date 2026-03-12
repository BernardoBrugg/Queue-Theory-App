import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { QueueMetrics, StoredService } from "../../../types";
import { useAuth } from "../../../components/AuthContext";
import { useQueueData } from "../../../hooks/useQueueData";
import { useQueues } from "../../../hooks/useQueues";
import { calculateMetrics } from "../utils/metricsCalculator";

import { calculateCumulativeData } from "../utils/chartDataCalculator";

export function useDashboardMetrics() {
  const { user } = useAuth();
  const { data } = useQueueData(user?.uid || null);
  const { queues } = useQueues(user?.uid || null);

  const [services, setServices] = useState<StoredService[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("queueing-services");
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.error("Error parsing services from localStorage:", e);
        localStorage.removeItem("queueing-services");
        return [];
      }
    }
    return [];
  });

  const [selectedArrivalQueue, setSelectedArrivalQueue] = useState("");
  const [selectedServiceQueue, setSelectedServiceQueue] = useState("");
  const [results, setResults] = useState<QueueMetrics | null>(null);
  const [numServers, setNumServers] = useState(1);
  const [maxN, setMaxN] = useState(10);
  const [newServiceName, setNewServiceName] = useState("");

  const getCumulativeData = useCallback(
    (service: StoredService) => {
      return calculateCumulativeData(data, service);
    },
    [data]
  );

  const calculateQueueMetrics = () => {
    calculateMetrics(
      data,
      selectedArrivalQueue,
      selectedServiceQueue,
      numServers,
      maxN,
      setResults
    );
  };

  const createService = () => {
    if (!newServiceName.trim() || !results) {
      toast.warn("Nome do serviço e resultados são necessários.");
      return;
    }
    if (services.length >= 1) {
      toast.warn(
        "Apenas 1 serviço pode ser criado por vez. Exclua o serviço atual para adicionar outro."
      );
      return;
    }
    const { interArrivals, serviceTimes, timestamps, ...metricsWithoutInter } = results;
    const newService: StoredService = {
      id: `service-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newServiceName.trim(),
      arrivalQueue: selectedArrivalQueue,
      serviceQueue: selectedServiceQueue,
      metrics: metricsWithoutInter,
      serviceTimes: serviceTimes || [],
      timestamps: timestamps || [],
      interArrivals: interArrivals || [],
    };
    const updatedServices = [...services, newService];
    try {
      localStorage.setItem("queueing-services", JSON.stringify(updatedServices));
      setServices(updatedServices);
      toast.success("Serviço criado com sucesso!");
    } catch {
      toast.error("Erro ao salvar serviço: armazenamento local cheio.");
      return;
    }
    setNewServiceName("");
    setSelectedArrivalQueue("");
    setSelectedServiceQueue("");
    setResults(null);
  };

  const deleteService = (index: number) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
      const updatedServices = services.filter((_, i) => i !== index);
      setServices(updatedServices);
      localStorage.setItem("queueing-services", JSON.stringify(updatedServices));
      toast.success("Serviço excluído com sucesso!");
    }
  };

  const exportServiceToPDF = () => {
    toast.info("Export to PDF not implemented yet.");
  };

  const clearAllData = () => {
    if (
      confirm("Tem certeza que deseja limpar TODOS os dados armazenados? Esta ação afetará todos os usuários.")
    ) {
      setServices([]);
      localStorage.removeItem("queueing-services");
      toast.success("Todos os dados foram limpos com sucesso!");
    }
  };

  const arrivalQueues = queues.filter((q) => q.type === "arrival");
  const serviceQueues = queues.filter((q) => q.type === "service");

  return {
    data,
    queues,
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
  };
}
