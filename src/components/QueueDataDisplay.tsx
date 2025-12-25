import React from "react";
import { useQueueData, useQueues, useQueueTotals } from "../hooks/useData";
import { useAuth } from "./AuthContext";
import { QueueRecord } from "../types";

interface QueueDataDisplayProps {
  selectedQueue?: string;
  onRecordSelect?: (record: QueueRecord) => void;
}

export function QueueDataDisplay({ selectedQueue, onRecordSelect }: QueueDataDisplayProps) {
  const { user } = useAuth();
  const { data, loading: dataLoading, error: dataError, deleteRecord } = useQueueData(user?.uid || null);
  const { queues, loading: queuesLoading, error: queuesError } = useQueues(user?.uid || null);
  const { totals, loading: totalsLoading, error: totalsError } = useQueueTotals(user?.uid || null);

  const loading = dataLoading || queuesLoading || totalsLoading;
  const error = dataError || queuesError || totalsError;

  const filteredData = selectedQueue
    ? data.filter(record => record.queue === selectedQueue)
    : data;

  const handleDeleteRecord = async (record: QueueRecord) => {
    try {
      await deleteRecord(record.id);
    } catch (err) {
      console.error("Failed to delete record:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
        <span className="ml-2 text-[var(--text-secondary)]">Carregando dados...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Erro ao carregar dados: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Queue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--element-bg)] p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Total de Filas</h3>
          <p className="text-2xl font-bold text-[var(--accent)]">{queues.length}</p>
        </div>
        <div className="bg-[var(--element-bg)] p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Total de Registros</h3>
          <p className="text-2xl font-bold text-[var(--accent)]">{data.length}</p>
        </div>
        <div className="bg-[var(--element-bg)] p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Filas com Dados</h3>
          <p className="text-2xl font-bold text-[var(--accent)]">{Object.keys(totals).length}</p>
        </div>
      </div>

      {/* Queue List */}
      <div className="bg-[var(--element-bg)] rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-[var(--element-border)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Filas Disponíveis</h3>
        </div>
        <div className="p-4">
          {queues.length === 0 ? (
            <p className="text-[var(--text-secondary)]">Nenhuma fila encontrada.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {queues.map((queue) => (
                <div
                  key={queue.name}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedQueue === queue.name
                      ? "border-[var(--accent)] bg-[var(--accent-light)]"
                      : "border-[var(--element-border)] hover:border-[var(--accent)]"
                  }`}
                  onClick={() => onRecordSelect && onRecordSelect({} as QueueRecord)} // Placeholder for queue selection
                >
                  <h4 className="font-semibold text-[var(--text-primary)]">{queue.name}</h4>
                  <p className="text-sm text-[var(--text-secondary)] capitalize">{queue.type}</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Registros: {totals[queue.name] || 0}
                  </p>
                  {queue.numAttendants && (
                    <p className="text-sm text-[var(--text-secondary)]">
                      Atendentes: {queue.numAttendants}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Data Records */}
      {selectedQueue && (
        <div className="bg-[var(--element-bg)] rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-[var(--element-border)]">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Registros da Fila: {selectedQueue}
            </h3>
          </div>
          <div className="p-4">
            {filteredData.length === 0 ? (
              <p className="text-[var(--text-secondary)]">Nenhum registro encontrado para esta fila.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--element-border)]">
                      <th className="text-left p-2 text-[var(--text-primary)]">Tipo</th>
                      <th className="text-left p-2 text-[var(--text-primary)]">Elemento</th>
                      <th className="text-left p-2 text-[var(--text-primary)]">Tempo Total</th>
                      <th className="text-left p-2 text-[var(--text-primary)]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((record) => (
                      <tr
                        key={record.id}
                        className="border-b border-[var(--element-border)] hover:bg-[var(--text-muted)] cursor-pointer"
                        onClick={() => onRecordSelect && onRecordSelect(record)}
                      >
                        <td className="p-2 text-[var(--text-primary)] capitalize">{record.type}</td>
                        <td className="p-2 text-[var(--text-primary)]">{record.element}</td>
                        <td className="p-2 text-[var(--text-primary)]">
                          {(record.totalTime / 1000).toFixed(2)}s
                        </td>
                        <td className="p-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteRecord(record);
                            }}
                            className="text-red-500 hover:text-red-700 p-1 rounded"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}