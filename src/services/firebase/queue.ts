import { collection, doc, updateDoc, deleteDoc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Queue } from "../../types";

export class QueueAPI {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getAllQueues(): Promise<Queue[]> {
    const snapshot = await getDocs(collection(db, "users", this.userId, "queues"));
    return snapshot.docs.map(doc => doc.data() as Queue);
  }

  async addQueue(queue: Queue): Promise<void> {
    await setDoc(doc(db, "users", this.userId, "queues", queue.name), queue);
  }

  async updateQueue(name: string, updates: Partial<Queue>): Promise<void> {
    await updateDoc(doc(db, "users", this.userId, "queues", name), updates);
  }

  async deleteQueue(name: string): Promise<void> {
    await deleteDoc(doc(db, "users", this.userId, "queues", name));
  }

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
