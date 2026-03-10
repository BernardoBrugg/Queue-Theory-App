"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../components/AuthContext";
import { getQueueRecords, deleteQueueRecord } from "../../../services/recordsService";
import { getServiceDefinitions } from "../../../services/serviceDefinitionService";
import { QueueRecord, ServiceDefinition } from "../../../types";
import { toast } from "react-toastify";

export function useRecords() {
  const { user } = useAuth();
  const [records, setRecords] = useState<QueueRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const [services, setServices] = useState<ServiceDefinition[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceDefinition | null>(null);

  useEffect(() => {
    if (!user) return;
    getServiceDefinitions(user.uid).then((list) => {
      setServices(list);
      if (list.length > 0) setSelectedService(list[0]);
    });
  }, [user]);

  const load = useCallback(async () => {
    if (!user || !selectedService) {
      setRecords([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getQueueRecords(user.uid, selectedService.id);
      setRecords(data);
    } catch {
      toast.error("Erro ao carregar registros.");
    } finally {
      setLoading(false);
    }
  }, [user, selectedService]);

  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!user || !id) return;
    await deleteQueueRecord(user.uid, id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
    toast.success("Registro removido.");
  };

  const queues = [...new Set(records.map((r) => r.queue))].sort();
  const filtered = filter === "all" ? records : records.filter((r) => r.queue === filter);

  const exportCsv = () => {
    if (filtered.length === 0) { toast.warn("Nenhum dado para exportar."); return; }
    const headers = ["queue", "type", "timestamp", "element", "totalTime", "arriving", "exiting"];
    const rows = filtered.map((r) => headers.map((h) => (r as unknown as Record<string, unknown>)[h] ?? "").join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "cronapp-records.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return { 
    services, selectedService, setSelectedService,
    records: filtered, loading, queues, filter, setFilter, remove, exportCsv, reload: load 
  };
}
