import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Queue {
  name: string;
  type: "arrival" | "service";
}

interface DataRecord {
  id: string;
  queue: string;
  type: "arrival" | "service";
  timestamp: string;
  totalTime: number;
  element: number;
  arriving: string;
  exiting: string;
}

interface QueueSelectorProps {
  selectedArrivalQueue: string;
  setSelectedArrivalQueue: (value: string) => void;
  selectedServiceQueue: string;
  setSelectedServiceQueue: (value: string) => void;
  numServers: number;
  setNumServers: (value: number) => void;
  maxN: number;
  setMaxN: (value: number) => void;
  calculateQueueMetrics: () => void;
  arrivalQueues: Queue[];
  serviceQueues: Queue[];
  data: DataRecord[];
}

export function QueueSelector({
  selectedArrivalQueue,
  setSelectedArrivalQueue,
  selectedServiceQueue,
  setSelectedServiceQueue,
  numServers,
  setNumServers,
  maxN,
  setMaxN,
  calculateQueueMetrics,
  arrivalQueues,
  serviceQueues,
  data,
}: QueueSelectorProps) {
  const queueCounts = data.reduce((acc, d) => {
    const key = `${d.queue}-${d.type}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getCount = (queueName: string, type: "arrival" | "service") => queueCounts[`${queueName}-${type}`] || 0;

  const selectedArrivalCount = selectedArrivalQueue ? getCount(selectedArrivalQueue, "arrival") : null;
  const selectedServiceCount = selectedServiceQueue ? getCount(selectedServiceQueue, "service") : null;

  const filteredArrivalQueues = selectedServiceCount ? arrivalQueues.filter(q => getCount(q.name, "arrival") === selectedServiceCount) : arrivalQueues;
  const filteredServiceQueues = selectedArrivalCount ? serviceQueues.filter(q => getCount(q.name, "service") === selectedArrivalCount) : serviceQueues;

  return (
    <Card className="bg-[var(--element-bg)] border border-[var(--element-border)] p-6 rounded-lg shadow-sm hover:shadow-md transition-colors duration-200">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
        Atrelar Filas e Calcular Sistema de Filas
      </h2>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <div className="flex-1">
          <label className="block text-[var(--text-primary)] mb-2">
            Fila de Chegada
          </label>
          <Select
            value={selectedArrivalQueue}
            onValueChange={setSelectedArrivalQueue}
          >
            <SelectTrigger className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-300">
              <SelectValue placeholder="Selecione fila de chegada" />
            </SelectTrigger>
            <SelectContent>
              {filteredArrivalQueues.map((q) => (
                <SelectItem key={q.name} value={q.name}>
                  {q.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="block text-[var(--text-primary)] mb-2">
            Fila de Atendimento
          </label>
          <Select
            value={selectedServiceQueue}
            onValueChange={setSelectedServiceQueue}
          >
            <SelectTrigger className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-300">
              <SelectValue placeholder="Selecione fila de atendimento" />
            </SelectTrigger>
            <SelectContent>
              {filteredServiceQueues.map((q) => (
                <SelectItem key={q.name} value={q.name}>
                  {q.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="block text-[var(--text-primary)] mb-2">
            Número de Servidores
          </label>
          <input
            type="number"
            min="1"
            value={numServers}
            onChange={(e) => setNumServers(parseInt(e.target.value) || 1)}
            placeholder="Ex: 1 (M/M/1), 2 (M/M/2), etc."
            className="w-full px-4 py-3 border border-[var(--element-border)] rounded-xl bg-[var(--element-bg)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-300"
          />
        </div>
        <div className="flex-1">
          <label className="block text-[var(--text-primary)] mb-2">
            Número Máximo de Estados (n) para P(n)
          </label>
          <input
            type="number"
            min="0"
            value={maxN}
            onChange={(e) => setMaxN(parseInt(e.target.value) || 0)}
            placeholder="Ex: 10"
            className="w-full px-4 py-3 border border-[var(--element-border)] rounded-xl bg-[var(--element-bg)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-300"
          />
        </div>
        <div className="flex-1 flex items-end">
          <Button onClick={calculateQueueMetrics} className="w-full px-6 py-3">
            Calcular Métricas
          </Button>
        </div>
      </div>
    </Card>
  );
}
