"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthContext";
import { Logo } from "../../components/Logo";
import { ROUTES } from "../../config/routes";

type Mode = "login" | "register";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      router.replace(ROUTES.services);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro inesperado.";
      if (msg.includes("user-not-found") || msg.includes("wrong-password") || msg.includes("invalid-credential")) {
        setError("E-mail ou senha incorretos.");
      } else if (msg.includes("email-already-in-use")) {
        setError("Este e-mail já está cadastrado.");
      } else if (msg.includes("weak-password")) {
        setError("Senha fraca. Use ao menos 6 caracteres.");
      } else {
        setError("Erro ao entrar. Verifique suas credenciais.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", position: "relative", overflow: "hidden", background: "var(--bg)" }}>
      <div className="animated-bg" />

      <div className="glass-card animate-scale-in" style={{ width: "100%", maxWidth: 420, padding: "2.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <Logo size={56} />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.375rem" }}>
            QueueTheoryApp
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            {mode === "login" ? "Entre na sua conta para continuar" : "Crie sua conta gratuitamente"}
          </p>
        </div>

        {error && (
          <div className="badge badge-danger animate-slide-down" style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", fontSize: "0.875rem" }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label className="label" htmlFor="email">E-mail</label>
            <input id="email" className="input" type="email" autoComplete="email"
              placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="label" htmlFor="password">Senha</label>
            <input id="password" className="input" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"}
              placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}
            style={{ width: "100%", marginTop: "0.5rem", height: "44px", fontSize: "0.95rem" }}>
            {loading ? "Aguarde..." : mode === "login" ? "Entrar →" : "Criar conta →"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            {mode === "login" ? "Não tem uma conta? " : "Já tem uma conta? "}
          </span>
          <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontWeight: 600, fontSize: "0.875rem" }}>
            {mode === "login" ? "Criar conta" : "Entrar"}
          </button>
        </div>
      </div>

      <style>{`
        .animated-bg {
          position: fixed; inset: 0; z-index: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.12) 0%, transparent 50%),
                      radial-gradient(ellipse at 60% 80%, rgba(139,92,246,0.1) 0%, transparent 50%);
          animation: bg-shift 8s ease-in-out infinite alternate;
        }
        @keyframes bg-shift {
          from { transform: scale(1) rotate(0deg); }
          to { transform: scale(1.05) rotate(1deg); }
        }
      `}</style>
    </div>
  );
}