import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AddQueueProps {
  newQueue: string;
  setNewQueue: (value: string) => void;
  newQueueType: "arrival" | "service";
  setNewQueueType: (value: "arrival" | "service") => void;
  numAttendants: number;
  setNumAttendants: (value: number) => void;
  addQueue: () => void;
}

export function AddQueue({
  newQueue,
  setNewQueue,
  newQueueType,
  setNewQueueType,
  numAttendants,
  setNumAttendants,
  addQueue,
}: AddQueueProps) {
  return (
    <div className="bg-[var(--element-bg)] border-2 border-[var(--element-border)] rounded-[var(--border-radius-large)] p-6 mb-6 shadow-lg">
      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Adicionar Nova Fila</h3>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          value={newQueue}
          onChange={(e) => setNewQueue(e.target.value)}
          placeholder="Nome da nova fila"
          className="flex-1 bg-[var(--input-bg)] text-[var(--input-text)] border-2 border-[var(--input-border)] rounded-[var(--border-radius)] px-4 py-3 focus:outline-none focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--input-focus)]/20 transition-all placeholder:text-[var(--text-muted)]"
        />
        <Select
          value={newQueueType}
          onValueChange={(value) =>
            setNewQueueType(value as "arrival" | "service")
          }
        >
          <SelectTrigger className="bg-[var(--input-bg)] text-[var(--input-text)] border-2 border-[var(--input-border)] rounded-[var(--border-radius)] px-4 py-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[var(--element-bg)] border-2 border-[var(--element-border)]">
            <SelectItem value="arrival" className="text-[var(--text-primary)]">Chegada</SelectItem>
            <SelectItem value="service" className="text-[var(--text-primary)]">Atendimento</SelectItem>
          </SelectContent>
        </Select>
        {newQueueType === "service" && (
          <input
            type="number"
            min="1"
            value={numAttendants}
            onChange={(e) => setNumAttendants(parseInt(e.target.value) || 1)}
            placeholder="Nº de Atendentes"
            className="bg-[var(--input-bg)] text-[var(--input-text)] border-2 border-[var(--input-border)] rounded-[var(--border-radius)] px-4 py-3 w-32 focus:outline-none focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--input-focus)]/20 transition-all placeholder:text-[var(--text-muted)]"
          />
        )}
        <button onClick={addQueue} className="btn-primary whitespace-nowrap">
          <svg
            className="w-5 h-5 inline mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Adicionar Fila
        </button>
      </div>
    </div>
  );
}
