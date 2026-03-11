export function AboutApplications() {
  return (
    <>
      <div className="mb-8">
        <h2 className="section-title">
          Interpretação dos Gráficos
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Gráfico Cumulativo
            </h3>
            <p className="text-[var(--text-secondary)]">
              Mostra a evolução temporal das chegadas e saídas acumuladas.
              Permite visualizar o fluxo de clientes ao longo do tempo,
              identificando períodos de pico ou equilíbrio.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Gráfico de Probabilidades P(n)
            </h3>
            <p className="text-[var(--text-secondary)]">
              Barras representando a distribuição de estados. Ajuda a
              entender a probabilidade de diferentes níveis de ocupação,
              crucial para dimensionar recursos.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="section-title">
          Aplicações Práticas
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          A Teoria das Filas é aplicada em diversos campos para otimizar
          sistemas de espera, incluindo atendimento ao cliente, tráfego e
          transporte, sistemas computacionais e saúde. O aplicativo permite
          coletar dados reais e aplicar essas fórmulas para tomar decisões
          informadas.
        </p>
      </div>
      <div className="text-center">
        <p className="text-[var(--text-secondary)]">
          Explore o aplicativo para aplicar esses conceitos na prática e
          melhorar o desempenho de sistemas reais.
        </p>
      </div>
    </>
  );
}
