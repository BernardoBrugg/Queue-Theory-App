"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../components/AuthContext";
import {
  createServiceDefinition,
  deleteServiceDefinition,
  getServiceDefinitions,
} from "../../../services/serviceDefinitionService";
import { deleteAllRecordsForService } from "../../../services/recordsService";
import { db } from "../../../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { ServiceDefinition } from "../../../types";

export function useServiceDefinitions() {
  const { user } = useAuth();
  const [services, setServices] = useState<ServiceDefinition[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const list = await getServiceDefinitions(user.uid);
      setServices(list);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const create = async (data: Omit<ServiceDefinition, "id" | "createdAt">) => {
    if (!user) return;
    await createServiceDefinition(user.uid, data);
    await load();
  };

  const remove = async (id: string) => {
    if (!user) return;
    // Cascade: delete all chronometer records and active session for this service
    await Promise.all([
      deleteAllRecordsForService(user.uid, id),
      deleteDoc(doc(db, "users", user.uid, "activeServiceSessions", id)),
    ]);
    await deleteServiceDefinition(user.uid, id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return { services, loading, create, remove };
}
