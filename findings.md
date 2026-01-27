# Findings

## Research Log

### Kanban Permissions
- **Status:** Investigated
- **Source:** `convex/leads.ts`
- **Finding:** Currently, `updateStatus` and `getPipeline` do not strictly enforce "own leads only". They are accessible to authenticated users.
- **Spec Compliance:** Spec says Agents should only see "Egna leads" (own leads). Admin/Owners see all.
- **Action Required:** We need to implement Row Level Security (RLS) or filter logic in `leads.ts` to respect roles defined in `lib/permissions.ts`.

### Drag-and-Drop Issue
- **Status:** Solved
- **Cause:** Conflict between native HTML5 drag on `<a>` tags (Next.js Link) and `@dnd-kit`.
- **Fix:** Added `draggable={false}` to Links and `touch-action: none` to styles.
