"use client";

import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

interface Record {
  queue: string;
  type: "arrival" | "service";
  timestamp: string;
  totalTime: number;
  element: number;
  arriving: string;
  exiting: string;
}

interface ChronometerProps {
  queue: string;
  type: "arrival" | "service";
  getNextElement: (queue: string) => number;
  currentTotal: number;
  onRecord: (record: Omit<Record, "id">) => void;
  currentAppTimeMs: number;
  numAttendants: number;
}

export function Chronometer({
  queue,
  type,
  getNextElement,
  currentTotal,
  onRecord,
  numAttendants,
}: ChronometerProps) {
  const { user } = useAuth();
  const pendingClients: { element: number; arriving: number }[] = [];
  const [currentServicing, setCurrentServicing] = useState<
    { element: number; arrivedTime: number; startTime: string }[]
  >([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [displayTime, setDisplayTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = Date.now();
      if (type === "arrival" && startTime) {
        setDisplayTime(current - startTime);
      } else if (type === "service" && currentServicing.length > 0) {
        setDisplayTime(current - currentServicing[0].arrivedTime);
      } else {
        setDisplayTime(0);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [startTime, currentServicing, type]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid, "activeServices", queue),
      (docSnap) => {
        if (docSnap.exists()) {
          setCurrentServicing(docSnap.data().currentServicing || []);
        } else {
          setCurrentServicing([]);
        }
      }
    );
    return unsubscribe;
  }, [queue, user]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${centiseconds
      .toString()
      .padStart(2, "0")}`;
  };

  const addArrival = (now: number) => {
    if (!startTime) {
      setStartTime(now);
    }
    const element = getNextElement(queue);
    const record: Record = {
      queue,
      type,
      timestamp: new Date(now).toISOString(),
      totalTime: 0,
      element,
      arriving: new Date(now).toISOString(),
      exiting: "",
    };
    onRecord(record);
  };

  const arrivedAtService = () => {
    if (!user) return;

    const now = Date.now();
    const element = getNextElement(queue);
    const startTimeStr = new Date(now).toISOString();
    updateDoc(doc(db, "users", user.uid, "activeServices", queue), {
      currentServicing: arrayUnion({
        element,
        arrivedTime: now,
        startTime: startTimeStr,
      }),
    });
  };

  const completedService = () => {
    if (!user) return;

    if (currentServicing.length > 0) {
      const now = Date.now();
      const totalTime = now - currentServicing[0].arrivedTime;
      const record: Record = {
        queue,
        type,
        timestamp: currentServicing[0].startTime,
        totalTime,
        element: currentServicing[0].element,
        arriving: currentServicing[0].startTime,
        exiting: new Date(now).toISOString(),
      };
      onRecord(record);
      updateDoc(doc(db, "users", user.uid, "activeServices", queue), {
        currentServicing: arrayRemove(currentServicing[0]),
      });
    }
  };

  return (
    <div className="bg-[var(--element-bg)] border border-[var(--element-border)] rounded-lg p-6 shadow-sm">
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Cronômetro
        </h4>
        <div className="text-3xl font-bold text-[var(--accent)]">
          {formatTime(displayTime)}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center py-2 border-b border-[var(--element-border)]">
          <span className="text-[var(--text-secondary)] text-sm">
            Elementos Totais
          </span>
          <span className="text-lg font-semibold text-[var(--text-primary)]">
            {currentTotal}
          </span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-[var(--element-border)]">
          <span className="text-[var(--text-secondary)] text-sm">
            {type === "arrival" ? "Status" : "Em Atendimento"}
          </span>
          <span className="text-lg font-semibold text-[var(--text-primary)]">
            {type === "arrival"
              ? (startTime ? "Ativo" : "Inativo")
              : `${currentServicing.length}/${numAttendants}`}
          </span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className="text-[var(--text-secondary)] text-sm">
            {type === "arrival" ? "Tempo de Espera" : "Tempo Atual"}
          </span>
          <span className="text-lg font-semibold text-[var(--accent)]">
            {(type === "arrival" && startTime) ||
            (type === "service" && currentServicing.length > 0)
              ? formatTime(displayTime)
              : "--"}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {type === "arrival" ? (
          <button
            onClick={() => addArrival(Date.now())}
            className="w-full px-4 py-3 bg-[var(--accent)] text-white rounded-lg font-medium hover:bg-[var(--accent-hover)] transition-colors duration-200 shadow-sm"
          >
            Registrar Chegada (+1)
          </button>
        ) : (
          <>
            <button
              onClick={() => arrivedAtService()}
              disabled={currentServicing.length >= numAttendants}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
            >
              Chegou no Atendimento
            </button>
            <button
              onClick={() => completedService()}
              disabled={currentServicing.length === 0}
              className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
            >
              Completou Atendimento
            </button>
          </>
        )}
      </div>
    </div>
  );
}
