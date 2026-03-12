"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../components/AuthContext";
import { getServiceDefinitions } from "../../../services/serviceDefinitionService";
import { calculateMetrics } from "../utils/metricsCalculator";
import { QueueMetrics, QueueRecord, ServiceDefinition } from "../../../types";
import { db } from "../../../lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
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

  useEffect(() => {
    if (!user || !selectedService) {
      setMetrics(null);
      return;
    }
    setLoading(true);
    const q = query(
      collection(db, "users", user.uid, "records"),
      where("serviceId", "==", selectedService.id),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const allRecords = snap.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as QueueRecord,
        );
        const processedRecords = allRecords.map((r) => {
          if (r.queue.startsWith("Chegada "))
            return { ...r, queue: "SERVICE_ARRIVAL_POOL" };
          if (r.queue.startsWith("Atendente "))
            return { ...r, queue: "SERVICE_EFFORT_POOL" };
          return r;
        });
        calculateMetrics(
          processedRecords,
          "SERVICE_ARRIVAL_POOL",
          "SERVICE_EFFORT_POOL",
          selectedService.numServers,
          maxN,
          (result) => {
            setMetrics(result);
            setLoading(false);
          },
        );
      },
      (error) => {
        console.error(error);
        toast.error("Erro ao sincronizar métricas.");
        setLoading(false);
      },
    );
    return () => unsub();
  }, [user, selectedService, maxN]);

  return {
    services,
    selectedService,
    setSelectedService,
    maxN,
    setMaxN,
    metrics,
    loading,
  };
}
