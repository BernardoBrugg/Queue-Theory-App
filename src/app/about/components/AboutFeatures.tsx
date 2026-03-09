import { Card } from "../../../components/ui/card";

export function AboutFeatures() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
        Funcionalidades Principais
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="bg-[var(--element-bg)] p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 group">
          <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 text-white"
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
          </div>
          <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
            Cronômetros
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Adicione filas e meça tempos de chegada e saída de clientes em
            tempo real.
          </p>
        </Card>
        <Card className="bg-[var(--element-bg)] p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 group">
          <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 text-white"
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
          </div>
          <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
            Dados
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Visualize, importe e exporte dados coletados para análise
            externa.
          </p>
        </Card>
        <Card className="bg-[var(--element-bg)] p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 group">
          <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 text-white"
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
          </div>
          <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
            Painéis
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Calcule e explore métricas de desempenho com gráficos
            interativos.
          </p>
        </Card>
        <Card className="bg-[var(--element-bg)] p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 group">
          <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 text-white"
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
          </div>
          <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
            Simulações
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Carregue estudos de caso pré-definidos para comparar cenários
            diferentes.
          </p>
        </Card>
      </div>
    </div>
  );
}
