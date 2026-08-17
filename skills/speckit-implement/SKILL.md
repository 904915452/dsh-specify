---
name: speckit-implement
description: Execute a feature's task list (tasks.md) and build the working implementation.
whenToUse: Use when the user invokes /speckit-implement, or wants to start building a feature whose tasks are already written.
---

# /speckit-implement — Build the feature

Execute `.speckit/features/<n>-<slug>/tasks.md` top to bottom, producing working, tested code.

## Branch check first

Confirm you are on the branch this feature belongs to (recorded at `/speckit-specify` time):

- `git status --short --branch`.
- If the branch is missing, recreate it from the trunk (`git checkout -b feat/<slug>`) or ask.
- If the user passes `--no-branch`, work on the current branch; `--branch <name>` switches to it.

## Steps

1. Read the feature's `specify.md`, `plan.md`, and `tasks.md` in full.
2. Work through tasks in order, checking each box as it completes. Keep each change small and
   runnable; prefer the repo's existing patterns and tests.
3. Follow TDD where the repo does: write/update tests with the implementation.
4. Keep the code consistent with `constitution.md` and `plan.md`; do not silently expand scope —
   if a task forces a spec/plan change, stop and surface it.
5. After the tasks are done, run the project's tests/lint/build and fix failures.
6. Summarize: what was built, which tasks are done, test results, and anything deferred.

Use `scripts/phase_summary.sh <path>/tasks.md` to report per-phase progress.
