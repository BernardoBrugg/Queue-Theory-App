import React from "react";
import MathRenderer from "../../../components/MathRenderer";

import { CaseStudy } from "../utils/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  onLoad: (study: CaseStudy) => void;
}

export function CaseStudyCard({ study, onLoad }: CaseStudyCardProps) {
  return (
    <div className="glass-card" style={{ padding: "1.5rem" }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
        {study.name}
      </h3>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>{study.description}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.25rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
        <div>
          <MathRenderer math="\lambda" />: {study.metrics.lambda}
        </div>
        <div>
          <MathRenderer math="\mu" />: {study.metrics.mu}
        </div>
        <div>
          <MathRenderer math="\rho" />: {study.metrics.rho.toFixed(2)}
        </div>
        <div>Servidores: {study.metrics.numServers}</div>
        <div>L: {study.metrics.L.toFixed(2)}</div>
        <div>
          <MathRenderer math="L_q" />: {study.metrics.Lq.toFixed(2)}
        </div>
        <div>W: {study.metrics.W.toFixed(2)} s</div>
        <div>
          <MathRenderer math="W_q" />: {study.metrics.Wq.toFixed(2)} s
        </div>
      </div>
      <button onClick={() => onLoad(study)} className="btn btn-primary" style={{ width: "100%" }}>
        Carregar Estudo
      </button>
    </div>
  );
}
