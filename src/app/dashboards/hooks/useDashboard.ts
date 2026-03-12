"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../components/AuthContext";
import { getQueueRecords } from "../../../services/recordsService";
import { getServiceDefinitions } from "../../../services/serviceDefinitionService";
import { calculateMetrics } from "../utils/metricsCalculator";
import { QueueMetrics, ServiceDefinition } from "../../../types";
import { toast } from "react-toastify";

export function useDashboard() {
  const { user } = useAuth();
  const [services, setServices] = useState<ServiceDefinition[]>([]);
  const [selectedService, setSelectedService] =
    useState<ServiceDefinition | null>(null);
  const [maxN, setMaxN] = useState(10);
  const [metrics, setMetrics] = useState<QueueMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    getServiceDefinitions(user.uid).then(setServices);
  }, [user]);

  const calculate = useCallback(async () => {
    if (!user || !selectedService) {
      toast.warn("Selecione um serviço para calcular as métricas.");
      return;
    }
    setLoading(true);
    try {
      const allRecords = await getQueueRecords(user.uid, selectedService.id);

      // Filter records for this service's arrival and atendente queues
      const arrivalPrefix = "Chegada ";
      const servicePrefix = "Atendente "; // Matches my new naming in useChronometerPage

      // Pre-aggregate data for metrics calculator
      const processedRecords = allRecords.map((r) => {
        if (r.queue.startsWith(arrivalPrefix)) {
          return { ...r, queue: "SERVICE_ARRIVAL_POOL" };
        }
        if (r.queue.startsWith(servicePrefix)) {
          return { ...r, queue: "SERVICE_EFFORT_POOL" };
        }
        return r;
      });

      calculateMetrics(
        processedRecords,
        "SERVICE_ARRIVAL_POOL",
        "SERVICE_EFFORT_POOL",
        selectedService.numServers,
        maxN,
        (result) => setMetrics(result),
      );
    } catch (error) {
      console.error(error);
      toast.error("Erro ao calcular métricas.");
    } finally {
      setLoading(false);
    }
  }, [user, selectedService, maxN]);

  return {
    services,
    selectedService,
    setSelectedService,
    maxN,
    setMaxN,
    metrics,
    loading,
    calculate,
  };
}
