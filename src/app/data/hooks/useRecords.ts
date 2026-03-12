"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../components/AuthContext";
import { deleteQueueRecord } from "../../../services/recordsService";
import { getServiceDefinitions } from "../../../services/serviceDefinitionService";
import { QueueRecord, ServiceDefinition } from "../../../types";
import { db } from "../../../lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
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

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const q = query(
      collection(db, "users", user.uid, "records"),
      orderBy("timestamp", "desc"),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setRecords(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as QueueRecord),
        );
        setLoading(false);
      },
      () => {
        toast.error("Erro ao sincronizar registros.");
        setLoading(false);
      },
    );
    return () => unsub();
  }, [user]);

  const remove = async (id: string) => {
    if (!user || !id) return;
    await deleteQueueRecord(user.uid, id);
    toast.success("Registro removido.");
  };

  const exportCsv = (serviceId?: string) => {
    const toExport = serviceId
      ? records.filter((r) => r.serviceId === serviceId)
      : records;
    if (toExport.length === 0) {
      toast.warn("Nenhum dado para exportar.");
      return;
    }
    const headers = [
      "serviceId",
      "queue",
      "type",
      "timestamp",
      "element",
      "totalTime",
      "arriving",
      "exiting",
    ];
    const rows = toExport.map((r) =>
      headers
        .map((h) => (r as unknown as Record<string, unknown>)[h] ?? "")
        .join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cronapp-records.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    services,
    records,
    loading,
    remove,
    exportCsv,
  };
}
