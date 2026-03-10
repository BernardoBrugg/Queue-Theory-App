# src/config/

Centralized configuration constants. Prevents hardcoded strings in components.

## Files

| File | Contents |
|------|---------|
| `routes.ts` | All app route paths as typed constants (`ROUTES.home`, `ROUTES.services`, etc.) |
| `env.ts` | Typed accessors for all `NEXT_PUBLIC_*` environment variables |

## Usage

```ts
import { ROUTES } from "@/config/routes";
import { ENV } from "@/config/env";
```
