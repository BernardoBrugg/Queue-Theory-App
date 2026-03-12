"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthContext";
import { Logo } from "../../components/Logo";
import { ROUTES } from "../../config/routes";
import { AlertTriangle, Check, X, Eye, EyeOff } from "lucide-react";

type Mode = "login" | "register";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PWD_RULES = [
  {
    id: "len",
    label: "Mínimo 8 caracteres",
    test: (p: string) => p.length >= 8,
  },
  {
    id: "upper",
    label: "Uma letra maiúscula",
    test: (p: string) => /[A-Z]/.test(p),
  },
  { id: "num", label: "Um número", test: (p: string) => /[0-9]/.test(p) },
];

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwdFocused, setPwdFocused] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(ROUTES.services);
    }
  }, [user, authLoading, router]);

  const isRegister = mode === "register";
  const allRulesMet = PWD_RULES.every((r) => r.test(password));
  const emailValid = EMAIL_RE.test(email);
  const confirmMatch = password === confirm;

  const validate = (): string => {
    if (!emailValid) return "Informe um e-mail válido.";
    if (isRegister) {
      if (!allRulesMet) return "A senha não atende todos os requisitos.";
      if (!confirmMatch) return "As senhas não coincidem.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
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
      if (
        msg.includes("user-not-found") ||
        msg.includes("wrong-password") ||
        msg.includes("invalid-credential")
      ) {
        setError("E-mail ou senha incorretos.");
      } else if (msg.includes("email-already-in-use")) {
        setError("Este e-mail já está cadastrado.");
      } else if (msg.includes("weak-password")) {
        setError("Senha fraca. Use ao menos 8 caracteres.");
      } else {
        setError("Erro ao entrar. Verifique suas credenciais.");
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setPassword("");
    setConfirm("");
    setPwdFocused(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <div className="animated-bg" />

      <div
        className="glass-card animate-scale-in"
        style={{
          width: "100%",
          maxWidth: 420,
          padding: "2.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <Logo size={56} />
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "0.375rem",
            }}
          >
            QueueTheoryApp
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            {mode === "login"
              ? "Entre na sua conta para continuar"
              : "Crie sua conta gratuitamente"}
          </p>
        </div>

        {error && (
          <div
            className="badge badge-danger animate-slide-down"
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              marginBottom: "1.25rem",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <AlertTriangle className="w-4 h-4" /> {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <label className="label" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              className="input"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="password">
              Senha
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                className="input"
                type={showPwd ? "text" : "password"}
                autoComplete={isRegister ? "new-password" : "current-password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPwdFocused(true)}
                style={{ paddingRight: "2.75rem" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                }}
                tabIndex={-1}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {isRegister && (pwdFocused || password.length > 0) && (
              <div
                style={{
                  marginTop: "0.625rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                }}
              >
                {PWD_RULES.map((rule) => {
                  const ok = rule.test(password);
                  return (
                    <div
                      key={rule.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.8rem",
                        color: ok ? "var(--success)" : "var(--text-muted)",
                        transition: "color 200ms ease",
                      }}
                    >
                      {ok ? (
                        <Check size={13} style={{ flexShrink: 0 }} />
                      ) : (
                        <X size={13} style={{ flexShrink: 0, opacity: 0.5 }} />
                      )}
                      {rule.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {isRegister && (
            <div>
              <label className="label" htmlFor="confirm">
                Confirmar senha
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="confirm"
                  className="input"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  style={{
                    paddingRight: "2.75rem",
                    borderColor:
                      confirm.length > 0
                        ? confirmMatch
                          ? "var(--success)"
                          : "var(--danger)"
                        : undefined,
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                  }}
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirm.length > 0 && !confirmMatch && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--danger)",
                    marginTop: "0.35rem",
                  }}
                >
                  As senhas não coincidem.
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "0.5rem",
              height: "44px",
              fontSize: "0.95rem",
            }}
          >
            {loading
              ? "Aguarde..."
              : mode === "login"
                ? "Entrar →"
                : "Criar conta →"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            {mode === "login" ? "Não tem uma conta? " : "Já tem uma conta? "}
          </span>
          <button
            onClick={() => switchMode(mode === "login" ? "register" : "login")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--accent)",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
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
