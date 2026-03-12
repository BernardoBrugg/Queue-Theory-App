"use client";

import { NavBar } from "../../components/NavBar";
import { AboutHero } from "./components/AboutHero";
import { AboutFeatures } from "./components/AboutFeatures";
import { AboutConcepts } from "./components/AboutConcepts";
import { AboutFormulas } from "./components/AboutFormulas";
import { AboutApplications } from "./components/AboutApplications";

export default function About() {
  return (
    <div className="page-container">
      <NavBar />
      <main style={{ padding: "2.5rem 1.5rem 5rem" }}>
        <article style={{ maxWidth: "760px", margin: "0 auto" }}>
          <header
            style={{
              marginBottom: "3rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <span className="badge badge-accent">
                Teoria das Filas · Pesquisa Operacional
              </span>
            </div>
            <h1
              style={{
                fontSize: "2.125rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "1rem",
              }}
            >
              Sobre a Teoria das Filas na Pesquisa Operacional
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
              }}
            >
              Uma visão técnica e aplicada da teoria matemática que fundamenta
              análises de sistemas de espera em contextos reais.
            </p>
          </header>
          <AboutHero />
          <AboutFeatures />
          <AboutConcepts />
          <AboutFormulas />
          <AboutApplications />
        </article>
      </main>
    </div>
  );
}
