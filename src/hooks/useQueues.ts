import { useState, useEffect, useCallback } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { QueueAPI } from "../services/firebase/queue";
import { Queue } from "../types";

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
