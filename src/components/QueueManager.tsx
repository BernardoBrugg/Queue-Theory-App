import React, { useState } from "react";
import { useQueues, useQueueTotals, useActiveServices } from "../hooks/useData";
import { useAuth } from "./AuthContext";
import { Queue } from "../types";
import { toast } from "react-toastify";

interface QueueManagerProps {
  onQueueSelect?: (queueName: string) => void;
  selectedQueue?: string;
}

export function QueueManager({ onQueueSelect, selectedQueue }: QueueManagerProps) {
  const { user } = useAuth();
  const { queues, loading: queuesLoading, error: queuesError, addQueue, updateQueue, deleteQueue, renameQueue } = useQueues(user?.uid || null);
  const { totals, loading: totalsLoading } = useQueueTotals(user?.uid || null);
  const { activeServices, loading: servicesLoading, deleteActiveService } = useActiveServices(user?.uid || null);

  const [isAddingQueue, setIsAddingQueue] = useState(false);
  const [editingQueue, setEditingQueue] = useState<string | null>(null);
  const [newQueueName, setNewQueueName] = useState("");
  const [newQueueType, setNewQueueType] = useState<"arrival" | "service">("arrival");
  const [newQueueAttendants, setNewQueueAttendants] = useState<number>(1);

  const loading = queuesLoading || totalsLoading || servicesLoading;
  const error = queuesError;

  const handleAddQueue = async () => {
    if (!newQueueName.trim()) {
      toast.error("Nome da fila é obrigatório");
      return;
    }

    if (queues.some(q => q.name === newQueueName.trim())) {
      toast.error("Já existe uma fila com este nome");
      return;
    }

    try {
      await addQueue({
        name: newQueueName.trim(),
        type: newQueueType,
        numAttendants: newQueueType === "service" ? newQueueAttendants : undefined,
      });

      setNewQueueName("");
      setNewQueueType("arrival");
      setNewQueueAttendants(1);
      setIsAddingQueue(false);
      toast.success("Fila adicionada com sucesso!");
    } catch (err) {
      toast.error("Erro ao adicionar fila");
      console.error(err);
    }
  };

  const handleDeleteQueue = async (queueName: string) => {
    if (!confirm(`Tem certeza que deseja excluir a fila "${queueName}" e todos os seus dados?`)) {
      return;
    }

    try {
      if (activeServices[queueName]) {
        await deleteActiveService(queueName);
      }

      await deleteQueue(queueName);

      toast.success(`Fila "${queueName}" excluída com sucesso!`);
    } catch (err) {
      toast.error("Erro ao excluir fila");
      console.error(err);
    }
  };

  const handleRenameQueue = async (oldName: string, newName: string) => {
    if (!newName.trim()) {
      toast.error("Novo nome é obrigatório");
      return;
    }

    if (oldName === newName.trim()) {
      setEditingQueue(null);
      return;
    }

    if (queues.some(q => q.name === newName.trim())) {
      toast.error("Já existe uma fila com este nome");
      return;
    }

    try {
      await renameQueue(oldName, newName.trim());
      setEditingQueue(null);
      toast.success(`Fila renomeada para "${newName.trim()}"`);
    } catch (err) {
      toast.error("Erro ao renomear fila");
      console.error(err);
    }
  };

  const handleUpdateQueue = async (queueName: string, updates: Partial<Queue>) => {
    try {
      await updateQueue(queueName, updates);
      toast.success("Fila atualizada com sucesso!");
    } catch (err) {
      toast.error("Erro ao atualizar fila");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-[var(--element-bg)] border-2 border-[var(--element-border)] rounded-[var(--border-radius-large)] shadow-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--button-bg)]"></div>
        <span className="ml-2 text-[var(--text-primary)] font-medium">Carregando filas...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-[var(--button-danger)] border-2 border-[var(--button-danger-hover)] rounded-[var(--border-radius-large)] shadow-lg">
        <p className="text-white font-medium">Erro ao carregar filas: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[var(--element-bg)] border-2 border-[var(--element-border)] rounded-[var(--border-radius-large)] p-6 shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Gerenciar Filas</h2>
        <button
          onClick={() => setIsAddingQueue(true)}
          className="btn-primary"
        >
          + Adicionar Fila
        </button>
      </div>

      {isAddingQueue && (
        <div className="bg-[var(--element-bg)] p-6 rounded-[var(--border-radius-large)] shadow-lg border-2 border-[var(--element-border)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Adicionar Nova Fila</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                Nome da Fila
              </label>
              <input
                type="text"
                value={newQueueName}
                onChange={(e) => setNewQueueName(e.target.value)}
                className="input-standard"
                placeholder="Digite o nome da fila"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                Tipo
              </label>
              <select
                value={newQueueType}
                onChange={(e) => setNewQueueType(e.target.value as "arrival" | "service")}
                className="input-standard"
              >
                <option value="arrival">Chegada</option>
                <option value="service">Serviço</option>
              </select>
            </div>
            {newQueueType === "service" && (
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                  Número de Atendentes
                </label>
                <input
                  type="number"
                  min="1"
                  value={newQueueAttendants}
                  onChange={(e) => setNewQueueAttendants(parseInt(e.target.value) || 1)}
                  className="input-standard"
                />
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleAddQueue}
                className="btn-success"
              >
                Adicionar
              </button>
              <button
                onClick={() => {
                  setIsAddingQueue(false);
                  setNewQueueName("");
                  setNewQueueType("arrival");
                  setNewQueueAttendants(1);
                }}
                className="bg-[var(--text-muted)] text-[var(--button-text)] px-6 py-3 rounded-[var(--border-radius)] font-semibold hover:bg-[var(--text-secondary)] transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[var(--element-bg)] rounded-[var(--border-radius-large)] shadow-lg overflow-hidden border-2 border-[var(--element-border)]">
        <div className="p-4 border-b-2 border-[var(--element-border)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Filas ({queues.length})
          </h3>
        </div>
        <div className="divide-y-2 divide-[var(--element-border)]">
          {queues.length === 0 ? (
            <div className="p-8 text-center bg-[var(--element-bg)]">
              <p className="text-[var(--text-primary)] font-medium">Nenhuma fila encontrada.</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Clique em "Adicionar Fila" para criar sua primeira fila.
              </p>
            </div>
          ) : (
            queues.map((queue) => (
              <div
                key={queue.name}
                className={`p-4 hover:bg-[var(--accent-light)] transition-colors cursor-pointer bg-[var(--element-bg)] ${
                  selectedQueue === queue.name ? "bg-[var(--accent-light)] border-l-4 border-[var(--button-bg)]" : ""
                }`}
                onClick={() => onQueueSelect && onQueueSelect(queue.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {editingQueue === queue.name ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          defaultValue={queue.name}
                          className="input-standard"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleRenameQueue(queue.name, (e.target as HTMLInputElement).value);
                            } else if (e.key === "Escape") {
                              setEditingQueue(null);
                            }
                          }}
                          onBlur={(e) => {
                            const newName = e.target.value;
                            if (newName !== queue.name) {
                              handleRenameQueue(queue.name, newName);
                            } else {
                              setEditingQueue(null);
                            }
                          }}
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)]">{queue.name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-[var(--text-primary)] font-medium capitalize">
                            {queue.type === "arrival" ? "Chegada" : "Serviço"}
                          </span>
                          <span className="text-sm text-[var(--text-primary)] font-medium">
                            Registros: {totals[queue.name] || 0}
                          </span>
                          {queue.numAttendants && (
                            <span className="text-sm text-[var(--text-primary)] font-medium">
                              Atendentes: {queue.numAttendants}
                            </span>
                          )}
                          {activeServices[queue.name] && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[var(--button-success)] text-[var(--button-text)] font-semibold">
                              Ativo
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingQueue(queue.name);
                      }}
                      className="p-2 text-[var(--button-bg)] hover:text-[var(--button-hover)] transition-colors rounded-lg bg-[var(--element-bg)] border border-[var(--element-border)]"
                      title="Renomear"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteQueue(queue.name);
                      }}
                      className="p-2 text-[var(--button-danger)] hover:text-[var(--button-danger-hover)] transition-colors rounded-lg bg-[var(--element-bg)] border border-[var(--element-border)]"
                      title="Excluir"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}