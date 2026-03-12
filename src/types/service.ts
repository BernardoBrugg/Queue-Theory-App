import { QueueMetrics } from "./metrics";

export type ServiceDefinition = {
  id: string;
  name: string;
  numArrivalQueues: number;
  numServers: number;
  createdAt: number;
};

export type StoredService = {
  id: string;
  name: string;
  arrivalQueue: string;
  serviceQueue: string;
  metrics: QueueMetrics;
  serviceTimes: number[];
  timestamps: number[];
  interArrivals: number[];
};
