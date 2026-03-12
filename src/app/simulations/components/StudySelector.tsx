"use client";

import MathRenderer from "../../../components/MathRenderer";
import { caseStudies } from "../utils/caseStudies";

interface CustomParams {
  lambda: number;
  mu: number;
  numServers: number;
  maxN: number;
}

interface StudySelectorProps {
  activeTab: "case-study" | "custom";
  setActiveTab: (tab: "case-study" | "custom") => void;
  selectedStudyIndex: number;
  setSelectedStudyIndex: (i: number) => void;
  customParams: CustomParams;
  setCustomParams: (p: CustomParams) => void;
  onLoadStudy: () => void;
  onCalculateCustom: () => void;
  error: string;
}

export function StudySelector({
  activeTab,
  setActiveTab,
  selectedStudyIndex,
  setSelectedStudyIndex,
  customParams,
  setCustomParams,
  onLoadStudy,
  onCalculateCustom,
  error,
}: StudySelectorProps) {
  return (
    <div
      className="glass-card"
      style={{ padding: "1.5rem", marginBottom: "2rem" }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.25rem",
          padding: "0.25rem",
          background: "var(--surface-raised)",
          borderRadius: "var(--radius-lg)",
          marginBottom: "1.5rem",
          width: "fit-content",
        }}
      >
        {(["case-study", "custom"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "var(--radius-md)",
              border: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 200ms ease",
              background: activeTab === tab ? "var(--surface)" : "transparent",
              color:
                activeTab === tab
                  ? "var(--text-primary)"
                  : "var(--text-secondary)",
              boxShadow: activeTab === tab ? "var(--shadow-sm)" : "none",
            }}
          >
            {tab === "case-study" ? "Estudos de Caso" : "Personalizado"}
          </button>
        ))}
      </div>

      {activeTab === "case-study" && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "flex-end",
          }}
        >
          <div style={{ flex: "1 1 300px" }}>
            <label className="label" htmlFor="study-select">
              Estudo de Caso
            </label>
            <select
              id="study-select"
              className="input"
              value={selectedStudyIndex}
              onChange={(e) => setSelectedStudyIndex(Number(e.target.value))}
            >
              {caseStudies.map((s, i) => (
                <option key={i} value={i}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flexShrink: 0, alignSelf: "flex-end" }}>
            <button className="btn btn-primary" onClick={onLoadStudy}>
              Visualizar →
            </button>
          </div>
          <div style={{ flexBasis: "100%", marginTop: "-0.25rem" }}>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                lineHeight: 1.55,
              }}
            >
              {caseStudies[selectedStudyIndex].description}
            </p>
          </div>
        </div>
      )}

      {activeTab === "custom" && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            <div>
              <label className="label" htmlFor="sim-lambda">
                <MathRenderer math="\lambda" /> (chegadas/s)
              </label>
              <input
                id="sim-lambda"
                type="number"
                step="0.1"
                min="0.01"
                className="input"
                value={customParams.lambda}
                onChange={(e) =>
                  setCustomParams({
                    ...customParams,
                    lambda: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="label" htmlFor="sim-mu">
                <MathRenderer math="\mu" /> (serviços/s por servidor)
              </label>
              <input
                id="sim-mu"
                type="number"
                step="0.1"
                min="0.01"
                className="input"
                value={customParams.mu}
                onChange={(e) =>
                  setCustomParams({
                    ...customParams,
                    mu: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="label" htmlFor="sim-servers">
                Servidores (c)
              </label>
              <input
                id="sim-servers"
                type="number"
                min="1"
                max="20"
                className="input"
                value={customParams.numServers}
                onChange={(e) =>
                  setCustomParams({
                    ...customParams,
                    numServers: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="label" htmlFor="sim-maxn">
                Máximo N (estados)
              </label>
              <input
                id="sim-maxn"
                type="number"
                min="5"
                max="50"
                className="input"
                value={customParams.maxN}
                onChange={(e) =>
                  setCustomParams({
                    ...customParams,
                    maxN: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={onCalculateCustom}>
            Calcular →
          </button>
        </div>
      )}

      {error && (
        <p
          style={{
            marginTop: "0.875rem",
            color: "var(--danger)",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
