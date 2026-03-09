import { Card } from "../../../components/ui/card";
import MathRenderer from "../../../components/MathRenderer";

export function AboutFormulas() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
        Parâmetros e Fórmulas Calculadas
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Probabilidades de Estado
          </h3>
          <p className="text-[var(--text-secondary)] mb-2">
            As probabilidades de equilíbrio são calculadas usando
            coeficientes C_n e a probabilidade P_0.
          </p>
          <Card className="bg-[var(--element-bg)] p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300">
            <p className="text-[var(--text-primary)]">
              <strong>Coeficiente :</strong>{" "}
              <MathRenderer math="C_n = \prod_{k=1}^{n} \frac{\mu_k}{\lambda_k}" />
            </p>
            <p className="text-[var(--text-primary)]">
              <strong>Probabilidade :</strong>{" "}
              <MathRenderer math="P_n = C_n \cdot P_0" />
            </p>
            <p className="text-[var(--text-primary)]">
              <strong>Probabilidade  (normalização):</strong>{" "}
              <MathRenderer math="P_0 = \frac{1}{1 + \sum_{n=1}^{\infty} C_n}" />
            </p>
          </Card>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Número Esperado de Clientes no Sistema (L)
          </h3>
          <p className="text-[var(--text-secondary)] mb-2">
            Soma ponderada do número de clientes em cada estado.
          </p>
          <Card className="bg-[var(--element-bg)] p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300">
            <p className="text-[var(--text-primary)]">
              <MathRenderer math="L = \sum_{n=0}^{\infty} n \cdot P_n" />
            </p>
          </Card>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Número Esperado de Clientes na Fila (Lq)
          </h3>
          <p className="text-[var(--text-secondary)] mb-2">
            Somatório do produto do número de clientes em espera pela
            probabilidade de cada estado, onde s é o número de servidores.
          </p>
          <Card className="bg-[var(--element-bg)] p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300">
            <p className="text-[var(--text-primary)]">
              <MathRenderer math="L_q = \sum_{n=s}^{\infty} (n - s) \cdot P_n" />
            </p>
          </Card>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Taxa Média de Clientes Entrando no Sistema (λ)
          </h3>
          <p className="text-[var(--text-secondary)] mb-2">
            Usada quando as taxas de chegada λ_n não são iguais.
          </p>
          <Card className="bg-[var(--element-bg)] p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300">
            <p className="text-[var(--text-primary)]">
              <MathRenderer math="\lambda = \sum_{n=0}^{\infty} \lambda_n \cdot P_n" />
            </p>
          </Card>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Tempo Esperado no Sistema (W)
          </h3>
          <p className="text-[var(--text-secondary)] mb-2">
            Razão entre L e λ.
          </p>
          <Card className="bg-[var(--element-bg)] p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300">
            <p className="text-[var(--text-primary)]">
              <MathRenderer math="W = \frac{L}{\lambda}" />
            </p>
          </Card>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Tempo Esperado na Fila (Wq)
          </h3>
          <p className="text-[var(--text-secondary)] mb-2">
            Razão entre Lq e λ.
          </p>
          <Card className="bg-[var(--element-bg)] p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300">
            <p className="text-[var(--text-primary)]">
              <MathRenderer math="W_q = \frac{L_q}{\lambda}" />
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
