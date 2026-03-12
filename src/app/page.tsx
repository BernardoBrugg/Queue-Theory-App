"use client";

import Link from "next/link";
import { Logo } from "../components/Logo";
import { ThemeToggle } from "../components/ThemeToggle";
import { FloatingParticles } from "../components/FloatingParticles";
import { ROUTES } from "../config/routes";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useAuth } from "../components/AuthContext";
import { motion } from "framer-motion";

const WORKFLOW_STEPS = [
  {
    step: 1,
    href: ROUTES.services,
    title: "Criar Serviço",
    desc: "Defina filas e atendentes",
    color: "#7c3aed",
  },
  {
    step: 2,
    href: ROUTES.data,
    title: "Revisar Dados",
    desc: "Visualize e exporte registros",
    color: "#3b82f6",
  },
  {
    step: 3,
    href: ROUTES.dashboards,
    title: "Ver Métricas",
    desc: "Gráficos e análise automática",
    color: "#10b981",
  },
];

function RevealCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(30px) scale(0.97)",
        filter: isVisible ? "blur(0)" : "blur(4px)",
        transition: `all 700ms cubic-bezier(0.2, 0, 0, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FloatingParticles count={35} />
      <div className="hero-bg" />

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0.75rem 1rem",
          background:
            "linear-gradient(to bottom, var(--bg) 40%, transparent 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 52,
            padding: "0 1.25rem",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            backgroundColor: "var(--surface-glass)",
            border: "1px solid var(--border-glass)",
            borderRadius: "var(--radius-full)",
            boxShadow: "var(--shadow-md)",
            transition: "all 400ms cubic-bezier(0.2, 0, 0, 1)",
          }}
        >
          <Link
            href={ROUTES.home}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              textDecoration: "none",
            }}
          >
            <Logo size={34} />
            <span
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              QueueTheoryApp
            </span>
          </Link>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <ThemeToggle />
            {user ? (
              <Link href={ROUTES.services} className="btn btn-primary btn-sm">
                Ir para o App →
              </Link>
            ) : (
              <Link href={ROUTES.login} className="btn btn-primary btn-sm">
                Entrar →
              </Link>
            )}
          </div>
        </div>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "7rem 1.5rem 5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          style={{
            textAlign: "center",
            maxWidth: 760,
            marginBottom: "5rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.1 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <Logo size={80} />
          </motion.div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: "1.5rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.04em",
            }}
          >
            Teoria das Filas <span className="gradient-text">precisa</span> e
            intuitiva
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              fontWeight: 400,
              maxWidth: 600,
              margin: "0 auto 2.5rem",
            }}
          >
            Meça filas reais, calcule métricas M/M/c e visualize o comportamento
            do sistema — do cronômetro ao dashboard, tudo guiado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {user ? (
              <Link href={ROUTES.services} className="btn btn-primary btn-lg">
                Continuar usando →
              </Link>
            ) : (
              <Link href={ROUTES.login} className="btn btn-primary btn-lg">
                Começar agora →
              </Link>
            )}
            <Link href={ROUTES.about} className="btn btn-secondary btn-lg">
              Saiba mais
            </Link>
          </motion.div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "1.25rem",
            width: "100%",
            maxWidth: 960,
          }}
        >
          {WORKFLOW_STEPS.map(({ step, href, title, desc, color }, i) => (
            <RevealCard key={href} delay={i * 100}>
              <Link
                href={user ? href : ROUTES.login}
                className="glass-card"
                style={{
                  padding: "2rem 1.5rem",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div
                  className="step-dot"
                  style={{
                    background: color,
                    color: "white",
                    marginBottom: "1rem",
                  }}
                >
                  {step}
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.375rem",
                    fontSize: "1rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {desc}
                </p>
              </Link>
            </RevealCard>
          ))}
        </div>
      </main>

      <style>{`
        .hero-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse 65% 55% at 15% 40%, var(--glow-primary) 0%, transparent 60%),
            radial-gradient(ellipse 55% 45% at 85% 20%, var(--glow-cyan) 0%, transparent 55%),
            radial-gradient(ellipse 45% 65% at 70% 80%, var(--glow-secondary) 0%, transparent 50%);
          animation: drift-bg 14s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
