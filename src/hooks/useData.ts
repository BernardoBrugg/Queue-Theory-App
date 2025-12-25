import { useState, useEffect, useCallback } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  QueueDataAPI,
  QueueAPI,
  QueueTotalsAPI,
  ActiveServicesAPI,
} from "../api/queue";
import { QueueRecord, Queue, QueueTotals } from "../types";

// Hook for managing queue data with real-time updates
export function useQueueData(userId: string | null) {
  const [data, setData] = useState<QueueRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, "users", userId, "data"),
      (snapshot) => {
        try {
          const records = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as QueueRecord));
          setData(records);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load data");
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

  const api = userId ? new QueueDataAPI(userId) : null;

  const addRecord = useCallback(async (record: Omit<QueueRecord, 'id'>) => {
    if (!api) throw new Error("User not authenticated");
    try {
      await api.addRecord(record);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add record");
      throw err;
    }
  }, [api]);

  const updateRecord = useCallback(async (id: string, updates: Partial<QueueRecord>) => {
    if (!api) throw new Error("User not authenticated");
    try {
      await api.updateRecord(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update record");
      throw err;
    }
  }, [api]);

  const deleteRecord = useCallback(async (id: string) => {
    if (!api) throw new Error("User not authenticated");
    try {
      await api.deleteRecord(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete record");
      throw err;
    }
  }, [api]);

  const deleteRecordsByQueue = useCallback(async (queueName: string) => {
    if (!api) throw new Error("User not authenticated");
    try {
      await api.deleteRecordsByQueue(queueName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete records");
      throw err;
    }
  }, [api]);

  return {
    data,
    loading,
    error,
    addRecord,
    updateRecord,
    deleteRecord,
    deleteRecordsByQueue,
  };
}

// Hook for managing queues with real-time updates
export function useQueues(userId: string | null) {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setQueues([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, "users", userId, "queues"),
      (snapshot) => {
        try {
          const queuesData = snapshot.docs.map(doc => doc.data() as Queue);
          setQueues(queuesData);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load queues");
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

  const api = userId ? new QueueAPI(userId) : null;

  const addQueue = useCallback(async (queue: Queue) => {
    if (!api) throw new Error("User not authenticated");
    try {
      await api.addQueue(queue);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add queue");
      throw err;
    }
  }, [api]);

  const updateQueue = useCallback(async (name: string, updates: Partial<Queue>) => {
    if (!api) throw new Error("User not authenticated");
    try {
      await api.updateQueue(name, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update queue");
      throw err;
    }
  }, [api]);

  const deleteQueue = useCallback(async (name: string) => {
    if (!api) throw new Error("User not authenticated");
    try {
      await api.deleteQueue(name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete queue");
      throw err;
    }
  }, [api]);

  const renameQueue = useCallback(async (oldName: string, newName: string) => {
    if (!api) throw new Error("User not authenticated");
    try {
      await api.renameQueue(oldName, newName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to rename queue");
      throw err;
    }
  }, [api]);

  return {
    queues,
    loading,
    error,
    addQueue,
    updateQueue,
    deleteQueue,
    renameQueue,
  };
}

// Hook for managing queue totals with real-time updates
export function useQueueTotals(userId: string | null) {
  const [totals, setTotals] = useState<QueueTotals>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setTotals({});
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, "users", userId, "totals"),
      (snapshot) => {
        try {
          const totalsData: QueueTotals = {};
          snapshot.docs.forEach(doc => {
            totalsData[doc.id] = doc.data().total;
          });
          setTotals(totalsData);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load totals");
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

  const api = userId ? new QueueTotalsAPI(userId) : null;

  const updateTotal = useCallback(async (queueName: string, total: number) => {
    if (!api) throw new Error("User not authenticated");
    try {
      await api.updateTotal(queueName, total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update total");
      throw err;
    }
  }, [api]);

  const deleteTotal = useCallback(async (queueName: string) => {
    if (!api) throw new Error("User not authenticated");
    try {
      await api.deleteTotal(queueName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete total");
      throw err;
    }
  }, [api]);

  return {
    totals,
    loading,
    error,
    updateTotal,
    deleteTotal,
  };
}

// Hook for managing active services
export function useActiveServices(userId: string | null) {
  const [activeServices, setActiveServices] = useState<{ [queueName: string]: any }>({});
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
          const servicesData: { [queueName: string]: any } = {};
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

  const setActiveService = useCallback(async (queueName: string, serviceData: any) => {
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