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
    <div className="bg-[var(--element-bg)] border-2 border-[var(--element-border)] rounded-[var(--border-radius-large)] p-6 shadow-lg">
      <div className="text-center mb-6">
        <h4 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
          Cronômetro
        </h4>
        <div className="text-4xl font-bold text-[var(--button-bg)]">
          {formatTime(displayTime)}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center py-2 border-b-2 border-[var(--element-border)]">
          <span className="text-[var(--text-primary)] text-sm font-semibold">
            Elementos Totais
          </span>
          <span className="text-lg font-bold text-[var(--text-primary)]">
            {currentTotal}
          </span>
        </div>

        <div className="flex justify-between items-center py-2 border-b-2 border-[var(--element-border)]">
          <span className="text-[var(--text-primary)] text-sm font-semibold">
            {type === "arrival" ? "Status" : "Em Atendimento"}
          </span>
          <span className="text-lg font-bold text-[var(--text-primary)]">
            {type === "arrival"
              ? (startTime ? "Ativo" : "Inativo")
              : `${currentServicing.length}/${numAttendants}`}
          </span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className="text-[var(--text-primary)] text-sm font-semibold">
            {type === "arrival" ? "Tempo de Espera" : "Tempo Atual"}
          </span>
          <span className="text-lg font-bold text-[var(--button-bg)]">
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
            className="btn-primary w-full"
          >
            Registrar Chegada (+1)
          </button>
        ) : (
          <>
            <button
              onClick={() => arrivedAtService()}
              disabled={currentServicing.length >= numAttendants}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Chegou no Atendimento
            </button>
            <button
              onClick={() => completedService()}
              disabled={currentServicing.length === 0}
              className="btn-success w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Completou Atendimento
            </button>
          </>
        )}
      </div>
    </div>
  );
}
