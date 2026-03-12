export type QueueMetrics = {
  lambda: number;
  mu: number;
  rho: number;
  L: number;
  Lq: number;
  W: number;
  Wq: number;
  P: number[];
  numServers?: number;
  idleTime?: number;
  idleProportion?: number;
  avgServiceTime?: number;
  waitingTimes?: number[];
  idleTimes?: number[];
  interArrivals?: number[];
  serviceTimes?: number[];
  timestamps?: number[];
};

export type ChartDataPoint = {
  time: number;
  arrivals: number;
  departures: number;
};

export type HistogramDataPoint = {
  bin: string;
  count: number;
};
