"use client";

import { Nav } from "../../components/Nav";
import { AboutHero } from "./components/AboutHero";
import { AboutFeatures } from "./components/AboutFeatures";
import { AboutConcepts } from "./components/AboutConcepts";
import { AboutFormulas } from "./components/AboutFormulas";
import { AboutApplications } from "./components/AboutApplications";

export default function About() {
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-[var(--bg-gradient-start)] via-[var(--element-bg)] to-[var(--bg-gradient-end)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">
            Sobre a Teoria das Filas na Pesquisa Operacional
          </h1>
          <AboutHero />
          <AboutFeatures />
          <AboutConcepts />
          <AboutFormulas />
          <AboutApplications />
        </div>
      </div>
    </>
  );
}
