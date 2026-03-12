"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { ROUTES } from "../config/routes";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(ROUTES.login);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            border: "3px solid var(--accent)",
            borderTopColor: "transparent",
            animation: "spin-slow 0.8s linear infinite",
            margin: "0 auto 1rem",
          }} />
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
