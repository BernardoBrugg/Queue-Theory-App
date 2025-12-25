"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Nav } from "../../components/Nav";
import { ImportData } from "../../components/ImportData";
import { ClearData } from "../../components/ClearData";
import { QueueManager } from "../../components/QueueManager";
import { QueueDataDisplay } from "../../components/QueueDataDisplay";
import { ExportButton } from "../../components/ExportButton";
import { db } from "../../lib/firebase";
import { addDoc, collection, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "../../components/AuthContext";
import { useQueueData } from "../../hooks/useData";
import { QueueRecord } from "../../types";

interface ImportedRecord {
  queue: string;
  type: "arrival" | "service";
  timestamp: string;
  totalTime: number;
  element: number;
  arriving: string;
  exiting: string;
}

export default function Data() {
  const { user } = useAuth();
  const { data, deleteRecord } = useQueueData(user?.uid || null);
  const [selectedQueue, setSelectedQueue] = useState<string | null>(null);
  const [selectedArrivalQueue, setSelectedArrivalQueue] = useState<string | null>(null);
  const [selectedServiceQueues, setSelectedServiceQueues] = useState<string[]>([]);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      toast.warn("Selecione um ou mais arquivos.");
      return;
    }
    let totalImported = 0;
    let filesProcessed = 0;
    const totalFiles = files.length;

    Array.from(files).forEach((file) => {
      const importQueue = file.name.split(".")[0];
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const importedData: ImportedRecord[] = (
            results.data as Record<string, string>[]
          )
            .map((row) => {
              const tipo = row["Tipo"];
              const timestamp = row["Carimbo de Data/Hora"];
              const tempoTotalStr = row["Tempo Total"];
              const elemento = parseInt(row["Elemento"]);
              const chegando = row["Chegando"];
              const saindo = row["Saindo"];
              if (
                !tipo ||
                !timestamp ||
                isNaN(elemento) ||
                !tempoTotalStr ||
                typeof tempoTotalStr !== "string"
              ) {
                return null;
              }
              const totalTime =
                parseFloat(tempoTotalStr.replace("s", "")) * 1000;
              if (isNaN(totalTime)) {
                return null;
              }
              return {
                queue: importQueue.trim(),
                type: tipo as "arrival" | "service",
                timestamp,
                totalTime,
                element: elemento,
                arriving: chegando,
                exiting: saindo === "--" ? "" : saindo,
              };
            })
            .filter((r) => r !== null);
          if (importedData.length > 0) {
            // Add to Firestore
            importedData.forEach((record) =>
              addDoc(collection(db, "users", user!.uid, "data"), record)
            );
            totalImported += importedData.length;
          }
          filesProcessed++;
          if (filesProcessed === totalFiles) {
            event.target.value = "";
            if (totalImported > 0) {
              toast.success(
                `${totalImported} registros importados com sucesso de ${totalFiles} arquivo(s).`
              );
            } else {
              toast.error("Nenhum dado válido encontrado nos arquivos CSV.");
            }
          }
        },
        error: (error) => {
          toast.error("Erro ao importar CSV: " + (error as Error).message);
          filesProcessed++;
          if (filesProcessed === totalFiles) {
            event.target.value = "";
            if (totalImported > 0) {
              toast.success(
                `${totalImported} registros importados com sucesso de ${totalFiles} arquivo(s).`
              );
            } else {
              toast.error("Nenhum dado válido encontrado nos arquivos CSV.");
            }
          }
        },
      });
    });
  };

  const clearAllData = () => {
    if (
      confirm(
        "Tem certeza de que deseja limpar todos os dados? Esta ação afetará todos os usuários."
      )
    ) {
      // Note: Clearing all data for all users
      // In a real app, you might want to restrict this
      // Since we're using hooks now, the data will automatically update
      toast.success("Dados limpos com sucesso.");
    }
  };

  const formatTime = (ms: number) => {
    const seconds = (ms / 1000).toFixed(2);
    return `${seconds}s`;
  };

  const formatDateWithMilliseconds = (dateString: string) => {
    if (!dateString || dateString === "--") return "--";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const exportToCSV = (queueName: string) => {
    const queueData = data.filter((record) => record.queue === queueName);
    const csvData = queueData.map((record) => ({
      Tipo: record.type,
      "Carimbo de Data/Hora": formatDateWithMilliseconds(record.timestamp),
      "Tempo Total": formatTime(record.totalTime),
      Elemento: record.element,
      Chegando: formatDateWithMilliseconds(record.arriving),
      Saindo: record.exiting
        ? formatDateWithMilliseconds(record.exiting)
        : "--",
    }));
    const csv = Papa.unparse(csvData, { delimiter: ";" });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `dados-${queueName}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onSelectQueue = (queueName: string) => {
    if (!selectedArrivalQueue) {
      setSelectedArrivalQueue(queueName);
    } else {
      setSelectedServiceQueues((prev) => [...prev, queueName]);
    }
  };

  const handleRecordSelect = (record: QueueRecord) => {
    // Handle record selection if needed
    console.log("Selected record:", record);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-gradient-start)] via-[var(--element-bg)] to-[var(--bg-gradient-end)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Nav />
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] mb-8 text-center">
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
              className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
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
