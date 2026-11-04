---
name: speckit-clarify
description: Clarify ambiguous or underspecified requirements in a feature spec before planning.
whenToUse: Use when the user invokes /speckit-clarify, or when a spec has unclear requirements, missing edge cases, or open product questions that block planning.
---

# /speckit-clarify — Resolve ambiguity

Refine the current feature's `specify.md` so it is unambiguous before `/speckit-plan`.

## Steps

1. Locate the current feature's `.speckit/features/<n>-<slug>/specify.md` (ask which feature if
   more than one is in flight).
2. Read the spec and identify underspecified areas: vague success criteria, missing actors,
   conflicting requirements, unstated scope, or edge cases without an expected outcome.
3. Ask the user **one focused batch** of clarifying questions. Prefer concrete either/or choices
   and defaults over open-ended prompts. Do not ask for things you can infer from the repo.
4. Record each accepted answer in `specify.md`:
   - ensure a `## Clarifications` section exists (create it after the highest-level
     overview section when missing);
   - under it create a `### Session YYYY-MM-DD` subheading for today;
   - add exactly one bullet per accepted answer in the form
     `- Q: <question> → A: <answer>`.
5. Fold the answers back into the rest of `specify.md` (update user stories, success criteria,
   edge cases, out-of-scope) and re-check consistency. Do not leave contradictory text.
6. Summarize what changed and why.

If nothing is ambiguous, say so and offer to proceed to `/speckit-plan`.
