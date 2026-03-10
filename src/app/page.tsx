import Link from "next/link";
import { Logo } from "../components/Logo";
import { ROUTES } from "../config/routes";

const WORKFLOW_STEPS = [
  { step: 1, href: ROUTES.services, title: "Criar Serviço", desc: "Defina filas e atendentes", color: "#7C3AED" },
  { step: 2, href: ROUTES.chronometers, title: "Cronometrar", desc: "Registre chegadas e atendimentos", color: "#06B6D4" },
  { step: 3, href: ROUTES.data, title: "Revisar Dados", desc: "Visualize e exporte registros", color: "#10B981" },
  { step: 4, href: ROUTES.dashboards, title: "Ver Métricas", desc: "Gráficos e análise automática", color: "#F59E0B" },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      <div className="hero-bg" />

      <header style={{ position: "relative", zIndex: 1, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Logo size={36} />
          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)" }}>QueueTheoryApp</span>
        </div>
        <Link href={ROUTES.login} className="btn btn-primary btn-sm">Entrar →</Link>
      </header>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div className="animate-slide-up" style={{ textAlign: "center", maxWidth: 680, marginBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <Logo size={80} />
          </div>
          <h1 style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.25rem", color: "var(--text-primary)" }}>
            Teoria das Filas{" "}
            <span style={{ background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-cyan) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>precisa</span>
            {" "}e intuitiva
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Meça filas reais, calcule métricas M/M/c e visualize o comportamento do sistema — do cronômetro ao dashboard, tudo guiado.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={ROUTES.login} className="btn btn-primary btn-lg">Começar agora →</Link>
            <Link href={ROUTES.about} className="btn btn-secondary btn-lg">Saiba mais</Link>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", width: "100%", maxWidth: 900 }}>
          {WORKFLOW_STEPS.map(({ step, href, title, desc, color }, i) => (
            <Link key={href} href={ROUTES.login}
              className={`glass-card animate-slide-up delay-${(i + 1) * 100}`}
              style={{ padding: "1.5rem", textDecoration: "none", display: "block" }}>
              <div className="step-dot" style={{ background: color, color: "white", marginBottom: "0.875rem" }}>{step}</div>
              <h3 style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem", fontSize: "0.95rem" }}>{title}</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{desc}</p>
            </Link>
          ))}
        </div>
      </main>

      <style>{`
        .hero-bg {
          position: fixed; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 60% 50% at 15% 40%, rgba(124,58,237,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 85% 20%, rgba(6,182,212,0.14) 0%, transparent 55%),
            radial-gradient(ellipse 40% 60% at 70% 80%, rgba(139,92,246,0.12) 0%, transparent 50%);
          animation: hero-bg-pulse 10s ease-in-out infinite alternate;
        }
        @keyframes hero-bg-pulse {
          0% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
}
