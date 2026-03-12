import { useState, useEffect, useCallback } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { QueueDataAPI } from "../services/firebase/queueData.rts";
import { QueueRecord } from "../types";

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
