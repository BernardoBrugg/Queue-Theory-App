import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, writeBatch, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { QueueRecord } from "../../types";

export class QueueDataAPI {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getAllRecords(): Promise<QueueRecord[]> {
    const snapshot = await getDocs(collection(db, "users", this.userId, "data"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as QueueRecord));
  }

  async addRecord(record: Omit<QueueRecord, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, "users", this.userId, "data"), record);
    return docRef.id;
  }

  async updateRecord(id: string, updates: Partial<QueueRecord>): Promise<void> {
    await updateDoc(doc(db, "users", this.userId, "data", id), updates);
  }

  async deleteRecord(id: string): Promise<void> {
    await deleteDoc(doc(db, "users", this.userId, "data", id));
  }

  async deleteRecordsByQueue(queueName: string): Promise<void> {
    const q = query(collection(db, "users", this.userId, "data"), where("queue", "==", queueName));
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  }

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
