# about

Página informativa sobre a Teoria das Filas e a Pesquisa Operacional. Estruturada como um artigo técnico de blog, com tipografia de leitura e seções encadeadas.

## Arquitetura

```
about/
├── page.tsx                    # Wrapper tipo artigo (max-width 760px)
└── components/
    ├── AboutHero.tsx           # Introdução: PO e Teoria das Filas
    ├── AboutFeatures.tsx       # Lista horizontal das 4 funcionalidades do app
    ├── AboutConcepts.tsx       # Glossário de termos + premissas do modelo M/M/c
    ├── AboutFormulas.tsx       # Tabelas de fórmulas (Birth-Death e Erlang-C)
    └── AboutApplications.tsx   # Guia de gráficos e áreas de aplicação prática
```

## Estilo

- Coluna de leitura centralizada (`max-width: 760px`)
- Tipografia: `font-size: 1.0625rem`, `line-height: 1.75` nos parágrafos
- Seções separadas por `border-top: 1px solid var(--border)` e `padding-top: 2rem`
- Sem emojis; sem grade de cards; sem Tailwind classes nos componentes
- Citações em `<blockquote>` com borda esquerda colorida
- Definições em `<dl>/<dt>/<dd>` com layout de duas colunas
