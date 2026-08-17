---
name: speckit-analyze
description: Cross-check a feature's spec, plan, and tasks for consistency and coverage.
whenToUse: Use when the user invokes /speckit-analyze, or wants to validate that tasks cover requirements, success criteria, and edge cases before implementing.
---

# /speckit-analyze — Consistency & coverage

Check that `specify.md`, `plan.md`, and `tasks.md` agree, and that nothing in the spec is left
without an implementation task.

## Steps

1. Locate the feature directory `.speckit/features/<n>-<slug>/`.
2. Run the bundled analysis scripts (paths resolve from the shared base directory):

   ```bash
   python3 scripts/analyze-requirements.py      # FR-* → tasks coverage
   python3 scripts/analyze-success-criteria.py  # SC-* → verification tasks
   python3 scripts/analyze-edge-cases.py        # edge-case coverage
   bash scripts/phase_summary.sh <path>/tasks.md
   ```

   (They scan the current directory's `.speckit/features/**`; run them from the project root.)
3. Also verify the plan does not contradict `constitution.md`, and that the spec's out-of-scope
   items were not accidentally planned.
4. Report gaps: requirements with no task, success criteria with no verification, edge cases
   without coverage, and vague requirements.
5. Summarize the coverage numbers and the top items to fix before implementing.

Do not edit files unless the user asks; report first, then offer to fix the gaps.
