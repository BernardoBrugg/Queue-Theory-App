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

  const [services, setServices] = useState<ServiceDefinition[]>([]);

  useEffect(() => {
    if (!user) return;
    getServiceDefinitions(user.uid).then((list) => {
      setServices(list);
    });
  }, [user]);

  const load = useCallback(async () => {
    if (!user) {
      setRecords([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getQueueRecords(user.uid);
      setRecords(data);
    } catch {
      toast.error("Erro ao carregar registros.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!user || !id) return;
    await deleteQueueRecord(user.uid, id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
    toast.success("Registro removido.");
  };

  const exportCsv = (serviceId?: string) => {
    const toExport = serviceId ? records.filter(r => r.serviceId === serviceId) : records;
    if (toExport.length === 0) { toast.warn("Nenhum dado para exportar."); return; }
    const headers = ["serviceId", "queue", "type", "timestamp", "element", "totalTime", "arriving", "exiting"];
    const rows = toExport.map((r) => headers.map((h) => (r as unknown as Record<string, unknown>)[h] ?? "").join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "cronapp-records.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return { 
    services, 
    records, loading, remove, exportCsv, reload: load 
  };
}
