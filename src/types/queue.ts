export type QueueType = "arrival" | "service";

export interface QueueRecord {
  id?: string;
  serviceId: string;
  queue: string;
  type: QueueType;
  timestamp: string;
  totalTime: number;
  element: number;
  arriving: string;
  exiting: string;
};

export type Queue = {
  name: string;
  type: QueueType;
  numAttendants?: number;
};

export type QueueTotals = {
  [key: string]: number;
};
