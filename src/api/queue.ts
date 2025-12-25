import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  onSnapshot,
  writeBatch,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { QueueRecord, Queue, QueueTotals } from "../types";

// API Functions for Queue Data
export class QueueDataAPI {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  // Get all queue records
  async getAllRecords(): Promise<QueueRecord[]> {
    const snapshot = await getDocs(collection(db, "users", this.userId, "data"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as QueueRecord));
  }

  // Add a new record
  async addRecord(record: Omit<QueueRecord, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, "users", this.userId, "data"), record);
    return docRef.id;
  }

  // Update a record
  async updateRecord(id: string, updates: Partial<QueueRecord>): Promise<void> {
    await updateDoc(doc(db, "users", this.userId, "data", id), updates);
  }

  // Delete a record
  async deleteRecord(id: string): Promise<void> {
    await deleteDoc(doc(db, "users", this.userId, "data", id));
  }

  // Delete all records for a specific queue
  async deleteRecordsByQueue(queueName: string): Promise<void> {
    const q = query(collection(db, "users", this.userId, "data"), where("queue", "==", queueName));
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  }

  // Update queue name in all records
  async updateQueueName(oldName: string, newName: string): Promise<void> {
    const q = query(collection(db, "users", this.userId, "data"), where("queue", "==", oldName));
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, { queue: newName });
    });
    await batch.commit();
  }
}

// API Functions for Queue Management
export class QueueAPI {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  // Get all queues
  async getAllQueues(): Promise<Queue[]> {
    const snapshot = await getDocs(collection(db, "users", this.userId, "queues"));
    return snapshot.docs.map(doc => doc.data() as Queue);
  }

  // Add a new queue
  async addQueue(queue: Queue): Promise<void> {
    await setDoc(doc(db, "users", this.userId, "queues", queue.name), queue);
  }

  // Update a queue
  async updateQueue(name: string, updates: Partial<Queue>): Promise<void> {
    await updateDoc(doc(db, "users", this.userId, "queues", name), updates);
  }

  // Delete a queue
  async deleteQueue(name: string): Promise<void> {
    await deleteDoc(doc(db, "users", this.userId, "queues", name));
  }

  // Rename a queue
  async renameQueue(oldName: string, newName: string): Promise<void> {
    const queueDoc = await getDoc(doc(db, "users", this.userId, "queues", oldName));
    if (queueDoc.exists()) {
      const queueData = queueDoc.data() as Queue;
      await setDoc(doc(db, "users", this.userId, "queues", newName), {
        ...queueData,
        name: newName,
      });
      await deleteDoc(doc(db, "users", this.userId, "queues", oldName));
    }
  }
}

// API Functions for Queue Totals
export class QueueTotalsAPI {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  // Get all totals
  async getAllTotals(): Promise<QueueTotals> {
    const snapshot = await getDocs(collection(db, "users", this.userId, "totals"));
    const totals: QueueTotals = {};
    snapshot.docs.forEach(doc => {
      totals[doc.id] = doc.data().total;
    });
    return totals;
  }

  // Update total for a queue
  async updateTotal(queueName: string, total: number): Promise<void> {
    await setDoc(doc(db, "users", this.userId, "totals", queueName), { total });
  }

  // Delete total for a queue
  async deleteTotal(queueName: string): Promise<void> {
    await deleteDoc(doc(db, "users", this.userId, "totals", queueName));
  }

  // Rename total entry
  async renameTotal(oldName: string, newName: string): Promise<void> {
    const totalDoc = await getDoc(doc(db, "users", this.userId, "totals", oldName));
    if (totalDoc.exists()) {
      await setDoc(doc(db, "users", this.userId, "totals", newName), totalDoc.data());
      await deleteDoc(doc(db, "users", this.userId, "totals", oldName));
    }
  }
}

// API Functions for Active Services
export class ActiveServicesAPI {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  // Get active service for a queue
  async getActiveService(queueName: string): Promise<any> {
    const docSnap = await getDoc(doc(db, "users", this.userId, "activeServices", queueName));
    return docSnap.exists() ? docSnap.data() : null;
  }

  // Set active service for a queue
  async setActiveService(queueName: string, serviceData: any): Promise<void> {
    await setDoc(doc(db, "users", this.userId, "activeServices", queueName), serviceData);
  }

  // Delete active service for a queue
  async deleteActiveService(queueName: string): Promise<void> {
    await deleteDoc(doc(db, "users", this.userId, "activeServices", queueName));
  }

  // Rename active service entry
  async renameActiveService(oldName: string, newName: string): Promise<void> {
    const serviceDoc = await getDoc(doc(db, "users", this.userId, "activeServices", oldName));
    if (serviceDoc.exists()) {
      await setDoc(doc(db, "users", this.userId, "activeServices", newName), serviceDoc.data());
      await deleteDoc(doc(db, "users", this.userId, "activeServices", oldName));
    }
  }
}