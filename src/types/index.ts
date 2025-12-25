export interface QueueMetrics {
  lambda: number;
  mu: number;
  rho: number;
  L: number;
  Lq: number;
  W: number;
  Wq: number;
  P: number[];
  idleTime: number;
  idleProportion: number;
  avgServiceTime: number;
  waitingTimes: number[];
  idleTimes: number[];
  interArrivals: number[];
  serviceTimes: number[];
  timestamps: number[];
}

export interface Service {
  id: string;
  name: string;
  arrivalQueue: string;
  serviceQueue: string;
  metrics: QueueMetrics;
  serviceTimes: number[];
  timestamps: number[];
  interArrivals: number[];
}

export interface StoredService {
  id: string;
  name: string;
  arrivalQueue: string;
  serviceQueue: string;
  metrics: {
    lambda: number;
    mu: number;
    rho: number;
    L: number;
    Lq: number;
    W: number;
    Wq: number;
    P: number[];
    idleTime: number;
    idleProportion: number;
    avgServiceTime: number;
    idleTimes: number[];
    waitingTimes: number[];
  };
  serviceTimes: number[];
  timestamps: number[];
  interArrivals: number[];
}

// New types for organized data management
export interface QueueRecord {
  id: string;
  queue: string;
  type: "arrival" | "service";
  timestamp: string;
  totalTime: number;
  element: number;
  arriving: string;
  exiting: string;
}

export interface Queue {
  name: string;
  type: "arrival" | "service";
  numAttendants?: number;
}

export interface QueueTotals {
  [key: string]: number;
}

export interface ImportedRecord {
  queue: string;
  type: "arrival" | "service";
  timestamp: string;
  totalTime: number;
  element: number;
  arriving: string;
  exiting: string;
}
