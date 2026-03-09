import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { StoredService } from "../../../../types";

interface ChartDataPoint {
  time: number;
  arrivals: number;
  departures: number;
}

interface PDFChartsProps {
  service: StoredService;
  getCumulativeData: (service: StoredService) => ChartDataPoint[];
  isExport?: boolean;
  histogramData: { bin: string; count: number }[];
}

export function PDFCharts({
  service,
  getCumulativeData,
  isExport = false,
  histogramData,
}: PDFChartsProps) {
  return (
    <>
      <h2>Gráfico de Probabilidades P(n)</h2>
      <div style={{ width: "100%", height: "300px", marginBottom: "20px" }}>
        <ResponsiveContainer
          width={isExport ? 600 : "100%"}
          height={isExport ? 400 : 300}
        >
          <BarChart
            data={
              service.metrics.P?.map((p, n) => ({
                n,
                p: p !== null ? p : 0,
              })) || []
            }
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="n" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="p" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2>Gráfico Cumulativo</h2>
      <div style={{ width: "100%", height: "300px", marginBottom: "20px" }}>
        <ResponsiveContainer
          width={isExport ? 600 : "100%"}
          height={isExport ? 400 : 300}
        >
          <LineChart data={getCumulativeData(service)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="arrivals"
              stroke="#8884d8"
              name="Chegadas Cumulativas"
            />
            <Line
              type="monotone"
              dataKey="departures"
              stroke="#82ca9d"
              name="Saídas Cumulativas"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2>Histograma de Tempos de Serviço</h2>
      <div style={{ width: "100%", height: "300px", marginBottom: "20px" }}>
        <ResponsiveContainer>
          <BarChart data={histogramData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bin" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2>Comparação de Tempos Médios</h2>
      <div style={{ width: "100%", height: "300px", marginBottom: "20px" }}>
        <ResponsiveContainer>
          <BarChart
            data={[
              {
                name: "Tempo Médio de Serviço",
                value: service.metrics.avgServiceTime || 0,
              },
              { name: "Tempo Médio de Espera", value: service.metrics.Wq || 0 },
              { name: "Tempo Ocioso", value: service.metrics.idleTime || 0 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2>Gráfico de Linhas: Tempos por Tempo</h2>
      <div style={{ width: "100%", height: "300px", marginBottom: "20px" }}>
        <ResponsiveContainer>
          <LineChart
            data={
              service.serviceTimes?.map((s, i) => ({
                time:
                  service.timestamps && service.timestamps[i]
                    ? (service.timestamps[i] - service.timestamps[0]) / 1000
                    : i + 1,
                serviceTime: s,
                waitTime: service.metrics.waitingTimes?.[i] ?? 0,
                idleTime: service.metrics.idleTimes?.[i] ?? 0,
              })) || []
            }
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="serviceTime"
              stroke="#8884d8"
              name="Tempo de Serviço"
            />
            <Line
              type="monotone"
              dataKey="waitTime"
              stroke="#82ca9d"
              name="Tempo de Espera"
            />
            <Line
              type="monotone"
              dataKey="idleTime"
              stroke="#ffc658"
              name="Tempo Ocioso"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
