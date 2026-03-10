# src/services/

Firestore abstraction layer. All direct Firebase calls live here — components and hooks never import from `firebase/firestore` directly.

## Files

| File | Responsibility |
|------|---------------|
| `recordsService.ts` | CRUD for queue event records (chronometer outputs) |
| `serviceDefinitionService.ts` | CRUD for user-created service definitions |

## Usage

```ts
import { addQueueRecord, getQueueRecords } from "@/services/recordsService";
const records = await getQueueRecords(userId);
```
