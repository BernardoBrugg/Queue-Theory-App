import MathRenderer from "../../../components/MathRenderer";

function FormulaRow({ label, math }: { label: string; math: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        padding: "0.75rem 0",
        borderBottom: "1px solid var(--border)",
      }}
      className="formula-row"
    >
      <span
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.875rem",
          fontWeight: 500,
          minWidth: 200,
        }}
      >
        {label}
      </span>
      <span style={{ color: "var(--text-primary)" }}>
        <MathRenderer math={math} />
      </span>
      <style>{`.formula-row:last-child { border-bottom: none; }`}</style>
    </div>
  );
}

export function AboutFormulas() {
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
        Parâmetros e Fórmulas Calculadas
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.375rem",
            }}
          >
            Fórmulas Gerais — Processo de Birth-Death
          </h3>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              marginBottom: "1rem",
              lineHeight: 1.6,
            }}
          >
            Válidas para qualquer modelo com taxas de chegada{" "}
            <MathRenderer math="\lambda_n" /> e serviço{" "}
            <MathRenderer math="\mu_n" /> dependentes do estado.
          </p>
          <div className="glass-card p-6">
            <FormulaRow
              label="Coeficiente Cₙ"
              math="C_n = \prod_{k=1}^{n} \frac{\lambda_{k-1}}{\mu_k}"
            />
            <FormulaRow label="Probabilidade Pₙ" math="P_n = C_n \cdot P_0" />
            <FormulaRow
              label="Normalização P₀"
              math="P_0 = \frac{1}{1 + \displaystyle\sum_{n=1}^{\infty} C_n}"
            />
            <FormulaRow
              label="Clientes no sistema (L)"
              math="L = \sum_{n=0}^{\infty} n \cdot P_n"
            />
            <FormulaRow
              label="Clientes na fila (Lq)"
              math="L_q = \sum_{n=s}^{\infty} (n - s) \cdot P_n"
            />
            <FormulaRow
              label="Taxa efetiva de chegada"
              math="\bar{\lambda} = \sum_{n=0}^{\infty} \lambda_n \cdot P_n"
            />
            <FormulaRow
              label="Tempo no sistema (W)"
              math="W = \dfrac{L}{\bar{\lambda}}"
            />
            <FormulaRow
              label="Tempo na fila (Wq)"
              math="W_q = \dfrac{L_q}{\bar{\lambda}}"
            />
          </div>
        </div>

        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.375rem",
            }}
          >
            Fórmulas Fechadas — Modelo M/M/c (Erlang-C)
          </h3>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              marginBottom: "1rem",
              lineHeight: 1.6,
            }}
          >
            Forma analítica para chegadas Poisson, serviço exponencial e{" "}
            <em>c</em> servidores idênticos.
          </p>
          <div className="glass-card p-6">
            <FormulaRow
              label="Utilização por servidor (ρ)"
              math="\rho = \dfrac{\lambda}{c\,\mu}"
            />
            <FormulaRow
              label="Probabilidade P₀"
              math="P_0 = \left[ \sum_{n=0}^{c-1} \frac{(c\rho)^n}{n!} + \frac{(c\rho)^c}{c!\,(1-\rho)} \right]^{-1}"
            />
            <FormulaRow
              label="Clientes na fila (Lq)"
              math="L_q = \dfrac{P_0\,(c\rho)^c\,\rho}{c!\,(1-\rho)^2}"
            />
            <FormulaRow
              label="Clientes no sistema (L)"
              math="L = L_q + \dfrac{\lambda}{\mu}"
            />
            <FormulaRow
              label="Tempo no sistema (W)"
              math="W = \dfrac{L}{\lambda}"
            />
            <FormulaRow
              label="Tempo na fila (Wq)"
              math="W_q = \dfrac{L_q}{\lambda}"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
