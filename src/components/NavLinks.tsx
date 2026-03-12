"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "../config/routes";

const NAV_LINKS = [
  { href: ROUTES.services, label: "Serviços", step: 1 },
  { href: ROUTES.data, label: "Dados", step: 2 },
  { href: ROUTES.dashboards, label: "Painéis", step: 3 },
  { href: ROUTES.simulations, label: "Simulações", step: null },
  { href: ROUTES.about, label: "Sobre", step: null },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
      {NAV_LINKS.map(({ href, label, step }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.375rem 0.75rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.875rem",
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "var(--accent)" : "var(--text-secondary)",
              background: isActive ? "var(--accent-light)" : "transparent",
              textDecoration: "none",
              transition: "all var(--transition-fast)",
            }}
          >
            {step !== null && (
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: isActive ? "var(--accent)" : "var(--surface-raised)",
                  color: isActive ? "white" : "var(--text-muted)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {step}
              </span>
            )}
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
