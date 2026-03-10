# src/app/services/

**Workflow step 1** — The user creates a *service definition* before using chronometers. This prevents data mismatches.

## Purpose

A service definition specifies:
- **Name** of the service being measured
- **Number of arrival queues** (how many client arrival lines exist)
- **Number of servers** (how many people are attending clients simultaneously)

Once created, the service generates the correct chronometer structure automatically.

## Files

```
services/
├── page.tsx                     # Page shell: two-column layout
├── components/
│   ├── ServiceSetupWizard.tsx   # Form to create a new service definition
│   └── ServiceListCard.tsx      # Card displaying a created service with CTA buttons
└── hooks/
    └── useServiceDefinitions.ts # Firestore load/create/delete for service defs
```

## Data Flow

1. User fills form → `useServiceDefinitions.create()` calls `serviceDefinitionService.createServiceDefinition()`
2. Firestore persists to `users/{uid}/serviceDefinitions/{id}`
3. List auto-refreshes
4. User clicks "Cronometrar →" → navigates to `/chronometers?service={id}`
