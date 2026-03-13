const chartGuide = [
  {
    title: "Distribuição de Probabilidade P(n)",
    description:
      "Barras representando a probabilidade de existirem n clientes simultâneos no sistema. Identifica os níveis de ocupação mais frequentes e apoia o dimensionamento de capacidade.",
  },
  {
    title: "Comparação de Tempos Médios",
    description:
      "Contrasta os tempos médios chave: tempo total no sistema (W), tempo de espera na fila (Wq) e tempo líquido de serviço (1/μ). Evidencia gargalos e eficiência do atendimento.",
  },
  {
    title: "Dinâmica de Tempos por Cliente",
    description:
      "Série temporal com o tempo de serviço e de espera individual por ordem de chegada. Identifica picos de demanda e variações ao longo da sessão de coleta.",
  },
  {
    title: "Fluxo Acumulado",
    description:
      "Curva de chegadas acumuladas versus saídas acumuladas ao longo do tempo. A distância vertical entre as duas curvas representa o número de clientes no sistema em cada instante.",
  },
];

const applicationAreas = [
  {
    area: "Atendimento ao cliente",
    description:
      "Dimensionamento de caixas, call centers e balções de informação.",
  },
  {
    area: "Tráfego e transporte",
    description:
      "Análise de fluxo em cruzamentos, pedágios, aeroportos e terminais.",
  },
  {
    area: "Sistemas computacionais",
    description:
      "Escalonamento de processos, buffers de rede e servidores web.",
  },
  {
    area: "Saúde",
    description:
      "Triagem em pronto-socorros, filas de exames e agendamento cirúrgico.",
  },
];

export function AboutApplications() {
  return (
    <>
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
          Interpretação dos Gráficos
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "1.75rem",
            lineHeight: 1.65,
          }}
        >
          O painel de métricas e a página de simulações exibem visualizações
          derivadas dos parâmetros calculados. Veja o que cada gráfico
          representa.
        </p>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}
        >
          {chartGuide.map((item, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: "var(--radius-full)",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                }}
              >
                {i + 1}
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
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    fontSize: "0.9375rem",
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
          Aplicações Práticas
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "1.75rem",
            lineHeight: 1.65,
          }}
        >
          A Teoria das Filas é aplicada em setores onde o gerenciamento de
          espera é crítico para eficiência operacional e qualidade de serviço.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {applicationAreas.map(({ area, description }) => (
            <div
              key={area}
              style={{
                padding: "1rem 1.25rem",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                background: "var(--surface-glass)",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  fontSize: "0.875rem",
                  marginBottom: "0.25rem",
                }}
              >
                {area}
              </div>
              <div
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                  lineHeight: 1.55,
                }}
              >
                {description}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer
        style={{
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            lineHeight: 1.6,
          }}
        >
          Explore o aplicativo para aplicar esses conceitos na prática e
          otimizar sistemas reais baseados em dados coletados in loco.
        </p>
      </footer>
    </>
  );
}
