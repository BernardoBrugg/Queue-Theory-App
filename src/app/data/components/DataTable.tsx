import React from "react";

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

interface DataTableProps {
  data: QueueRecord[];
  selectedArrivalQueue: string | null;
  selectedServiceQueues: string[];
  deleteRecord: (record: QueueRecord) => void;
  formatTime: (ms: number) => string;
  formatDateWithMilliseconds: (dateString: string) => string;
}

export function DataTable({
  data,
  selectedArrivalQueue,
  selectedServiceQueues,
  deleteRecord,
  formatTime,
  formatDateWithMilliseconds,
}: DataTableProps) {
  const filteredData = data.filter(
    (record) =>
      record.queue === selectedArrivalQueue ||
      selectedServiceQueues.includes(record.queue)
  );

  return (
    <div className="overflow-x-auto bg-[var(--element-bg)] border-2 border-[var(--element-border)] rounded-[var(--border-radius-large)] shadow-lg">
      <table className="w-full border-collapse">
        <thead className="bg-[var(--button-bg)]">
          <tr>
            <th className="px-6 py-4 text-left font-bold text-[var(--button-text)]">Tipo</th>
            <th className="px-6 py-4 text-left font-bold text-[var(--button-text)]">
              Carimbo de Data/Hora
            </th>
            <th className="px-6 py-4 text-left font-bold text-[var(--button-text)]">Tempo Total</th>
            <th className="px-6 py-4 text-left font-bold text-[var(--button-text)]">Elemento</th>
            <th className="px-6 py-4 text-left font-bold text-[var(--button-text)]">Chegando</th>
            <th className="px-6 py-4 text-left font-bold text-[var(--button-text)]">Saindo</th>
            <th className="px-6 py-4 text-left font-bold text-[var(--button-text)]">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((record, index) => (
            <tr
              key={index}
              className="hover:bg-[var(--accent-light)] transition-colors duration-300 bg-[var(--element-bg)]"
            >
              <td className="border-t-2 border-[var(--element-border)] px-6 py-4 text-[var(--text-primary)] font-medium">
                {record.type}
              </td>
              <td className="border-t-2 border-[var(--element-border)] px-6 py-4 text-[var(--text-primary)] font-medium">
                {formatDateWithMilliseconds(record.timestamp)}
              </td>
              <td className="border-t-2 border-[var(--element-border)] px-6 py-4 text-[var(--text-primary)] font-medium">
                {formatTime(record.totalTime)}
              </td>
              <td className="border-t-2 border-[var(--element-border)] px-6 py-4 text-[var(--text-primary)] font-medium">
                {record.element}
              </td>
              <td className="border-t-2 border-[var(--element-border)] px-6 py-4 text-[var(--text-primary)] font-medium">
                {formatDateWithMilliseconds(record.arriving)}
              </td>
              <td className="border-t-2 border-[var(--element-border)] px-6 py-4 text-[var(--text-primary)] font-medium">
                {record.exiting
                  ? formatDateWithMilliseconds(record.exiting)
                  : "--"}
              </td>
              <td className="border-t-2 border-[var(--element-border)] px-6 py-4">
                <button
                  onClick={() => deleteRecord(record)}
                  className="text-[var(--button-danger)] hover:text-[var(--button-danger-hover)] transition-colors duration-300 p-2 rounded-lg hover:bg-[var(--element-bg)] border border-[var(--element-border)]"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
