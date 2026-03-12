import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Chronometer } from "./Chronometer";

interface QueueItemProps {
  queue: { name: string; type: "arrival" | "service"; numAttendants?: number };
  index: number;
  removeQueue: (index: number) => void;
  getNextElement: (queue: string) => number;
  currentTotal: number;
  onRecord: (record: Omit<Record, "id">) => void;
  currentAppTimeMs: number;
}

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

export function QueueItem({
  queue,
  index,
  removeQueue,
  getNextElement,
  currentTotal,
  onRecord,
  currentAppTimeMs,
}: QueueItemProps) {
  return (
    <div className="bg-[var(--element-bg)] border-2 border-[var(--element-border)] rounded-[var(--border-radius-large)] p-6 shadow-lg hover:shadow-xl transition-all">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
          {queue.name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[var(--text-primary)] px-3 py-1 bg-[var(--element-bg)] border-2 border-[var(--element-border)] rounded-lg">
            {queue.type === "arrival" ? "Chegada" : "Atendimento"}
          </span>
          <button
            onClick={() => removeQueue(index)}
            className="btn-danger p-2 rounded-lg"
            title="Remover fila"
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
        </div>
      </div>
      <Chronometer
        queue={queue.name}
        type={queue.type}
        getNextElement={getNextElement}
        currentTotal={currentTotal}
        onRecord={onRecord}
        currentAppTimeMs={currentAppTimeMs}
        numAttendants={queue.numAttendants || 1}
      />
    </div>
  );
}
