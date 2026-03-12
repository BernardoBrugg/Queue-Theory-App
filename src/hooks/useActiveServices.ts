import { useState, useEffect, useCallback } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { ActiveServicesAPI } from "../services/firebase/activeServices.rts";

export function useActiveServices(userId: string | null) {
  const [activeServices, setActiveServices] = useState<{ [queueName: string]: Record<string, unknown> }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setActiveServices({});
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, "users", userId, "activeServices"),
      (snapshot) => {
        try {
          const servicesData: { [queueName: string]: Record<string, unknown> } = {};
          snapshot.docs.forEach(doc => {
            servicesData[doc.id] = doc.data();
          });
          setActiveServices(servicesData);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load active services");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const api = userId ? new ActiveServicesAPI(userId) : null;

  const setActiveService = useCallback(async (queueName: string, serviceData: Record<string, unknown>) => {
    if (!api) throw new Error("User not authenticated");
    try {
      await api.setActiveService(queueName, serviceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set active service");
      throw err;
    }
  }, [api]);

  const deleteActiveService = useCallback(async (queueName: string) => {
    if (!api) throw new Error("User not authenticated");
    try {
      await api.deleteActiveService(queueName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete active service");
      throw err;
    }
  }, [api]);

  return {
    activeServices,
    loading,
    error,
    setActiveService,
    deleteActiveService,
  };
}
