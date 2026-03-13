import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../components/AuthContext";
import { useQueues } from "../../../hooks/useQueues";
import { useQueueTotals } from "../../../hooks/useQueueTotals";
import { useQueueData } from "../../../hooks/useQueueData";
import { useActiveServices } from "../../../hooks/useActiveServices";

interface RecordType {
  queue: string;
  type: "arrival" | "service";
  timestamp: string;
  totalTime: number;
  element: number;
  arriving: string;
  exiting: string;
  serviceId: string;
}

export function useChronometers() {
  const { user } = useAuth();
  const {
    queues,
    addQueue: addQueueHook,
    deleteQueue: deleteQueueHook,
  } = useQueues(user?.uid || null);
  const {
    totals: queueTotals,
    updateTotal,
    deleteTotal,
  } = useQueueTotals(user?.uid || null);
  const { addRecord } = useQueueData(user?.uid || null);
  const { setActiveService, deleteActiveService } = useActiveServices(
    user?.uid || null,
  );

  const [newQueue, setNewQueue] = useState("");
  const [newQueueType, setNewQueueType] = useState<"arrival" | "service">(
    "arrival",
  );
  const [numAttendants, setNumAttendants] = useState(1);
  const [currentAppTimeMs, setCurrentAppTimeMs] = useState<number>(() =>
    Date.now(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAppTimeMs(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addQueue = async () => {
    if (
      newQueue.trim() &&
      !queues.some((queue) => queue.name === newQueue.trim())
    ) {
      try {
        await addQueueHook({
          name: newQueue.trim(),
          type: newQueueType,
          ...(newQueueType === "service" ? { numAttendants } : {}),
        });
        await setActiveService(newQueue.trim(), { currentServicing: [] });
        await updateTotal(newQueue.trim(), 0);
        toast.success("Fila adicionada com sucesso!");
        setNewQueue("");
      } catch (error) {
        toast.error(
          "Erro ao adicionar fila: " +
            (error instanceof Error ? error.message : String(error)),
        );
      }
    } else {
      toast.warn("Nome da fila inválido ou já existe.");
    }
  };

  const removeQueue = async (index: number) => {
    const queueToRemove = queues[index];
    try {
      await deleteQueueHook(queueToRemove.name);
      await deleteActiveService(queueToRemove.name);
      await deleteTotal(queueToRemove.name);
      toast.success("Fila removida com sucesso!");
    } catch (error) {
      toast.error(
        "Erro ao remover fila: " +
          (error instanceof Error ? error.message : String(error)),
      );
    }
  };

  const getNextElement = (queue: string) => {
    const current = queueTotals[queue] || 0;
    try {
      const next = current + 1;
      updateTotal(queue, next);
      return next;
    } catch (error) {
      console.error("Erro ao atualizar total da fila:", error);
      toast.error("Erro ao atualizar total da fila.");
      return current;
    }
  };

  const recordEvent = (record: RecordType) => {
    try {
      addRecord(record);
    } catch (error) {
      console.error("Erro ao registrar evento:", error);
      toast.error("Erro ao registrar evento.");
    }
  };

  return {
    queues,
    queueTotals,
    newQueue,
    setNewQueue,
    newQueueType,
    setNewQueueType,
    numAttendants,
    setNumAttendants,
    currentAppTimeMs,
    addQueue,
    removeQueue,
    getNextElement,
    recordEvent,
  };
}
