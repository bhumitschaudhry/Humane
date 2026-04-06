---
name: humane
description: >
  Provides two commands for building software in a human/maintainable way.
  /humane-spec: Plans what needs to be built using a spec-first approach — explores the
  codebase, produces a structured spec, and waits for approval before any code is written.
  /humane-build: Codes an approved spec following strict human-readable coding principles.
  Use when the user invokes /humane-spec or /humane-build, or asks to plan/build something
  in a maintainable, spec-first way.
---

# Humane Coder Skill

Two commands. One principle: no code without a plan, and no plan without a human who can read it.

---

## `/humane-spec` — Plan before building

**Trigger:** user runs `/humane-spec [description of what to build]`

### Step 1 — Understand the task

If the task is ambiguous, ask **one focused question** to clarify. Do not ask multiple questions.
If the task is clear enough, proceed without asking.

### Step 2 — Explore the codebase

Before writing the spec, read relevant existing files:
- What language, framework, and patterns are already in use?
- What files are likely to be affected?
- What conventions (naming, structure, error handling) does the existing code follow?

Match those conventions in the spec. Do not introduce new patterns without a reason.

### Step 3 — Write and present the spec

If **GSD tools** are available (e.g., `gsd_plan_milestone`, `gsd_plan_slice`), use them to structure the project. The spec above then becomes the **vision** and **goal** for a GSD milestone or slice.

Produce this block and show it to the user:

```
SPEC
  goal:            [one sentence — what does this code need to do?]
  approach:        [2–5 bullets — how will it do that?]
  simplest-version:[minimum implementation that fully solves the problem]
  NOT doing:       [tempting complexity you are explicitly skipping, and why]
  files:           [list of files to create or modify]
  key-interfaces:  [function signatures or data shapes that matter]
END SPEC
```

The `NOT doing` line is not optional. Actively name the over-engineering you are rejecting.

### Step 4 — Wait for approval

Do **not** write any code. Present the spec and stop.
The user must confirm or revise before `/humane-build` proceeds.

---

## `/humane-build` — Code the approved spec

**Trigger:** user runs `/humane-build` after an approved spec, or `/humane-build [spec]`

### Step 1 — Reference the spec

Restate the goal in one sentence. If no spec exists, run `/humane-spec` first.

### Step 2 — Write the code

Follow these rules. They are rules, not preferences.

**Structure**
- One function = one job. If describing it requires "and", split it.
- One file = one purpose. Name files after what they do: `validate-email.ts`, not `utils.ts`.
- Flat over nested. Use early returns and guard clauses at the top.
- No abstraction until the same logic appears twice in real code.

**Naming**
- Names say what the thing does: `getUserById`, `formatCurrency`, `isEmailValid`.
- No single-letter names except `i`, `j` in simple loops.
- No generic names: `data`, `result`, `handler`, `item`, `obj`, `temp`.
- Booleans start with `is`, `has`, `can`, `should`.
- Collections are plural: `users`, `productIds`.

**Size**
- Functions: under 20 lines. Hard ceiling: 40. If longer, split by responsibility.
- Files: under 200 lines. Hard ceiling: 400.

**Comments**
- Comments explain WHY, not WHAT. Code explains what.
- Every function gets a one-line summary (docstring or comment above).
- No commented-out code. Delete it.

**Dependencies**
- Do not add a library to do something 5 lines of native code handles.
- If adding a dependency, state why the built-in option does not work here.

**Change safety**
- Edit the minimum code needed for this task.
- Before a large refactor, state what changes and why, then wait for confirmation.
- Never silently rename or restructure things that already work.

For language-specific rules, read `references/simplicity-rules.md`.

### Step 3 — Verify

Run lint and tests if the project has them. Fix all failures before reporting done.

### Step 4 — Report

State what was built, mapped to each spec point:
- goal: [what was implemented]
- files created/modified: [list]
- anything that deviated from the spec and why (should be rare)
