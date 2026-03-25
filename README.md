# Queueing Theory App

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.5-orange)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Uma aplicação web fullstack moderna para análise, simulação e visualização de sistemas de Teoria de Filas em tempo real. Permite aos usuários criar, gerenciar e analisar filas de chegada e atendimento com métricas precisas baseadas em modelos M/M/1 e M/M/c.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação-e-configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Teoria de Filas](#teoria-de-filas)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Autores e Contribuidores](#autores-e-contribuidores)

## Visão Geral

O **Queueing Theory App** é uma ferramenta educacional e profissional desenvolvida para:

- **Estudantes**: Aprender conceitos de Teoria de Filas de forma prática e interativa
- **Pesquisadores**: Realizar simulações e análises de sistemas de filas complexos
- **Profissionais**: Otimizar processos operacionais através da análise quantitativa
- **Educadores**: Demonstrar conceitos teóricos com exemplos em tempo real

### Principais Diferenciais

- **Tempo Real**: Sincronização automática entre múltiplos usuários via Firebase
- **Múltiplos Servidores**: Suporte para filas M/M/c com c atendentes
- **Visualizações Avançadas**: Gráficos interativos de probabilidades e métricas
- **Simulações**: Eventos discretos e análises personalizadas
- **Exportação**: Dados em CSV e dashboards em PDF
- **Interface Moderna**: Design responsivo com tema claro/escuro

## Funcionalidades

### 1. Cronômetros em Tempo Real

Registre eventos de chegada e atendimento com precisão de centésimos de segundo.

**Cronômetro de Chegadas:**
- Registra timestamps de cada chegada de cliente
- Contabiliza automaticamente elementos na fila
- Atualização em tempo real para todos os usuários conectados
- Interface visual com tempo de espera acumulado

**Cronômetro de Atendimentos:**
- Suporte para múltiplos atendentes simultâneos (M/M/c)
- Controle de ocupação dos servidores
- Botões contextuais que bloqueiam quando todos atendentes estão ocupados
- Registro automático de tempos de serviço
- Visualização de clientes em atendimento atual

**Configurações de Tempo:**
- Modo padrão: Usa horário real do sistema
- Modo personalizado: Ajuste velocidade de simulação
- Sincronização entre todos os cronômetros ativos

### 2. Dados e Gerenciamento

Importação, visualização e manipulação completa de dados de filas.

**Importação de Dados:**
- Suporte para arquivos CSV com formato personalizado
- Validação automática de dados importados
- Mapeamento de colunas flexível
- Preview antes de importar

**Visualização de Dados:**
- Tabela interativa com ordenação e filtros
- Filtro por fila específica
- Exibição de timestamps formatados
- Cálculo de tempos entre eventos

**Exportação de Dados:**
- Exportação para CSV com todos os registros
- Seleção de filas específicas para exportar
- Formato compatível com Excel e ferramentas de análise

**Gerenciamento:**
- Exclusão de registros individuais
- Limpeza em massa de dados
- Renomeação de filas
- Backup automático no Firebase

### 3. Dashboards e Análises

Cálculo de métricas analíticas baseadas em Teoria de Filas.

**Métricas Calculadas (M/M/1 e M/M/c):**

- **λ (Lambda)**: Taxa de chegada (chegadas/unidade de tempo)
- **μ (Mu)**: Taxa de atendimento (atendimentos/unidade de tempo)
- **ρ (Rho)**: Utilização do sistema (λ / cμ)
- **L**: Número médio de clientes no sistema
- **Lq**: Número médio de clientes na fila
- **W**: Tempo médio no sistema
- **Wq**: Tempo médio na fila
- **P(n)**: Probabilidade de n clientes no sistema
- **P0**: Probabilidade do sistema vazio

**Gráficos Disponíveis:**
- Gráfico de barras de probabilidades P(n)
- Gráfico cumulativo de chegadas vs saídas
- Gráfico de linha temporal do sistema
- Distribuição de tempos de serviço
- Análise de utilização dos servidores

**Serviços Salvos:**
- Salve análises completas com nome personalizado
- Armazene configurações de filas
- Compare diferentes cenários
- Exportação de relatórios em PDF
- Limite de 1 serviço ativo (pode ser expandido)

### 4. Simulações

Ferramentas avançadas de simulação para análise preditiva.

**Simulação por Eventos Discretos:**
- Implementação de simulador M/M/c completo
- Geração de chegadas via processo de Poisson
- Tempos de serviço exponenciais
- Visualização em tempo real da evolução do sistema
- Métricas calculadas empiricamente
- Configurações:
  - Taxa de chegada (λ)
  - Taxa de serviço (μ)
  - Número de servidores (c)
  - Tempo total de simulação

**Simulação Personalizada:**
- Entrada manual de parâmetros λ, μ e c
- Cálculo analítico de métricas do sistema
- Gráfico de distribuição de probabilidades
- Análise de estabilidade (ρ < 1)
- Truncamento configurável para P(n)
- Possibilidade de salvar como serviço

**Cadeias de Markov:**
- Visualização de estados do sistema
- Matriz de transição
- Análise de estado estacionário
- Diagrama de transições (futuro)

### 5. Autenticação e Multi-usuário

Sistema de autenticação integrado ao Firebase.

**Funcionalidades:**
- Login/Cadastro via email e senha
- Autenticação via Google (opcional)
- Dados segregados por usuário
- Compartilhamento em tempo real entre sessões
- Persistência de dados entre logins

### 6. Interface e UX

Design moderno e responsivo com atenção aos detalhes.

**Características:**
- Tema claro/escuro com alternância suave
- Design responsivo (mobile, tablet, desktop)
- Animações fluidas com Framer Motion
- Feedback visual com toasts informativos
- Gradientes e sombras modernas
- Ícones intuitivos (Lucide React)
- Cores semânticas (sucesso, erro, aviso)

## Tecnologias

### Frontend
- **[Next.js 16.0](https://nextjs.org/)**: Framework React com SSR e App Router
- **[React 19.2](https://reactjs.org/)**: Biblioteca para interfaces de usuário
- **[TypeScript 5.0](https://www.typescriptlang.org/)**: Superset JavaScript com tipagem estática
- **[Tailwind CSS 4.0](https://tailwindcss.com/)**: Framework CSS utility-first
- **[Framer Motion 12](https://www.framer.com/motion/)**: Animações e transições

### Visualização de Dados
- **[Recharts 3.3](https://recharts.org/)**: Gráficos React baseados em D3
- **[KaTeX 0.16](https://katex.org/)**: Renderização de fórmulas matemáticas
- **[React KaTeX](https://www.npmjs.com/package/react-katex)**: Integração KaTeX com React

### Backend e Banco de Dados
- **[Firebase 12.5](https://firebase.google.com/)**: Backend as a Service
  - Firestore: Banco de dados NoSQL em tempo real
  - Authentication: Sistema de autenticação
  - Hosting: Deploy e CDN

### Utilidades
- **[PapaParse 5.5](https://www.papaparse.com/)**: Parser de CSV
- **[jsPDF 3.0](https://github.com/parallax/jsPDF)**: Geração de PDF no cliente
- **[html2canvas 1.4](https://html2canvas.hertzen.com/)**: Captura de screenshots
- **[React Toastify 11.0](https://fkhadra.github.io/react-toastify/)**: Notificações toast
- **[Lucide React](https://lucide.dev/)**: Ícones SVG modernos
- **[Radix UI](https://www.radix-ui.com/)**: Componentes acessíveis

### Ferramentas de Desenvolvimento
- **[ESLint 9](https://eslint.org/)**: Linter JavaScript/TypeScript
- **[PostCSS](https://postcss.org/)**: Processador de CSS
- **[next-themes](https://github.com/pacocoursey/next-themes)**: Gerenciamento de temas

## Instalação e Configuração

### Pré-requisitos

- Node.js 18.0 ou superior
- npm ou yarn
- Conta no Firebase (gratuita)

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/seu-usuario/queueing-theory-app.git
cd queueing-theory-app
```

### Passo 2: Instale as Dependências

```bash
npm install
# ou
yarn install
```

### Passo 3: Configure o Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Ative os seguintes serviços:
   - **Authentication**: Email/Password e Google (opcional)
   - **Firestore Database**: Modo de teste ou produção
4. Obtenha as credenciais do projeto em **Configurações do Projeto** > **Geral**

### Passo 4: Configure Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=seu_measurement_id
```

### Passo 5: Configure Regras do Firestore

No Firebase Console, vá em **Firestore Database** > **Regras** e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir acesso apenas a dados do próprio usuário
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Passo 6: Execute o Projeto

**Modo Desenvolvimento:**
```bash
npm run dev
# ou
yarn dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

**Build de Produção:**
```bash
npm run build
npm start
# ou
yarn build
yarn start
```

## Uso

### 1. Criando sua Primeira Fila

1. Acesse a página **Cronômetros**
2. Clique em **"+ Adicionar Fila"**
3. Configure:
   - **Nome**: Nome identificador da fila
   - **Tipo**: Chegada ou Serviço
   - **Atendentes**: Se Serviço, defina quantos (M/M/c)
4. Clique em **Adicionar**

### 2. Registrando Eventos

**Para Filas de Chegada:**
- Clique em **"Registrar Chegada"** cada vez que um cliente chega
- O cronômetro conta o tempo desde a última chegada
- Os timestamps são salvos automaticamente

**Para Filas de Serviço:**
1. Clique em **"Chegou no Atendimento"** quando cliente entra em atendimento
2. Clique em **"Completou Atendimento"** quando o serviço termina
3. O sistema calcula automaticamente o tempo de serviço
4. Se todos atendentes estiverem ocupados, o botão fica desabilitado

### 3. Analisando Dados

1. Vá para **Dashboards**
2. Selecione:
   - **Fila de Chegada**: Fila com timestamps de chegadas
   - **Fila de Serviço**: Fila com tempos de atendimento
   - **Número de Servidores**: Quantidade de atendentes (c)
   - **Máximo n**: Quantidade de estados para calcular P(n)
3. Clique em **"Calcular Métricas"**
4. Visualize os resultados e gráficos
5. (Opcional) Salve como serviço para referência futura

### 4. Importando Dados Externos

1. Acesse **Dados**
2. Clique em **"Importar CSV"**
3. Selecione um arquivo CSV com formato:
   ```csv
   queue,type,timestamp,totalTime,element,arriving,exiting
   Fila1,arrival,2024-01-01T10:00:00.000Z,0,1,2024-01-01T10:00:00.000Z,
   Fila2,service,2024-01-01T10:00:00.000Z,5000,1,2024-01-01T10:00:00.000Z,2024-01-01T10:00:05.000Z
   ```
4. Confirme a importação

### 5. Executando Simulações

**Simulação Discreta:**
1. Vá para **Simulações**
2. Configure λ, μ, c e tempo de simulação
3. Clique em **"Executar Simulação"**
4. Observe os gráficos em tempo real
5. (Opcional) Adicione aos serviços salvos

**Simulação Personalizada:**
1. Insira parâmetros manualmente
2. Defina máximo n para truncamento
3. Calcule métricas analíticas
4. Compare com dados empíricos

## Estrutura do Projeto

```
queueing-theory-app/
├── public/                      # Arquivos estáticos
│   ├── cronAppLogo.png         # Logo da aplicação
│   └── *.svg                   # Ícones diversos
├── src/
│   ├── app/                    # Páginas Next.js (App Router)
│   │   ├── layout.tsx          # Layout raiz
│   │   ├── page.tsx            # Página inicial
│   │   ├── globals.css         # Estilos globais
│   │   ├── about/              # Sobre o projeto e teoria de filas
│   │   ├── chronometers/       # Cronômetros de chegada e serviço
│   │   ├── dashboards/         # Análise de métricas
│   │   ├── data/               # Visualização de dados
│   │   ├── login/              # Autenticação
│   │   ├── services/           # Serviços salvos
│   │   ├── simulations/        # Simulações
│   │   └── tutorial/           # Tutorial de uso
│   ├── components/             # Componentes React
│   │   ├── AuthContext.tsx     # Contexto de autenticação
│   │   ├── Chronometer.tsx     # Cronômetro individual
│   │   ├── QueueManager.tsx    # Gerenciador de filas
│   │   ├── MetricsResults.tsx  # Exibição de métricas
│   │   ├── DiscreteEventSimulation.tsx  # Simulação discreta
│   │   ├── CustomSimulation.tsx         # Simulação personalizada
│   │   ├── MarkovChainSimulation.tsx    # Cadeias de Markov
│   │   ├── DataTable.tsx       # Tabela de dados
│   │   ├── ImportData.tsx      # Importador CSV
│   │   ├── ExportButton.tsx    # Exportador CSV/PDF
│   │   ├── ServiceCard.tsx     # Card de serviço salvo
│   │   ├── MathRenderer.tsx    # Renderizador LaTeX
│   │   ├── ThemeProvider.tsx   # Provider de tema
│   │   ├── Nav.tsx             # Navegação
│   │   ├── Footer.tsx          # Rodapé
│   │   └── ui/                 # Componentes base (Radix UI)
│   ├── hooks/                  # Custom Hooks
│   │   └── useData.ts          # Hook para dados do Firestore
│   ├── lib/                    # Utilitários
│   │   ├── firebase.ts         # Configuração Firebase
│   │   └── utils.ts            # Funções auxiliares
│   ├── types/                  # Definições TypeScript
│   │   └── index.ts            # Tipos da aplicação
│   └── global.d.ts             # Declarações globais
├── components.json             # Configuração Radix UI
├── DATABASE.md                 # Documentação do banco
├── README.md                   # Este arquivo
├── tsconfig.json               # Configuração TypeScript
├── next.config.ts              # Configuração Next.js
├── postcss.config.mjs          # Configuração PostCSS
├── eslint.config.mjs           # Configuração ESLint
└── package.json                # Dependências
```

## Teoria de Filas

### Notação de Kendall (A/S/c/K/N/D)

Este projeto foca em sistemas **M/M/c**:
- **M**: Chegadas seguem processo de Poisson (Markoviano)
- **M**: Tempos de serviço seguem distribuição exponencial
- **c**: Número de servidores paralelos

### Fórmulas Implementadas

**Sistema M/M/1:**
```
ρ = λ/μ
L = ρ/(1-ρ)
Lq = ρ²/(1-ρ)
W = L/λ
Wq = Lq/λ
P(n) = (1-ρ)ρⁿ
```

**Sistema M/M/c:**
```
ρ = λ/(cμ)
P(0) = 1 / [Σ(λ/μ)ⁿ/n! + (λ/μ)ᶜ/(c!(1-ρ))]
P(n) = P(0) × (λ/μ)ⁿ/n!  para n < c
P(n) = P(0) × (λ/μ)ⁿ/(c!cⁿ⁻ᶜ)  para n ≥ c
Lq = [P(0) × (λ/μ)ᶜ × ρ] / [c! × (1-ρ)²]
L = Lq + λ/μ
Wq = Lq/λ
W = Wq + 1/μ
```

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Diretrizes

- Siga o estilo de código existente
- Adicione testes para novas funcionalidades
- Atualize a documentação conforme necessário
- Use commits semânticos (feat, fix, docs, etc.)

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autores e Contribuidores

Este é um **Projeto de Graduação** concebido na disciplina de **Probabilidade** da **Universidade Federal de Santa Catarina (UFSC)**, pelo estudante de **Engenharia de Produção** **Bernardo Brüggemann**, com o objetivo de ajudar outros estudantes a compreender e aplicar os conceitos de Teoria de Filas de forma prática e interativa.

**Autor principal:**

- **Bernardo Brüggemann** — Estudante de Engenharia de Produção, UFSC

Contribuições são bem-vindas! Se você também é estudante ou pesquisador e deseja colaborar, siga as instruções da seção [Contribuição](#contribuição).

---

Desenvolvido para educação e análise de sistemas de filas.

