---
name: speckit-specify
description: Create the specification for a feature (specify.md) — the WHAT and WHY, before any tech choices.
whenToUse: Use when the user invokes /speckit-specify, or wants to define a feature's requirements, user stories, success criteria, and edge cases for a Spec-Kit project.
---

# /speckit-specify — Feature specification

Write `.speckit/features/<n>-<slug>/specify.md` describing **what** to build and **why**, with no
tech-stack or implementation detail. For a greenfield project this is the first feature; for a
brownfield repo, run the reverse-engineering steps first (see `references/brownfield.md`).

## Branch control first

Before writing the spec, honor the branch convention:

1. `git status --short --branch` — note the current branch and clean/dirty state.
2. Decide with the user (unless already stated): default `feat/<slug>`; `--no-branch` stays on the
   current branch; `--branch <name>` uses that branch.
3. Act on it (`git checkout -b feat/<slug>`, or proceed on the current branch).
4. Record the branch in your summary so later steps use it.

## Steps

1. Number the feature. Read existing `.speckit/features/` to find the next `NNN` (e.g. `001-`).
   Derive a short kebab-case `slug` from the feature intent.
2. Write `.speckit/features/NNN-slug/specify.md` with:
   - **User stories** (the actors, their goals, and acceptance language).
   - **Success criteria** — measurable, checkable outcomes (SC-001, SC-002, …).
   - **Edge cases** — failure and boundary cases.
   - **Out of scope** — explicitly defer what is not in this feature.
3. Keep it WHAT/WHY only. No frameworks, no libraries, no schema.
4. Summarize: top decisions, artifacts written, items to review, and next step.

## Feature tracking

Ask whether this is one feature or several. If several, list them and track each through
Specifying → Planning → Tasking → In Progress → Complete (see `references/feature_management.md`).

Next: `/speckit-clarify` (if ambiguous) or `/speckit-plan`.
