export function AboutHero() {
  return (
    <>
      <section style={{ marginBottom: "3rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: 32,
              height: 2,
              background: "var(--accent)",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent)",
            }}
          >
            Pesquisa Operacional
          </span>
        </div>
        <p
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            color: "var(--text-secondary)",
            marginBottom: "1.5rem",
          }}
        >
          A Pesquisa Operacional (PO) é uma área interdisciplinar da Engenharia
          de Produção, focada na aplicação de métodos analíticos avançados para
          auxiliar na tomada de decisões, oferecendo apoio matemático na
          resolução de problemas.
        </p>
        <blockquote
          style={{
            borderLeft: "3px solid var(--accent)",
            paddingLeft: "1.5rem",
            margin: "1.5rem 0",
          }}
        >
          <p
            style={{
              fontSize: "0.9375rem",
              fontStyle: "italic",
              lineHeight: 1.75,
              color: "var(--text-secondary)",
            }}
          >
            &ldquo;Resolução de problemas reais envolvendo situações de tomada
            de decisão, através de modelos matemáticos habitualmente processados
            computacionalmente. Aplica conceitos e métodos de outras disciplinas
            científicas na concepção, no planejamento ou na operação de sistemas
            para atingir seus objetivos. Procura, assim, introduzir elementos de
            objetividade e racionalidade nos processos de tomada de decisão, sem
            descuidar dos elementos subjetivos e de enquadramento organizacional
            que caracterizam os problemas.&rdquo;
          </p>
          <footer
            style={{
              marginTop: "0.75rem",
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
            }}
          >
            — Associação Brasileira de Engenharia de Produção (ABEPRO, 2025)
          </footer>
        </blockquote>
        <p
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            color: "var(--text-secondary)",
          }}
        >
          Diante deste contexto, a Teoria das Filas surge como uma aplicação
          essencial e técnica chave dentro da PO, usada para modelar, analisar e
          otimizar o comportamento de sistemas complexos onde eventos ocorrem em
          pontos específicos no tempo.
        </p>
      </section>

      <section
        style={{
          marginBottom: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: 32,
              height: 2,
              background: "var(--accent-cyan)",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-cyan)",
            }}
          >
            Teoria das Filas
          </span>
        </div>
        <p
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            color: "var(--text-secondary)",
            marginBottom: "1.25rem",
          }}
        >
          A Teoria das Filas é fundamental para entender sistemas de atendimento
          — bancos, hospitais e, no contexto deste estudo, vias de trânsito de
          veículos. As filas são analisadas para prever tempos de espera,
          utilização de recursos e capacidade de atendimento. A simulação de
          eventos discretos é a técnica central para modelar e otimizar esses
          sistemas, onde eventos ocorrem em pontos específicos no tempo.
        </p>
        <p
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            color: "var(--text-secondary)",
          }}
        >
          A determinação dos parâmetros de operação segue a teoria da disciplina
          <em> Probabilidade e Modelos Estocásticos</em>. Após medir λ (taxa de
          chegada) e μ (taxa de atendimento), definem-se os estados da fila de
          P₀ a P₁₀ — indicadores da probabilidade de haver clientes no sistema.
          Conhecido P₀, as demais probabilidades Pₙ são calculadas
          recursivamente e os parâmetros de desempenho derivam das equações
          teóricas pertinentes.
        </p>
      </section>
    </>
  );
}
