"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export function Nav() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      setIsProfileOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--element-bg)]/80 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <Link
          href="/"
          className="transition-all duration-300 hover:scale-105"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/cronAppLogo.png"
            alt="Teoria das filas: CronApp"
            width={40}
            height={40}
            className="h-10 w-auto rounded-lg sm:h-12"
          />
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
          >
            Início
          </Link>
          <Link
            href="/chronometers"
            className="text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
          >
            Cronômetros
          </Link>
          <Link
            href="/data"
            className="text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
          >
            Dados
          </Link>
          <Link
            href="/dashboards"
            className="text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
          >
            Painéis
          </Link>
          <Link
            href="/simulations"
            className="text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
          >
            Simulações
          </Link>
          <Link
            href="/about"
            className="text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
          >
            Sobre
          </Link>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 rounded-full bg-[var(--button-bg)] hover:bg-[var(--button-hover)] text-white transition-all duration-300 flex items-center justify-center"
                title={user.email || "Perfil"}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[var(--element-bg)]/95 backdrop-blur-lg border-2 border-[var(--element-border)] rounded-lg shadow-xl py-2">
                  <div className="px-4 py-3 border-b border-[var(--element-border)]">
                    <p className="text-sm text-[var(--text-muted)]">Logado como</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--accent-light)] transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg
                      className="w-5 h-5 text-[var(--button-danger)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-semibold">Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
            >
              Login
            </Link>
          )}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full bg-[var(--element-bg)] border-2 border-[var(--element-border)] hover:bg-[var(--accent-light)] text-[var(--text-primary)] transition-all duration-300"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-[var(--element-bg)] border-2 border-[var(--element-border)] hover:bg-[var(--accent-light)] text-[var(--text-primary)] transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--element-bg)]/95 backdrop-blur-lg shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/chronometers"
              className="block text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Cronômetros
            </Link>
            <Link
              href="/data"
              className="block text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Dados
            </Link>
            <Link
              href="/dashboards"
              className="block text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Painéis
            </Link>
            <Link
              href="/simulations"
              className="block text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Simulações
            </Link>
            <Link
              href="/about"
              className="block text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            {user ? (
              <>
                <div className="px-2 py-2 bg-[var(--accent-light)] rounded-lg">
                  <p className="text-xs text-[var(--text-muted)]">Logado como</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-[var(--button-danger)] hover:text-[var(--button-danger-hover)] transition-colors duration-300 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
            {mounted && (
              <button
                onClick={() => {
                  setTheme(theme === "light" ? "dark" : "light");
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-[var(--text-primary)] hover:text-[var(--button-bg)] transition-colors duration-300 font-semibold"
              >
                {theme === "light" ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="text-[var(--text-primary)]">{theme === "light" ? "Modo Escuro" : "Modo Claro"}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
