import { collection, doc, deleteDoc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { QueueTotals } from "../../types";

export class QueueTotalsAPI {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getAllTotals(): Promise<QueueTotals> {
    const snapshot = await getDocs(collection(db, "users", this.userId, "totals"));
    const totals: QueueTotals = {};
    snapshot.docs.forEach(doc => {
      totals[doc.id] = doc.data().total;
    });
    return totals;
  }

  async updateTotal(queueName: string, total: number): Promise<void> {
    await setDoc(doc(db, "users", this.userId, "totals", queueName), { total });
  }

  async deleteTotal(queueName: string): Promise<void> {
    await deleteDoc(doc(db, "users", this.userId, "totals", queueName));
  }

  async renameTotal(oldName: string, newName: string): Promise<void> {
    const totalDoc = await getDoc(doc(db, "users", this.userId, "totals", oldName));
    if (totalDoc.exists()) {
      await setDoc(doc(db, "users", this.userId, "totals", newName), totalDoc.data());
      await deleteDoc(doc(db, "users", this.userId, "totals", oldName));
    }
  }
}
