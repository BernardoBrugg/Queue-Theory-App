import { doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export class ActiveServicesAPI {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getActiveService(queueName: string): Promise<Record<string, unknown> | null> {
    const docSnap = await getDoc(doc(db, "users", this.userId, "activeServices", queueName));
    return docSnap.exists() ? docSnap.data() as Record<string, unknown> : null;
  }

  async setActiveService(queueName: string, serviceData: Record<string, unknown>): Promise<void> {
    await setDoc(doc(db, "users", this.userId, "activeServices", queueName), serviceData);
  }

  async deleteActiveService(queueName: string): Promise<void> {
    await deleteDoc(doc(db, "users", this.userId, "activeServices", queueName));
  }

  async renameActiveService(oldName: string, newName: string): Promise<void> {
    const serviceDoc = await getDoc(doc(db, "users", this.userId, "activeServices", oldName));
    if (serviceDoc.exists()) {
      await setDoc(doc(db, "users", this.userId, "activeServices", newName), serviceDoc.data());
      await deleteDoc(doc(db, "users", this.userId, "activeServices", oldName));
    }
  }
}
