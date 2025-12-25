"use client";

import { useState, useEffect, useMemo } from "react";
import { Nav } from "../../components/Nav";
import { AddQueue } from "../../components/AddQueue";
import { QueueItem } from "../../components/QueueItem";
import { toast } from "react-toastify";
import { useAuth } from "../../components/AuthContext";
import { useQueues, useQueueTotals, useQueueData, useActiveServices } from "../../hooks/useData";

interface Record {
  id: string;
  queue: string;
  type: "arrival" | "service";
  timestamp: string;
  totalTime: number;
  element: number;
  arriving: string;
  exiting: string;
}

export default function Chronometers() {
  const { user } = useAuth();
  const { queues, addQueue: addQueueHook, deleteQueue: deleteQueueHook, loading: queuesLoading, error: queuesError } = useQueues(user?.uid || null);
  const { totals: queueTotals, updateTotal, deleteTotal, loading: totalsLoading, error: totalsError } = useQueueTotals(user?.uid || null);
  const { addRecord, loading: dataLoading, error: dataError } = useQueueData(user?.uid || null);
  const { setActiveService, deleteActiveService, loading: activeServicesLoading, error: activeServicesError } = useActiveServices(user?.uid || null);

  const [newQueue, setNewQueue] = useState("");
  const [newQueueType, setNewQueueType] = useState<"arrival" | "service">(
    "arrival"
  );
  const [numAttendants, setNumAttendants] = useState(1);

  const [currentAppTimeMs, setCurrentAppTimeMs] = useState(() => Date.now());
  const currentAppTime = useMemo(
    () => new Date(currentAppTimeMs),
    [currentAppTimeMs]
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
        await setActiveService(newQueue.trim(), {
          currentServicing: [],
        });
        await updateTotal(newQueue.trim(), 0);
        toast.success("Fila adicionada com sucesso!");
        setNewQueue("");
      } catch (error) {
        toast.error(
          "Erro ao adicionar fila: " +
            (error instanceof Error ? error.message : String(error))
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
          (error instanceof Error ? error.message : String(error))
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

  const recordEvent = (record: Omit<Record, "id">) => {
    try {
      addRecord(record);
    } catch (error) {
      console.error("Erro ao registrar evento:", error);
      toast.error("Erro ao registrar evento.");
    }
  };

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-[var(--bg-gradient-start)] via-[var(--element-bg)] to-[var(--bg-gradient-end)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">
            Cronômetros
          </h1>
          <div className="mb-8">
            <AddQueue
              newQueue={newQueue}
              setNewQueue={setNewQueue}
              newQueueType={newQueueType}
              setNewQueueType={setNewQueueType}
              numAttendants={numAttendants}
              setNumAttendants={setNumAttendants}
              addQueue={addQueue}
            />
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
              Filas Ativas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {queues.map((queue, index) => (
              <QueueItem
                key={index}
                queue={queue}
                index={index}
                removeQueue={removeQueue}
                getNextElement={getNextElement}
                currentTotal={queueTotals[queue.name] || 0}
                onRecord={recordEvent}
                currentAppTimeMs={currentAppTimeMs}
              />
            ))}
          </div>
          {queues.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--text-secondary)] text-lg">
                Nenhuma fila configurada. Adicione uma fila acima para começar.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
