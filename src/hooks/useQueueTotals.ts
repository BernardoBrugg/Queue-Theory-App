import { useState, useEffect, useCallback } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { QueueTotalsAPI } from "../services/firebase/queueTotals.rts";
import { QueueTotals } from "../types";

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
