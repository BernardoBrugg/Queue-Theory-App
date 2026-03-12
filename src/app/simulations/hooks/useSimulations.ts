import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { QueueMetrics } from "../../../types";
import { CaseStudy } from "../utils/caseStudies";

export interface StoredService {
  id: string;
  name: string;
  arrivalQueue: string;
  serviceQueue: string;
  metrics: QueueMetrics;
  serviceTimes: number[];
  waitingTimes: number[];
  idleTimes: number[];
}

export function useSimulations() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("queueing-services");
      if (stored) {
        try {
          const services = JSON.parse(stored) as StoredService[];
          const cleaned = services.map((service) => ({
            ...service,
            metrics: {
              ...service.metrics,
              numServers: service.metrics.numServers || 1,
              P: service.metrics.P.map((p) =>
                typeof p === "number" && isFinite(p) && p !== null ? p : 0
              ),
            },
          }));
          localStorage.setItem("queueing-services", JSON.stringify(cleaned));
        } catch (e) {
          console.error("Error cleaning localStorage:", e);
        }
      }
    }
  }, []);

  const [services, setServices] = useState<StoredService[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("queueing-services");
      return stored
        ? (JSON.parse(stored) as StoredService[]).map((service) => ({
            ...service,
            metrics: {
              ...service.metrics,
              P: service.metrics.P.map((p) =>
                typeof p === "number" && isFinite(p) && p !== null ? p : 0
              ),
            },
          }))
        : [];
    }
    return [];
  });

  const saveServices = (newServices: StoredService[]) => {
    setServices(newServices);
    localStorage.setItem("queueing-services", JSON.stringify(newServices));
  };

  const loadCaseStudy = (study: CaseStudy) => {
    const newService: StoredService = {
      id: crypto.randomUUID(),
      name: study.name,
      arrivalQueue: "Chegada Exemplo",
      serviceQueue: "Atendimento Exemplo",
      metrics: study.metrics,
      serviceTimes: [],
      waitingTimes: [],
      idleTimes: [],
    };
    saveServices([...services, newService]);
    toast.success(`Estudo de caso "${study.name}" carregado com sucesso!`);
  };

  const handleAddService = (
    service: Omit<StoredService, "id" | "serviceTimes" | "waitingTimes" | "idleTimes">
  ) => {
    const newService: StoredService = {
      id: crypto.randomUUID(),
      name: service.name,
      arrivalQueue: service.arrivalQueue,
      serviceQueue: service.serviceQueue,
      metrics: service.metrics,
      serviceTimes: [],
      waitingTimes: [],
      idleTimes: [],
    };
    saveServices([...services, newService]);
  };

  return { services, loadCaseStudy, handleAddService };
}
