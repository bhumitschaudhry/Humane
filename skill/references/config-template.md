# Config Template Reference

This is the annotated master template. When writing a config file, use this as your source.
Strip the `[ANNOTATION: ...]` comments from the final output. Adapt language-specific sections
to the user's stack.

---

```markdown
# Coding Agent Instructions
<!-- Save as CLAUDE.md / AGENTS.md / GEMINI.md / .opencode/instructions.md -->
<!-- Last updated: [DATE] -->

## Role

You are a coding assistant. Your job is to write code that the person reading it can
understand and change — not to demonstrate cleverness or engineering depth.

When in doubt, choose the simpler option.

---

## Before Writing Any Code — Spec Phase

For any task that involves creating or significantly changing code, you MUST do this first:

**Write (silently, unless asked to show it):**
```
## Spec
- Goal: [one sentence — what does this code need to do?]
- Approach: [2–5 steps — how will you do it?]
- Simplest version: [describe the minimum that fully solves the problem]
- What I'm NOT doing: [list any tempting over-engineering you're skipping]
```

Only proceed to writing code after completing the spec. If the task is trivial (fixing a typo,
renaming a variable), skip the spec.

[ANNOTATION: The "What I'm NOT doing" bullet is key — it forces the agent to actively
reject complexity rather than passively avoid it.]

---

## Simplicity Rules

These are rules, not suggestions.

### Structure
- **One function = one job.** If you can describe what a function does and need the word "and",
  split it.
- **One file = one purpose.** Name the file after its purpose, not its type.
  `validate-email.ts` not `utils.ts` or `helpers.ts`.
- **Flat beats nested.** Prefer early returns and guard clauses over nested if/else trees.
- **No abstraction until it appears twice in real code.** Don't build for hypothetical reuse.

### Naming
- Names must say what the thing does: `getUserById`, `formatCurrency`, `isEmailValid`.
- No single-letter variables except loop indices (`i`, `j`) in simple loops.
- No generic names: `data`, `result`, `handler`, `item`, `obj`, `temp`, `foo`.
- Boolean names start with `is`, `has`, `can`, `should`: `isLoggedIn`, `hasPermission`.

### Size
- Functions: aim for under 20 lines. Hard limit: 40 lines. If longer, split.
- Files: aim for under 200 lines. Hard limit: 400 lines. If longer, split by responsibility.

[ANNOTATION: These are aggressive limits. They can be softened for the user's context —
e.g., data-heavy scripts or generated files may legitimately be longer.]

### Dependencies
- Don't add a library to do something that takes 5 lines of native code.
- When adding a dependency, state why the built-in alternative isn't sufficient.

---

## Comment Policy

- **Comments explain WHY, not WHAT.** The code explains what. If you feel the need to explain
  what the code does in a comment, the code should be rewritten to be self-evident instead.
  
  ```python
  # BAD: increment counter
  count += 1
  
  # GOOD: retry limit — don't hammer the API on transient failures
  retry_count += 1
  ```

- **Every function gets a one-line summary** as a docstring or comment above it.
  
  ```python
  def send_welcome_email(user_id: str) -> bool:
      """Send the onboarding email. Returns True if sent successfully."""
  ```

- **No commented-out code.** If code is removed, delete it. Version control exists.

---

## Editing Existing Code

- **Minimum viable change.** Only touch what needs to change to accomplish the task.
- **Before any large refactor**, state: what you're changing, why, and what it might break.
  Wait for confirmation before proceeding.
- **Don't rename things that work** unless the user explicitly asks for a rename.
- **Don't reformat files** you didn't need to touch.

---

## Error Handling

- Handle errors where they can actually be handled, not just where they occur.
- Error messages must say what happened AND what the user can do about it.
  
  ```
  BAD:  "Error: invalid input"
  GOOD: "Email address is missing an @ symbol. Please check the email field."
  ```

- Don't swallow errors silently (empty catch blocks, bare `except: pass`).

---

## When You're Unsure

- Ask one clarifying question rather than making an assumption that touches a lot of code.
- State your assumption explicitly if you proceed without asking: "I'm assuming X — let me
  know if that's wrong."
- Prefer the version that's easier to undo over the version that's harder to undo.

---

## What "Simple" Means Here

Simple does NOT mean:
- Naive or deliberately limited
- Avoiding all abstractions
- Always fewer lines (sometimes a 5-line helper makes 50 lines more readable)

Simple DOES mean:
- A person who didn't write it can read it and understand it
- A person who didn't write it can change one part without understanding everything
- There are no "magic" values, no hidden state, no surprise behavior

[ANNOTATION: This section is important to include — it prevents the agent from
interpreting "simple" as "bad code". It reframes simplicity as a property of
readability, not capability.]
```

---

## Language-specific additions

After the universal template above, append the relevant language section from
`simplicity-rules.md`. For example, if the project is Python, append the Python section.

If the project is multi-language (e.g., TypeScript frontend + Python backend), include both.
