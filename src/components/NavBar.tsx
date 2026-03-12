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
          backgroundColor: scrolled ? "var(--nav-bg)" : "var(--surface-glass)",
          border: "1px solid var(--border-glass)",
          borderRadius: "var(--radius-full)",
          boxShadow: scrolled ? "var(--shadow-lg)" : "var(--shadow-md)",
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
            transition: "opacity 200ms ease",
          }}
        >
          <Logo size={28} />
          <span
            style={{
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            QueueTheoryApp
          </span>
        </Link>

        <div
          className="desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <NavLinks />
          <div
            style={{
              width: 1,
              height: 20,
              background: "var(--border)",
              margin: "0 0.5rem",
            }}
          />
          <ThemeToggle />
          {user && (
            <button onClick={logout} className="btn btn-ghost btn-sm">
              Sair
            </button>
          )}
        </div>

        <div
          className="mobile-nav-controls"
          style={{ display: "none", alignItems: "center", gap: "0.5rem" }}
        >
          <ThemeToggle />
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
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
            transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
            style={{
              overflow: "hidden",
              maxWidth: "1200px",
              margin: "0.5rem auto 0",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              backgroundColor: "var(--surface-glass)",
              border: "1px solid var(--border-glass)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <div style={{ padding: "0.75rem 1.25rem 1.25rem" }}>
              <NavLinks />
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="btn btn-ghost btn-sm"
                  style={{
                    marginTop: "0.5rem",
                    width: "100%",
                    justifyContent: "flex-start",
                  }}
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
        }
      `}</style>
    </header>
  );
}
