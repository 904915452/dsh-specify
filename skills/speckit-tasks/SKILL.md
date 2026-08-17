---
name: speckit-tasks
description: Break a feature plan into an actionable, ordered task list (tasks.md).
whenToUse: Use when the user invokes /speckit-tasks, or wants to turn a technical plan into concrete implementation tasks.
---

# /speckit-tasks — Task breakdown

Write `.speckit/features/<n>-<slug>/tasks.md`: an actionable, ordered task list derived from
`plan.md`.

## Steps

1. Read the feature's `plan.md` (and `specify.md` for coverage).
2. Break the plan into concrete tasks. Each task should be small, verifiable, and written as an
   imperative action ("Add the database migration", "Implement drag-and-drop state").
3. Group tasks into phases/categories, order them so dependencies come first, and mark the
   critical path and high-complexity items.
4. Write `tasks.md` with checkboxes (`- [ ]`) so progress is trackable.
5. Summarize: task count and categories, critical path, complexity items, next step.

## Coverage checks

Map tasks back to requirements: every user story and success criterion should have a task.
If unsure, run `/speckit-analyze` (which uses `scripts/analyze-requirements.py` etc.).

Next: `/speckit-analyze` (recommended) then `/speckit-implement`.
