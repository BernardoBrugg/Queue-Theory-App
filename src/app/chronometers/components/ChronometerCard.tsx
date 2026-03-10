"use client";

import { useChronometer } from "../hooks/useChronometer";
import { formatMs } from "../utils/formatMs";

interface ChronometerCardProps {
  serviceId: string;
  queueName: string;
  queueType: "arrival" | "service";
  numServers: number;
  getNextElementId: () => Promise<number>;
  pushToWaitlist: (element: number, arrivedTime: number, startTime: string) => Promise<void>;
  popFromWaitlist: () => Promise<{ element: number, arrivedTime: number, startTime: string } | null>;
}

export function ChronometerCard({
  serviceId, queueName, queueType, numServers, getNextElementId, pushToWaitlist, popFromWaitlist,
}: ChronometerCardProps) {
  const {
    displayMs, servicing, isActive, totalCount,
    recordArrival, arrivedAtService, completedService,
  } = useChronometer({ 
    serviceId,
    queueName, 
    queueType, 
    numServers, 
    getNextElementId, 
    pushToWaitlist, 
    popFromWaitlist 
  });

  const typeLabel = queueType === "arrival" ? "Chegada" : "Atendimento";
  const typeColor = queueType === "arrival" ? "var(--accent-cyan)" : "var(--accent)";

  const isService = queueType === "service";
  const isOccupied = isService && servicing.length > 0;
  const statusLabel = isService ? (isOccupied ? "OCUPADO" : "LIVRE") : "ATIVO";
  const statusColor = isService ? (isOccupied ? "var(--danger)" : "var(--success)") : "var(--accent-cyan)";

  return (
    <div className="glass-card animate-slide-up" style={{
      padding: "1.5rem",
      borderTop: `4px solid ${typeColor}`,
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Glow during active timer */}
      {isActive && (
        <div style={{
          position: "absolute",
          top: 0, right: 0,
          width: "60px", height: "60px",
          background: typeColor,
          filter: "blur(40px)",
          opacity: 0.15,
          zIndex: 0
        }} />
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem", position: "relative", zIndex: 1 }}>
        <div>
          <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{queueName}</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.4rem" }}>
            <span className="badge" style={{ background: queueType === "arrival" ? "var(--accent-cyan-light)" : "var(--accent-light)", color: typeColor }}>
              {typeLabel}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.7rem", fontWeight: 700, color: statusColor }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor, boxShadow: isActive ? `0 0 8px ${statusColor}` : "none" }} />
              {statusLabel}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{
            fontSize: "1.85rem",
            fontWeight: 800,
            color: isActive ? typeColor : "var(--text-muted)",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            textShadow: isActive ? `0 0 20px ${typeColor}33` : "none",
            transition: "all var(--transition-base)"
          }}>
            {formatMs(displayMs)}
          </div>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: isService ? "1fr 1.2fr" : "1fr",
        gap: "0.75rem",
        marginBottom: "1.25rem",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{ padding: "0.75rem", background: "var(--surface-raised)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", marginBottom: "0.25rem" }}>Total</div>
          <div style={{ fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)" }}>{totalCount}</div>
        </div>
        {isService && (
          <div style={{
            padding: "0.75rem",
            background: isOccupied ? "var(--accent-light)" : "var(--surface-raised)",
            borderRadius: "var(--radius-md)",
            textAlign: "center",
            transition: "all var(--transition-base)"
          }}>
            <div style={{ fontSize: "0.7rem", color: isOccupied ? "var(--accent)" : "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", marginBottom: "0.25rem" }}>Atendendo</div>
            <div style={{ fontWeight: 800, fontSize: "1.25rem", color: isOccupied ? "var(--accent)" : "var(--text-primary)" }}>
              {isOccupied ? "SIM" : "NÃO"}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", position: "relative", zIndex: 1 }}>
        {queueType === "arrival" ? (
          <button onClick={recordArrival} className="btn btn-primary" style={{ width: "100%", height: "48px" }}>
            + Registrar Chegada
          </button>
        ) : (
          <>
            {!isOccupied ? (
              <button
                onClick={arrivedAtService}
                className="btn btn-primary"
                style={{ width: "100%", height: "48px" }}
              >
                Chegou no Posto
              </button>
            ) : (
              <button
                onClick={completedService}
                className="btn btn-success"
                style={{ width: "100%", height: "48px" }}
              >
                Concluir Atendimento ✓
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
