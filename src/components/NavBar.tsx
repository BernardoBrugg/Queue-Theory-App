"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "./AuthContext";
import { ROUTES } from "../config/routes";

export function NavBar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="content-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
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
          <Logo size={32} />
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>
            QueueTheoryApp
          </span>
        </Link>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <NavLinks />
          <div style={{ width: 1, height: 24, background: "var(--border)", margin: "0 0.5rem" }} />
          <ThemeToggle />
          {user && (
            <button onClick={logout} className="btn btn-ghost btn-sm">
              Sair
            </button>
          )}
        </div>

        <button
          className="btn btn-ghost btn-sm mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          style={{ display: "none" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
