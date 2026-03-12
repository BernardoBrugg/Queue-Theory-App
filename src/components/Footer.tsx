"use client";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "4rem 1.5rem 2rem",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "2.5rem",
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "2rem",
        }}>
          <div>
            <p style={{
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "var(--text-primary)",
              marginBottom: "0.25rem",
              letterSpacing: "-0.02em",
            }}>
              QueueTheoryApp
            </p>
            <p style={{
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              maxWidth: 320,
              lineHeight: 1.6,
            }}>
              Análise de Teoria das Filas e Pesquisa Operacional acadêmica.
            </p>
          </div>

          <div style={{
            display: "flex",
            gap: "3rem",
            flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                Produto
              </p>
              <FooterLink href="/data" label="Dados" />
              <FooterLink href="/dashboards" label="Painéis" />
              <FooterLink href="/simulations" label="Simulações" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                Recursos
              </p>
              <FooterLink href="/about" label="Sobre" />
              <FooterLink href="mailto:devbebrugg@gmail.com" label="Contato" />
              <FooterLink href="https://github.com/BernardoBrugg/P02" label="GitHub" external />
            </div>
          </div>
        </div>

        <div style={{
          overflow: "hidden",
          userSelect: "none",
          pointerEvents: "none",
        }}>
          <p style={{
            fontSize: "clamp(3rem, 12vw, 10rem)",
            fontWeight: 900,
            color: "var(--text-primary)",
            opacity: 0.04,
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
            whiteSpace: "nowrap",
          }}>
            QueueTheory
          </p>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          paddingTop: "1rem",
          borderTop: "1px solid var(--border)",
        }}>
          <p style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}>
            &copy; {new Date().getFullYear()} QueueTheoryApp — Bernardo Brüggemann
          </p>
          <a
            href="https://github.com/BernardoBrugg/P02"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 200ms ease",
            }}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        fontSize: "0.85rem",
        color: "var(--text-muted)",
        textDecoration: "none",
        transition: "color 200ms ease",
      }}
    >
      {label}
    </a>
  );
}
