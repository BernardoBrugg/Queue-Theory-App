const concepts = [
  {
    term: "Clientes",
    definition:
      "Entidades que chegam ao sistema para receber serviço. Podem ser pessoas, veículos, pacotes de dados ou solicitações de processo — qualquer unidade que demanda atendimento.",
  },
  {
    term: "Fila",
    definition:
      "Local de espera onde os clientes aguardam o servidor. A capacidade pode ser finita (limite máximo de clientes) ou infinita, dependendo do modelo adotado.",
  },
  {
    term: "Servidor (c)",
    definition:
      "Recurso responsável por atender os clientes: um caixa de banco, um médico, um processador. O modelo M/M/c opera com c servidores idênticos em paralelo.",
  },
  {
    term: "Disciplina FIFO",
    definition:
      "Regra de prioridade padrão: o primeiro cliente a chegar é o primeiro a ser atendido (First In, First Out). É a disciplina adotada no modelo M/M/c clássico.",
  },
  {
    term: "Processo de Poisson",
    definition:
      "Modelo que descreve chegadas aleatórias: os intervalos entre chegadas seguem distribuição exponencial e os eventos são independentes. O parâmetro λ define a taxa de chegada média.",
  },
  {
    term: "Distribuição Exponencial",
    definition:
      "Distribuição usada para modelar tempos de serviço. Possui a propriedade de perda de memória: o tempo restante de atendimento é independente do tempo já decorrido. O parâmetro μ define a taxa de serviço.",
  },
];

const premissas = [
  "Chegadas seguem um Processo de Poisson (intervalos exponencialmente distribuídos).",
  "Tempos de serviço são exponencialmente distribuídos.",
  "Há c servidores idênticos operando em paralelo.",
  "A capacidade da fila é infinita e a disciplina é FIFO.",
];

export function AboutConcepts() {
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
        Conceitos Fundamentais
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "2rem",
          lineHeight: 1.65,
        }}
      >
        A Teoria das Filas lida com incerteza, modelando chegadas e atendimentos
        como processos aleatórios. Os termos abaixo aparecem consistentemente ao
        longo de toda a teoria.
      </p>
      <dl
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        {concepts.map(({ term, definition }) => (
          <div
            key={term}
            style={{
              display: "grid",
              gridTemplateColumns: "clamp(120px, 25%, 180px) 1fr",
              gap: "1rem",
              alignItems: "start",
            }}
          >
            <dt
              style={{
                fontWeight: 700,
                color: "var(--text-primary)",
                fontSize: "0.9375rem",
                paddingTop: 2,
              }}
            >
              {term}
            </dt>
            <dd
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                fontSize: "0.9375rem",
              }}
            >
              {definition}
            </dd>
          </div>
        ))}
      </dl>
      <div
        style={{
          padding: "1.25rem 1.5rem",
          background: "var(--surface-raised)",
          borderRadius: "var(--radius-lg)",
          borderLeft: "3px solid var(--accent-cyan)",
        }}
      >
        <h3
          style={{
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
            fontSize: "0.9375rem",
          }}
        >
          Premissas do modelo M/M/c (Erlang-C)
        </h3>
        <ul style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {premissas.map((point, i) => (
            <li
              key={i}
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                paddingLeft: "1rem",
                position: "relative",
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  color: "var(--accent-cyan)",
                  fontWeight: 700,
                }}
              >
                ·
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
