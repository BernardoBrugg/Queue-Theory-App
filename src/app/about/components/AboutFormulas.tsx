import MathRenderer from "../../../components/MathRenderer";

export function AboutFormulas() {
  return (
    <div className="mb-8">
      <h2 className="section-title">
        Parâmetros e Fórmulas Calculadas
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            Probabilidades de Estado
          </h3>
          <p className="text-[var(--text-secondary)] mb-4">
            As probabilidades de estado M/M/c são calculadas identificando P0 e iterando.
          </p>
          <div className="glass-card p-6">
            <p className="text-[var(--text-primary)] mb-3">
              <strong>Múltiplos Servidores (c) P0:</strong>{" "}
              <MathRenderer math="P_0 = \left[ \sum_{n=0}^{c-1} \frac{(c\rho)^n}{n!} + \frac{(c\rho)^c}{c!(1-\rho)} \right]^{-1}" />
            </p>
            <p className="text-[var(--text-primary)]">
              <strong>Utilização do Sistema (ρ):</strong>{" "}
              <MathRenderer math="\rho = \frac{\lambda}{c \mu}" />
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-2">
            Número Esperado de Clientes no Sistema (L)
          </h3>
          <p className="text-[var(--text-secondary)] mb-4">
            A média de clientes presentes no sistema completo (fila e em atendimento).
          </p>
          <div className="glass-card p-6">
            <p className="text-[var(--text-primary)]">
              <MathRenderer math="L = L_q + \frac{\lambda}{\mu}" />
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-2">
            Número Esperado de Clientes na Fila (Lq)
          </h3>
          <p className="text-[var(--text-secondary)] mb-4">
            A média de clientes aguardando na fila antes do atendimento (M/M/c).
          </p>
          <div className="glass-card p-6">
            <p className="text-[var(--text-primary)]">
              <MathRenderer math="L_q = \frac{P_0 (c\rho)^c \rho}{c! (1-\rho)^2}" />
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-2">
            Taxa Média de Clientes Entrando no Sistema (λ)
          </h3>
          <p className="text-[var(--text-secondary)] mb-4">
            Calculada a partir dos tempos de chegada inter-eventos (inverso da média).
          </p>
          <div className="glass-card p-6">
            <p className="text-[var(--text-primary)]">
              <MathRenderer math="\lambda = \frac{1}{\text{Média do Tempo entre Chegadas}}" />
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-2">
            Tempo Esperado no Sistema (W)
          </h3>
          <p className="text-[var(--text-secondary)] mb-4">
            Pela Lei de Little, equivale à razão entre L e λ.
          </p>
          <div className="glass-card p-6">
            <p className="text-[var(--text-primary)]">
              <MathRenderer math="W = \frac{L}{\lambda}" />
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-2">
            Tempo Esperado na Fila (Wq)
          </h3>
          <p className="text-[var(--text-secondary)] mb-4">
            Pela Lei de Little, equivale à razão entre L_q e λ.
          </p>
          <div className="glass-card p-6">
            <p className="text-[var(--text-primary)]">
              <MathRenderer math="W_q = \frac{L_q}{\lambda}" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
