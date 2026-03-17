"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "../config/routes";

const NAV_LINKS = [
  { href: ROUTES.services, label: "Serviços" },
  { href: ROUTES.data, label: "Dados" },
  { href: ROUTES.dashboards, label: "Dashboards" },
  { href: ROUTES.simulations, label: "Simulações" },
  { href: ROUTES.about, label: "Sobre" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className="inline-flex w-full md:w-auto items-center px-3 py-1.5 rounded-md text-sm transition-all"
            style={{
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "var(--accent)" : "var(--text-secondary)",
              background: isActive ? "var(--accent-light)" : "transparent",
              textDecoration: "none",
            }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
