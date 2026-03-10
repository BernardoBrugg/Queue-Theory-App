"use client";

import Link from "next/link";
import { ServiceDefinition } from "../../../types";
import { ROUTES } from "../../../config/routes";

interface ServiceListCardProps {
  service: ServiceDefinition;
  onDelete: (id: string) => void;
}

export function ServiceListCard({ service, onDelete }: ServiceListCardProps) {
  return (
    <div className="glass-card animate-fade-in" style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
            {service.name}
          </h3>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Criado em {new Date(service.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
        <button
          onClick={() => onDelete(service.id)}
          className="btn btn-ghost btn-sm"
          aria-label="Excluir serviço"
          style={{ color: "var(--danger)", flexShrink: 0 }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
        </button>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
        <span className="badge badge-accent">{service.numArrivalQueues} fila{service.numArrivalQueues > 1 ? "s" : ""} de chegada</span>
        <span className="badge badge-success">{service.numServers} atendente{service.numServers > 1 ? "s" : ""}</span>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Link href={`${ROUTES.chronometers}?service=${service.id}`} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: "center" }}>
          Cronometrar →
        </Link>
        <Link href={`${ROUTES.dashboards}?service=${service.id}`} className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: "center" }}>
          Ver Painel
        </Link>
      </div>
    </div>
  );
}
