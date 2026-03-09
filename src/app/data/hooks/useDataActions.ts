import Papa from "papaparse";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { toast } from "react-toastify";
import { QueueRecord } from "../../../types";
import { User } from "firebase/auth";

interface ImportedRecord {
  queue: string;
  type: "arrival" | "service";
  timestamp: string;
  totalTime: number;
  element: number;
  arriving: string;
  exiting: string;
}

export function useDataActions(user: User | null | undefined, data: QueueRecord[]) {
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !user) {
      toast.warn("Selecione um ou mais arquivos e certifique-se de estar logado.");
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
            .filter((r): r is ImportedRecord => r !== null);
          if (importedData.length > 0) {
            importedData.forEach((record) =>
              addDoc(collection(db, "users", user.uid, "data"), record)
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

  return { handleImport, clearAllData, exportToCSV };
}
