---
name: speckit-status
description: Show the spec-driven development progress dashboard across features.
whenToUse: Use when the user invokes /speckit-status, or asks for feature progress, current stage, dependencies, or what's next.
---

# /speckit-status — Progress dashboard

Render the current spec-driven development status by reading `.speckit/features/`.

## Steps

1. List `.speckit/features/` and, for each feature, detect its stage by which artifacts exist:
   - `specify.md` → Specifying (20%)
   - `plan.md` → Planning (40%)
   - `tasks.md` → Tasking (60%)
   - code changed / tasks checked → In Progress (80%)
   - implementation complete + tests pass → Complete (100%)
2. Read each feature's `tasks.md` to count checked vs total tasks for finer progress.
3. Show a dashboard:

```
📊 Feature Status
🎯 CURRENT: <feature> (<stage> — X%)
   ✅ specified · 🔄 planning · ⏸ tasks · ⏸ implement
   Dependencies: <dep> ✅/⏸
✅ COMPLETED: <n>
📋 UPCOMING: <list with dependencies>
⚠️ BLOCKED: <list with reasons>
```

4. End with the recommended next step.

Feature ordering, dependencies, and reordering are covered in `references/feature_management.md`.
