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
      <main style={{ padding: "2.5rem 1.5rem" }}>
        <div className="content-wrapper" style={{ maxWidth: "1000px" }}>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">
            Sobre a Teoria das Filas na Pesquisa Operacional
          </h1>
          <AboutHero />
          <AboutFeatures />
          <AboutConcepts />
          <AboutFormulas />
          <AboutApplications />
        </div>
      </main>
    </div>
  );
}
