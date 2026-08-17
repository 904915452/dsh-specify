---
name: speckit-checklist
description: Generate a quality checklist (checklist.md) that validates requirement completeness, clarity, and consistency.
whenToUse: Use when the user invokes /speckit-checklist, or wants quality gates / a definition-of-done checklist for a feature.
---

# /speckit-checklist — Quality checklist

Write `.speckit/features/<n>-<slug>/checklist.md`: a concrete, checkable quality gate for the
feature, like "unit tests for English" — small, mechanical items that catch gaps.

## Steps

1. Read the feature's `specify.md`, `plan.md`, and `tasks.md`.
2. Generate checklist items grouped by concern, e.g.:
   - **Requirements**: every user story has a success criterion; no vague "should be fast".
   - **Coverage**: every FR/SC has a task and a test.
   - **Consistency**: plan matches spec; no out-of-scope work crept in.
   - **Quality**: tests, lint, accessibility, performance, error handling, docs.
3. Write them as checkboxes (`- [ ]`) with clear pass/fail phrasing.
4. Summarize the checklist and how to run it (before/after implementation).

Reuse and refine the checklist across features; keep it project-specific.
