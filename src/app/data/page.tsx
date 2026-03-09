"use client";

import { useState } from "react";
import { useAuth } from "../../components/AuthContext";
import { useQueueData } from "../../hooks/useQueueData";
import { QueueRecord } from "../../types";
import { Nav } from "../../components/Nav";
import { ImportData } from "./components/ImportData";
import { ClearData } from "./components/ClearData";
import { QueueManager } from "./components/QueueManager";
import { QueueDataDisplay } from "./components/QueueDataDisplay";
import { ExportButton } from "./components/ExportButton";
import { useDataActions } from "./hooks/useDataActions";

export default function Data() {
  const { user } = useAuth();
  const { data } = useQueueData(user?.uid || null);
  const [selectedQueue, setSelectedQueue] = useState<string | null>(null);
  const [selectedArrivalQueue, setSelectedArrivalQueue] = useState<string | null>(null);
  const [selectedServiceQueues, setSelectedServiceQueues] = useState<string[]>([]);

  const { handleImport, clearAllData, exportToCSV } = useDataActions(
    user,
    data
  );

  const handleRecordSelect = (record: QueueRecord) => {
    // Handle record selection if needed
    console.log("Selected record:", record);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-gradient-start)] via-[var(--element-bg)] to-[var(--bg-gradient-end)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Nav />
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">
          Dados
        </h1>
        <ImportData handleImport={handleImport} />
        <ClearData dataLength={data.length} clearAllData={clearAllData} />

        {data.length === 0 ? (
          <div className="text-center">
            <p className="text-[var(--text-secondary)] mb-4">
              Nenhum dado registrado ainda.
            </p>
            <QueueManager onQueueSelect={setSelectedQueue} />
          </div>
        ) : selectedArrivalQueue && selectedServiceQueues.length > 0 ? (
          <div>
            <button
              onClick={() => {
                setSelectedArrivalQueue(null);
                setSelectedServiceQueues([]);
              }}
              className="mb-4 px-4 py-2 bg-[var(--button-bg)] text-[var(--button-text)] rounded-lg hover:bg-[var(--button-hover-bg)] transition-colors"
            >
              ← Voltar
            </button>
            <ExportButton
              selectedArrivalQueue={selectedArrivalQueue}
              exportToCSV={exportToCSV}
            />
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              {selectedArrivalQueue}
            </h2>
            <QueueDataDisplay
              selectedQueue={selectedArrivalQueue}
              onRecordSelect={handleRecordSelect}
            />
          </div>
        ) : (
          <div className="space-y-8">
            <QueueManager onQueueSelect={setSelectedQueue} />
            {selectedQueue && (
              <QueueDataDisplay
                selectedQueue={selectedQueue}
                onRecordSelect={handleRecordSelect}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
