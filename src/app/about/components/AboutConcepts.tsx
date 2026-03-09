import { Card } from "../../../components/ui/card";

export function AboutConcepts() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
        Conceitos Fundamentais da Teoria das Filas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-[var(--element-bg)] p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Elementos de um Sistema de Filas
          </h3>
          <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
            <li>
              <strong>Clientes</strong>: Entidades que chegam ao sistema
              para receber serviço (pessoas, veículos, pacotes de dados,
              etc.).
            </li>
            <li>
              <strong>Fila</strong>: Local de espera onde os clientes
              aguardam se o servidor estiver ocupado.
            </li>
            <li>
              <strong>Servidor</strong>: Recurso que atende os clientes
              (caixa de banco, médico, processador, etc.).
            </li>
            <li>
              <strong>Disciplina de Fila</strong>: Regra para ordenar os
              clientes na fila (ex.: FIFO - Primeiro a Chegar, Primeiro a
              Ser Atendido).
            </li>
          </ul>
        </Card>
        <Card className="bg-[var(--element-bg)] p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Processos Estocásticos
          </h3>
          <p className="text-[var(--text-secondary)] mb-4">
            A Teoria das Filas lida com incertezas, modelando chegadas e
            serviços como processos aleatórios. O modelo M/M/1 assume:
          </p>
          <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
            <li>
              Chegadas seguem um Processo de Poisson (exponencialmente
              distribuído).
            </li>
            <li>Tempos de serviço são exponencialmente distribuídos.</li>
            <li>Um único servidor.</li>
            <li>Capacidade infinita da fila.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
