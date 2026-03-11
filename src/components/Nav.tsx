"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/data", label: "Dados" },
  { href: "/dashboards", label: "Painéis" },
  { href: "/simulations", label: "Simulações" },
  { href: "/about", label: "Sobre" },
];

export function Nav() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setIsProfileOpen(false);
    if (isProfileOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isProfileOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      setIsProfileOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
    borderBottom: scrolled ? "1px solid var(--nav-border)" : "1px solid transparent",
    transition: "all 400ms cubic-bezier(0.2, 0, 0, 1)",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: 1280,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
  };

  const linkStyle: React.CSSProperties = {
    color: "var(--text-secondary)",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: 500,
    transition: "color 200ms ease",
    letterSpacing: "-0.01em",
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
            transition: "opacity 200ms ease",
          }}
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/cronAppLogo.png"
            alt="QueueTheoryApp"
            width={32}
            height={32}
            style={{ borderRadius: "var(--radius-sm)" }}
          />
          <span style={{
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}>
            QueueTheoryApp
          </span>
        </Link>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1.75rem",
        }}
          className="nav-desktop"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={linkStyle}>
              {label}
            </Link>
          ))}

          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen(!isProfileOpen);
                }}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 200ms ease, box-shadow 200ms ease",
                }}
                title={user.email || "Perfil"}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 8px)",
                      width: 260,
                      background: "var(--surface)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "var(--shadow-lg)",
                      overflow: "hidden",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{
                      padding: "0.875rem 1rem",
                      borderBottom: "1px solid var(--border)",
                    }}>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.125rem" }}>
                        Logado como
                      </p>
                      <p style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "0.75rem 1rem",
                        background: "none",
                        border: "none",
                        color: "var(--danger)",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "background 150ms ease",
                      }}
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <polyline points="16,17 21,12 16,7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Sair
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm">
              Entrar
            </Link>
          )}

          <ThemeToggle />
        </div>

        <div className="nav-mobile">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              padding: "0.5rem",
              borderRadius: "var(--radius-md)",
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 200ms ease",
            }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            style={{ overflow: "hidden" }}
            className="nav-mobile-menu"
          >
            <div style={{
              padding: "0.5rem 1.5rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}>
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    ...linkStyle,
                    display: "block",
                    padding: "0.75rem 0.5rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {user ? (
                <>
                  <div style={{
                    padding: "0.75rem",
                    background: "var(--surface-raised)",
                    borderRadius: "var(--radius-md)",
                    marginTop: "0.5rem",
                  }}>
                    <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Logado como</p>
                    <p style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      ...linkStyle,
                      display: "block",
                      padding: "0.75rem 0.5rem",
                      color: "var(--danger)",
                      fontWeight: 600,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="btn btn-primary"
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Entrar
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        .nav-mobile-menu { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex; align-items: center; gap: 0.5rem; }
          .nav-mobile-menu { display: block; }
        }
      `}</style>
    </nav>
  );
}
