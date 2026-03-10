import { db } from "../lib/firebase";
import {
  collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, where
} from "firebase/firestore";
import { QueueRecord } from "../types";

export async function addQueueRecord(
  userId: string,
  record: Omit<QueueRecord, "id">
): Promise<void> {
  const ref = collection(db, "users", userId, "records");
  await addDoc(ref, record);
}

export async function getQueueRecords(uid: string, serviceId?: string): Promise<QueueRecord[]> {
  const recordsRef = collection(db, "users", uid, "records");
  let q;
  if (serviceId) {
    // Avoid orderBy here to prevent Firebase composite index requirement
    q = query(recordsRef, where("serviceId", "==", serviceId));
  } else {
    q = query(recordsRef, orderBy("timestamp", "desc"));
  }
  const snapshot = await getDocs(q);
  const records = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as QueueRecord));

  if (serviceId) {
    records.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  return records;
}

export async function deleteQueueRecord(
  userId: string,
  recordId: string
): Promise<void> {
  await deleteDoc(doc(db, "users", userId, "records", recordId));
}

export async function getRecordsByQueue(
  userId: string,
  queue: string
): Promise<QueueRecord[]> {
  const ref = collection(db, "users", userId, "records");
  const q = query(ref, where("queue", "==", queue), orderBy("timestamp", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as QueueRecord));
}
