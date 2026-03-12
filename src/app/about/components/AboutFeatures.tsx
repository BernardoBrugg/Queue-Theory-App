const features = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Cronômetros",
    description:
      "Adicione filas e meça tempos de chegada e saída de clientes em tempo real, com suporte a atalhos de teclado e múltiplos postos simultâneos.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Dados e Registros",
    description:
      "Visualize, filtre e exporte todos os registros coletados. Os dados são persistidos na nuvem e acessíveis de qualquer dispositivo autenticado.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Painel de Métricas",
    description:
      "Calcule automaticamente as métricas M/M/c — ρ, L, Lq, W, Wq — a partir dos dados coletados e visualize distribuições de probabilidade em gráficos interativos.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "Simulações",
    description:
      "Explore estudos de caso pré-definidos ou insira parâmetros próprios para comparar cenários de carga e analisar modelos M/M/c sem coleta de dados.",
  },
];

export function AboutFeatures() {
  return (
    <section
      style={{
        marginBottom: "3rem",
        paddingTop: "2rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      <h2
        style={{
          fontSize: "1.375rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
          letterSpacing: "-0.02em",
        }}
      >
        Funcionalidades Principais
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "1.75rem",
          lineHeight: 1.65,
        }}
      >
        O aplicativo cobre as quatro etapas do fluxo de análise de filas — da
        coleta de dados até a simulação de cenários teóricos.
      </p>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}
      >
        {features.map((feature, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "1.25rem",
              alignItems: "flex-start",
              padding: "1.125rem 1.25rem",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              background: "var(--surface-glass)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: "var(--radius-md)",
                background: "var(--accent-light)",
                color: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {feature.icon}
            </div>
            <div>
              <h3
                style={{
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.25rem",
                  fontSize: "0.9375rem",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  fontSize: "0.9375rem",
                }}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
