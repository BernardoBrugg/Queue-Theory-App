# src/app/chronometers/

**Workflow step 2** — Chronometers are auto-generated from a service definition. The user cannot create queues manually; they are derived from the service config to avoid data errors.

## Files

```
chronometers/
├── page.tsx                        # Reads ?service= URL param, renders ChronometerCards
├── components/
│   └── ChronometerCard.tsx         # Single queue chronometer UI
├── hooks/
│   ├── useChronometer.ts           # Timer state + Firestore sync for one queue
│   └── useChronometerPage.ts       # Loads service def, derives queue structure
└── utils/
    └── formatMs.ts                 # Milliseconds → MM:SS.cc display string
```

## Data Flow

1. Page reads `?service=<id>` → `useChronometerPage` fetches the service definition
2. Queues are derived: for each arrival queue, one "Chegada N" + one "Atendimento N" is generated
3. Each `ChronometerCard` manages its own timer via `useChronometer`
4. On event, `addQueueRecord()` writes to `users/{uid}/records`
