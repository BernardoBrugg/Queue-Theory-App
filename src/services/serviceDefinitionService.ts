import { db } from "../lib/firebase";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { ServiceDefinition } from "../types";

export async function createServiceDefinition(
  userId: string,
  data: Omit<ServiceDefinition, "id" | "createdAt">
): Promise<string> {
  const ref = collection(db, "users", userId, "serviceDefinitions");
  const docRef = await addDoc(ref, { ...data, createdAt: Date.now() });
  return docRef.id;
}

export async function getServiceDefinitions(
  userId: string
): Promise<ServiceDefinition[]> {
  const ref = collection(db, "users", userId, "serviceDefinitions");
  const q = query(ref, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceDefinition));
}

export async function updateServiceDefinition(
  userId: string,
  serviceId: string,
  data: Partial<Omit<ServiceDefinition, "id">>
): Promise<void> {
  await updateDoc(doc(db, "users", userId, "serviceDefinitions", serviceId), data);
}

export async function deleteServiceDefinition(
  userId: string,
  serviceId: string
): Promise<void> {
  await deleteDoc(doc(db, "users", userId, "serviceDefinitions", serviceId));
}
