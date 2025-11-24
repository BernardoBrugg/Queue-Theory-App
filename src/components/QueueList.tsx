import React, { useState } from "react";

interface QueueRecord {
  id: string;
  queue: string;
  type: "arrival" | "service";
  timestamp: string;
  totalTime: number;
  element: number;
  arriving: string;
  exiting: string;
}

interface QueueListProps {
  uniqueQueues: string[];
  data: QueueRecord[];
  onSelectQueue: (queueName: string) => void;
  onDeleteQueue: (queueName: string) => void;
  onRenameQueue: (oldName: string, newName: string) => void;
}

export function QueueList({
  uniqueQueues,
  data,
  onSelectQueue,
  onDeleteQueue,
  onRenameQueue,
}: QueueListProps) {
  const [editingQueue, setEditingQueue] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {uniqueQueues.map((queueName) => {
        const queueData = data.filter((r) => r.queue === queueName);
        const arrivalsCount = queueData.filter(
          (r) => r.type === "arrival"
        ).length;
        const servicesCount = queueData.filter(
          (r) => r.type === "service"
        ).length;
        return (
          <div
            key={queueName}
            className="bg-[var(--bg-secondary)] p-4 rounded-lg shadow-md cursor-pointer hover:bg-[var(--bg-hover)] transition-colors"
            onClick={() => editingQueue !== queueName && onSelectQueue(queueName)}
          >
            {editingQueue === queueName ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="text-lg font-semibold text-[var(--text-primary)] mb-2 w-full border rounded px-2 py-1"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                {queueName}
              </h3>
            )}
            <p>
              <strong>Total de Registros:</strong> {queueData.length}
            </p>
            <p>
              <strong>Chegadas:</strong> {arrivalsCount}
            </p>
            <p>
              <strong>Atendimentos:</strong> {servicesCount}
            </p>
            <div className="mt-2 flex gap-2">
              {editingQueue === queueName ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRenameQueue(queueName, newName);
                      setEditingQueue(null);
                    }}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingQueue(null);
                    }}
                    className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingQueue(queueName);
                      setNewName(queueName);
                    }}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={async (e) => {
                      console.log("Delete button clicked for", queueName);
                      e.stopPropagation();
                      await onDeleteQueue(queueName);
                    }}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Excluir
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
