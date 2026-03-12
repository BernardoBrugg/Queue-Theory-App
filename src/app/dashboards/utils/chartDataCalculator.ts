import { StoredService } from "../../../types";

export interface ChartDataPoint {
  time: number;
  arrivals: number;
  departures: number;
}

interface Event {
  time: number;
  type: "arrival" | "departure";
}

export interface QueueData {
  queue: string;
  type: "arrival" | "service";
  timestamp: string;
  arriving: string;
  exiting: string;
  element: number;
  totalTime: number;
}

export function calculateCumulativeData(data: QueueData[], service: StoredService): ChartDataPoint[] {
  const arrivalData = data
    .filter(
      (d) =>
        d.queue === service.arrivalQueue &&
        d.type === "arrival" &&
        !isNaN(new Date(d.timestamp).getTime())
    )
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  const serviceData = data
    .filter(
      (d) =>
        d.queue === service.serviceQueue &&
        d.type === "service" &&
        !isNaN(new Date(d.arriving).getTime()) &&
        !isNaN(new Date(d.exiting).getTime())
    )
    .sort(
      (a, b) =>
        new Date(a.arriving).getTime() - new Date(b.arriving).getTime()
    );
  const events: Event[] = [];
  arrivalData.forEach((a) =>
    events.push({ time: new Date(a.timestamp).getTime(), type: "arrival" })
  );
  serviceData.forEach((s) =>
    events.push({ time: new Date(s.exiting).getTime(), type: "departure" })
  );
  events.sort((a, b) => a.time - b.time);
  let arrivals = 0;
  let departures = 0;
  const chartData: ChartDataPoint[] = [];
  const startTime = events.length > 0 ? events[0].time : 0;
  const maxPoints = 100;
  const step = Math.max(1, Math.ceil(events.length / maxPoints));
  for (let i = 0; i < events.length; i += step) {
    const e = events[i];
    if (e.type === "arrival") arrivals++;
    else departures++;
    chartData.push({
      time: (e.time - startTime) / 1000,
      arrivals,
      departures,
    });
  }
  return chartData;
}
