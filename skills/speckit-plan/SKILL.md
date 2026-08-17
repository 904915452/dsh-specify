---
name: speckit-plan
description: Create the technical implementation plan (plan.md) for a feature — stack, architecture, and milestones.
whenToUse: Use when the user invokes /speckit-plan, or wants to choose the tech stack and architecture for a feature that already has a spec.
---

# /speckit-plan — Technical plan

Write `.speckit/features/<n>-<slug>/plan.md` turning the spec's WHAT into the HOW: stack,
architecture, and implementation phases.

## Steps

1. Locate the current feature's `specify.md` (and `constitution.md` for constraints).
2. Read them; do not contradict the constitution or the spec's out-of-scope.
3. Decide the stack and architecture **with the user** where it is a real product choice; infer
   the rest from the repo's existing conventions (especially brownfield — see
   `references/brownfield.md`).
4. Write `plan.md` with:
   - Chosen stack and the rationale for each key dependency.
   - Architecture: modules/components, data flow, data model, and integration points.
   - Implementation phases with milestones.
   - Risks and fallbacks (e.g. a dependency that is Node-only vs browser).
5. Summarize: top decisions + rationale, artifacts, review items, next step.

Next: `/speckit-tasks`, or `/speckit-analyze` to check consistency first.
