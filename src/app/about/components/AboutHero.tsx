import { Card } from "../../../components/ui/card";

export function AboutHero() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          Pesquisa Operacional
        </h2>
        <p className="text-[var(--text-primary)] text-lg leading-relaxed mb-4">
          A Pesquisa Operacional (PO) é uma área interdisciplinar da
          Engenharia de Produção, focada na aplicação de métodos analíticos
          avançados para auxiliar na tomada de decisões, oferecendo apoio
          matemático na resolução de problemas.
        </p>
        <Card className="p-4">
          <p className="text-[var(--text-secondary)] italic">
            &quot;Resolução de problemas reais envolvendo situações de
            tomada de decisão, através de modelos matemáticos habitualmente
            processados computacionalmente. Aplica conceitos e métodos de
            outras disciplinas científicas na concepção, no planejamento ou
            na operação de sistemas para atingir seus objetivos. Procura,
            assim, introduzir elementos de objetividade e racionalidade nos
            processos de tomada de decisão, sem descuidar dos elementos
            subjetivos e de enquadramento organizacional que caracterizam os
            problemas.&quot;
          </p>
          <p className="text-[var(--text-secondary)] mt-2 text-sm">
            — Associação Brasileira de Engenharia de Produção (ABEPRO, 2025)
          </p>
        </Card>
        <p className="text-[var(--text-primary)] mt-4">
          Diante deste contexto, a Teoria das Filas surge como uma aplicação
          essencial e técnica chave dentro da PO, usada para modelar,
          analisar e otimizar o comportamento de sistemas complexos onde
          eventos ocorrem em pontos específicos no tempo.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          Teoria das Filas
        </h2>
        <p className="text-[var(--text-primary)] leading-relaxed mb-4">
          A simulação de eventos discretos é uma técnica essencial dentro da
          pesquisa operacional, usada para modelar, analisar e otimizar o
          comportamento de sistemas complexos onde eventos ocorrem em pontos
          específicos no tempo. Na Teoria das Filas, que é fundamental para
          entender muitos sistemas de atendimento, como bancos, hospitais e,
          no contexto deste estudo, vias de trânsito de veículos, as filas
          são analisadas para prever tempos de espera, utilização de
          recursos e capacidade de atendimento.
        </p>
        <p className="text-[var(--text-primary)] leading-relaxed">
          &quot;A determinação dos parâmetros de operação do sistema seguiu
          a teoria registrada nas notas de aula da disciplina Probabilidade
          e Modelos Estocásticos, do segundo semestre letivo de 2025. Como
          ponto de partida, após a medição dos parâmetros λ (tempo de
          chegada) e μ (tempo de atendimento), foram definidos os estados da
          fila, de P0 a P10, que são indicadores da probabilidade de ter (ou
          não) clientes no sistema. Uma vez conhecido P0, as probabilidades
          Pn, de existirem &apos;N&apos; clientes simultâneos, são
          calculadas em sequência de maneira recursiva. Uma vez conhecidas
          as probabilidades de estado, os demais parâmetros de desempenho do
          sistema são calculados utilizando as equações teóricas
          pertinentes.&quot;
        </p>
      </div>
    </>
  );
}
