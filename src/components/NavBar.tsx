"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "./AuthContext";
import { ROUTES } from "../config/routes";
import { motion, AnimatePresence } from "framer-motion";

export function NavBar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: scrolled ? "var(--nav-bg)" : "var(--surface-glass)",
        borderBottom: `1px solid ${scrolled ? "var(--nav-border)" : "var(--border-glass)"}`,
        transition: "all 400ms cubic-bezier(0.2, 0, 0, 1)",
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
            transition: "opacity 200ms ease",
          }}
        >
          <Logo size={32} />
          <span style={{
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}>
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

        <div className="mobile-nav-controls" style={{ display: "none", alignItems: "center", gap: "0.5rem" }}>
          <ThemeToggle />
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            style={{ overflow: "hidden" }}
            className="mobile-menu-panel"
          >
            <div style={{ padding: "0.5rem 1.5rem 1.5rem" }}>
              <NavLinks onNavigate={() => setMobileOpen(false)} />
              {user && (
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="btn btn-ghost btn-sm"
                  style={{ marginTop: "0.5rem", width: "100%", justifyContent: "flex-start" }}
                >
                  Sair
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-controls { display: flex !important; }
          .mobile-menu-panel { display: block; }
        }
      `}</style>
    </header>
  );
}
