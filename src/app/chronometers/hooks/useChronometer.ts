"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../../../lib/firebase";
import {
  doc, onSnapshot, setDoc, arrayUnion, arrayRemove,
  collection, query, where,
} from "firebase/firestore";
import { useAuth } from "../../../components/AuthContext";
import { QueueRecord } from "../../../types";
import { addQueueRecord } from "../../../services/recordsService";

interface ServicingEntry {
  element: number;
  arrivedTime: number;
  startTime: string;
}

interface UseChronometerOptions {
  serviceId: string;
  queueName: string;
  queueType: "arrival" | "service";
  numServers: number;
  getNextElementId: () => Promise<number>;
  pushToWaitlist: (element: number, arrivedTime: number, startTime: string) => Promise<void>;
  popFromWaitlist: () => Promise<{ element: number, arrivedTime: number, startTime: string } | null>;
}

export function useChronometer({
  serviceId, queueName, queueType, numServers, getNextElementId, pushToWaitlist, popFromWaitlist,
}: UseChronometerOptions) {
  const { user } = useAuth();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [servicing, setServicing] = useState<ServicingEntry[]>([]);
  const [displayMs, setDisplayMs] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (queueType === "arrival" && startTime) setDisplayMs(now - startTime);
      else if (queueType === "service" && servicing.length > 0) setDisplayMs(now - servicing[0].arrivedTime);
      else setDisplayMs(0);
    }, 10);
    return () => clearInterval(interval);
  }, [startTime, servicing, queueType]);

  useEffect(() => {
    if (!user) return;
    
    // Listen for current servicing (for service type)
    let unsubscribeServicing: (() => void) | undefined;
    if (queueType === "service") {
      unsubscribeServicing = onSnapshot(doc(db, "users", user.uid, "activeServices", queueName), (snap) => {
        setServicing(snap.exists() ? snap.data().currentServicing ?? [] : []);
      });
    }

    // Listen for total count of records for this queue within the current service
    const recordsRef = collection(db, "users", user.uid, "records");
    const q = query(recordsRef, where("serviceId", "==", serviceId), where("queue", "==", queueName));
    const unsubscribeCount = onSnapshot(q, (snap) => {
      setTotalCount(snap.size);
    });

    return () => {
      unsubscribeServicing?.();
      unsubscribeCount();
    };
  }, [user, serviceId, queueName, queueType]);

  const recordArrival = async () => {
    const now = Date.now();
    if (!startTime) setStartTime(now);
    const element = await getNextElementId();
    const startTimeStr = new Date(now).toISOString();
    const record: Omit<QueueRecord, "id"> = { 
      serviceId,
      queue: queueName, 
      type: "arrival", 
      timestamp: startTimeStr, 
      totalTime: 0, 
      element, 
      arriving: startTimeStr, 
      exiting: "" 
    };
    if (user) await addQueueRecord(user.uid, record);
    // Also push to the shared waitlist so an atendente can pick it up
    await pushToWaitlist(element, now, startTimeStr);
  };

  const arrivedAtService = async () => {
    if (!user || servicing.length >= numServers) return;
    
    // Attempt to pull from waitlist
    const waitingEntry = await popFromWaitlist();
    if (!waitingEntry) {
      toast.info("Ninguém na fila de espera.");
      return;
    }

    const { element, arrivedTime, startTime: originalStartTime } = waitingEntry;
    
    const ref = doc(db, "users", user.uid, "activeServices", queueName);
    await setDoc(ref, {
      currentServicing: arrayUnion({ element, arrivedTime, startTime: originalStartTime }),
    }, { merge: true });
  };

  const completedService = async () => {
    if (!user || servicing.length === 0) return;
    const now = Date.now();
    const entry = servicing[0];
    const totalTime = now - entry.arrivedTime;
    const record: Omit<QueueRecord, "id"> = { 
      serviceId,
      queue: queueName, 
      type: "service", 
      timestamp: entry.startTime, 
      totalTime, 
      element: entry.element, 
      arriving: entry.startTime, 
      exiting: new Date(now).toISOString() 
    };
    if (user) await addQueueRecord(user.uid, record);
    
    const ref = doc(db, "users", user.uid, "activeServices", queueName);
    await setDoc(ref, { 
      currentServicing: arrayRemove(entry) 
    }, { merge: true });
  };

  return { 
    displayMs, 
    servicing, 
    totalCount,
    recordArrival, 
    arrivedAtService, 
    completedService, 
    isActive: queueType === "arrival" ? !!startTime : servicing.length > 0 
  };
}
