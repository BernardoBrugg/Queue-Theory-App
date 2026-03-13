"use client";

import { useEffect, useMemo, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, onSnapshot, setDoc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { useAuth } from "../../../components/AuthContext";
import { getServiceDefinitions } from "../../../services/serviceDefinitionService";
import { ServiceDefinition } from "../../../types";

export function useChronometerPage(serviceId: string | null) {
  const { user } = useAuth();
  const [definition, setDefinition] = useState<ServiceDefinition | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<{ nextElementId: number; waitingPool: { element: number, arrivedTime: number, startTime: string }[] } | null>(null);

  useEffect(() => {
    if (!user || !serviceId) { 
      setTimeout(() => setLoading(false), 0);
      return; 
    }
    
    let isMounted = true;
    getServiceDefinitions(user.uid).then((list) => {
      if (!isMounted) return;
      const found = list.find((s) => s.id === serviceId) ?? null;
      setDefinition(found);
      setLoading(false);
    }).catch(() => {
      if (!isMounted) return;
      setLoading(false);
    });

    const sessionUnsub = onSnapshot(doc(db, "users", user.uid, "activeServiceSessions", serviceId), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setSession({
          nextElementId: data.nextElementId ?? 0,
          waitingPool: data.waitingPool ?? []
        });
      } else {
        
        setDoc(snap.ref, { nextElementId: 0, waitingPool: [] }, { merge: true });
      }
    });

    return () => { 
      isMounted = false; 
      sessionUnsub();
    };
  }, [user, serviceId]);

  const queues = useMemo(() => {
    if (!definition) return [];
    const result = [];
    
    for (let i = 0; i < definition.numArrivalQueues; i++) {
      result.push({ 
        name: `Chegada ${i + 1}`, 
        type: "arrival" as const, 
        numServers: 1 
      });
    }

    for (let i = 0; i < definition.numServers; i++) {
      result.push({ 
        name: `Atendente ${i + 1}`, 
        type: "service" as const, 
        numServers: 1 
      });
    }

    return result;
  }, [definition]);

  const getNextElementId = async () => {
    if (!user || !serviceId) return 0;
    const ref = doc(db, "users", user.uid, "activeServiceSessions", serviceId);
    const next = (session?.nextElementId ?? 0) + 1;
    await updateDoc(ref, { nextElementId: increment(1) });
    return next;
  };

  const pushToWaitlist = async (element: number, arrivedTime: number, startTime: string) => {
    if (!user || !serviceId) return;
    const ref = doc(db, "users", user.uid, "activeServiceSessions", serviceId);
    await updateDoc(ref, {
      waitingPool: arrayUnion({ element, arrivedTime, startTime })
    });
  };

  const popFromWaitlist = async () => {
    if (!user || !serviceId || !session || session.waitingPool.length === 0) return null;
    const ref = doc(db, "users", user.uid, "activeServiceSessions", serviceId);
    const element = session.waitingPool[0];
    const newPool = session.waitingPool.slice(1);
    await updateDoc(ref, { waitingPool: newPool });
    return element;
  };

  return { definition, queues, loading, session, getNextElementId, pushToWaitlist, popFromWaitlist };
}
