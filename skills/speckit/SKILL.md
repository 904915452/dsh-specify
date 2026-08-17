---
name: speckit
description: Spec-driven development (GitHub Spec-Kit) hub — install, choose greenfield vs brownfield, and route to the granular /speckit-* commands.
whenToUse: Use for spec-driven development overview, when the user asks about Spec-Kit / specify / speckit, wants to install the specify CLI, needs the branch convention, or asks which step comes next.
---

# Spec-Kit (Spec-Driven Development)

Spec-driven development flips normal development: write an executable spec first, then drive a
plan, tasks, and implementation from it. The artifacts live under `.speckit/` and are what the
model reads and writes at each step.

This hub routes to granular commands. Invoke each step explicitly for control:

| Command | Artifact | When |
|---|---|---|
| `/speckit-constitution` | `.speckit/constitution.md` | once per project, before features |
| `/speckit-specify` | `.speckit/features/<n>-<slug>/specify.md` | start of each feature |
| `/speckit-clarify` | (refines `specify.md`) | after specify, if ambiguous |
| `/speckit-plan` | `plan.md` | after specify |
| `/speckit-tasks` | `tasks.md` | after plan |
| `/speckit-analyze` | (consistency report) | after tasks, before implement |
| `/speckit-implement` | working code | after tasks |
| `/speckit-checklist` | `checklist.md` | any time, quality gates |
| `/speckit-status` | (dashboard) | any time, progress |

All relative paths in these skills resolve against the shared base directory
(`references/` and `scripts/` sit there).

## Install the `specify` CLI

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify check
```

One-time, no install:

```bash
uvx --from git+https://github.com/github/spec-kit.git specify init <PROJECT_NAME>
```

New project: `specify init <project> --ai <agent>` · existing repo: `specify init --here --force`.
See `references/sdd_install.md` for troubleshooting and environment variables.

## Greenfield vs brownfield

- **Greenfield** (new project): `speckit-constitution → speckit-specify → speckit-clarify? → speckit-plan → speckit-tasks → speckit-analyze? → speckit-implement`. Details: `references/greenfield.md`.
- **Brownfield** (existing code): analyze the code first — see `references/brownfield.md` for
  `analyze-codebase → reverse-engineer → integration-plan` before `speckit-specify`.

## Branch convention (control whether to branch)

Spec-Kit does not force a branch. Before a feature starts, follow this convention:

1. Run `git status --short --branch` and read the current branch and clean/dirty state.
2. Decide the branch strategy **with the user** unless they already stated it:
   - Default: create a feature branch `feat/<feature-slug>` from a clean trunk (`main`/`master`).
   - If the user says "no branch" / "on current branch" / passes `--no-branch`, stay on the current branch.
   - If the user passes `--branch <name>` (or names a branch), create/checkout exactly that.
3. Act:
   - Branch: `git checkout -b feat/<slug>` (stash or commit dirty work first if needed).
   - No branch: proceed on the current branch and note it.
4. Record the decision in the summary so `/speckit-implement` and `/speckit-status` know which
   branch this feature belongs to.

The `--no-branch` / `--branch <name>` flags can be appended to any `/speckit-*` invocation; the
model sees them as part of the message and must honor them.

## After every step: summarize

After any `/speckit-*` command writes an artifact, read it and give a compact summary:
key decisions, what was generated, items to review, watch-outs, and what the next step is.
Keep it tight; offer `[A] proceed / [B] modify / [C] explain / [D] status`.

## Feature status

Every summary ends with a one-line status: `<feature> (<stage>) → Next: <next>`. Stages:
Specifying (20%) → Planning (40%) → Tasking (60%) → In Progress (80%) → Complete (100%).
Full dashboard and natural-language management (add/reorder/skip features) are in
`references/feature_management.md`; `/speckit-status` renders the dashboard.
