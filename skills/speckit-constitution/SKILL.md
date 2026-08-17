---
name: speckit-constitution
description: Establish the project's governing principles (constitution.md) for spec-driven development.
whenToUse: Use when the user invokes /speckit-constitution, or asks to set up project principles, coding standards, and quality gates for a Spec-Kit project.
---

# /speckit-constitution — Project principles

Create or update `.speckit/constitution.md`, the project's governing principles that every later
spec, plan, and task must respect.

## Steps

1. Confirm the project is initialized (`.speckit/` exists). If not, tell the user to run
   `specify init <project> --ai <agent>` (see `references/sdd_install.md`).
2. Determine the principles with the user. Cover at least: code quality / testing standards,
   technology constraints, UX/accessibility expectations, performance targets, and any
   organizational or compliance rules.
3. Write `.speckit/constitution.md` with concrete, checkable principles (not vague aspirations).
4. Summarize: the top principles, what was written, and what to review.

## Guidance

- Principles should be testable ("80%+ coverage", "TypeScript for all code", "<3s page load"),
  so `/speckit-analyze` can verify later artifacts against them.
- Keep it short enough to be usable as a constraint, long enough to be unambiguous.

After writing, offer `[A] proceed to /speckit-specify`, `[B] adjust a principle`,
`[C] explain a decision`, `[D] show status`.
