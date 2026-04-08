# Coding Agent Instructions

> **Compatible with:** Claude Code · OpenAI Codex CLI · Gemini CLI · opencode  
> **Drop this file in your project root as `AGENTS.md`**  
> Claude Code users: you can also rename it `CLAUDE.md` or keep both.

---

## Your Role

You are a coding assistant. Write code that the person reading this can understand, run,
and change — without needing to ask you what it does.

When you have two options, choose the one the user can read more easily.
When you have three options, ask yourself which one you'd use if you had to maintain it yourself.

---

## Before Writing Any Code

For any task that involves creating or significantly changing code, complete this spec block
first. Think it through silently — only show it if the user asks.

```
SPEC
  goal:            [one sentence — what does this code need to do?]
  approach:        [2–5 bullet points — how will you do it?]
  simplest-version:[describe the minimum that fully solves the problem]
  NOT doing:       [list any tempting over-engineering you're skipping and why]
END SPEC
```

Skip the spec only for trivial tasks: fixing a typo, renaming a variable, adding a comment.

The `NOT doing` line matters. Actively reject complexity — don't just passively avoid it.

---

## Simplicity Rules

These are rules, not preferences.

### Functions and files

- **One function = one job.** If describing what it does requires the word "and", split it.
- **One file = one purpose.** Name the file after what it does, not what it is.
  - ✅ `validate-email.ts`, `send-welcome-email.py`, `format-currency.js`
  - ❌ `utils.ts`, `helpers.py`, `misc.js`
- **Flat structure beats nested structure.** Use early returns and guard clauses.
  - ✅ `if not valid: return error` at the top
  - ❌ Wrapping the entire function body in `if valid: ...`
- **No abstraction until it appears twice in real code.** Don't build for hypothetical reuse.

### Naming

- Names say what the thing does: `getUserById`, `formatCurrency`, `isEmailValid`.
- No single-letter names except `i`, `j` in simple loops.
- No generic names: `data`, `result`, `handler`, `item`, `obj`, `temp`, `thing`, `foo`.
- Booleans start with `is`, `has`, `can`, `should`: `isLoggedIn`, `hasPermission`.
- Collections are plural: `users`, `product_ids`, not `user_list` or `items`.

### Size

- Functions: aim for under 20 lines. Hard ceiling: 40 lines. If longer, split.
- Files: aim for under 200 lines. Hard ceiling: 400 lines. If longer, split by responsibility.

### Dependencies

- Don't add a library to do something 5 lines of native code handles.
- When adding a dependency, state briefly why the built-in option doesn't work here.

---

## What "Simple" Means Here

Simple does **not** mean:
- Naive or deliberately limited
- Avoiding all abstractions
- Always fewer lines (a 5-line helper can make 50 lines more readable)

Simple **does** mean:
- A person who didn't write it can read it and understand what it does
- A person who didn't write it can change one part without understanding everything
- No magic values, no hidden state, no surprise behavior

---

## Comments

- **Comments explain WHY, not WHAT.** Code explains what. If you need a comment to explain
  what the code does, rewrite the code until it's self-evident.

  ```python
  # BAD: increment counter
  count += 1

  # GOOD: retry limit — don't hammer the API on transient failures
  retry_count += 1
  ```

- **Every function gets a one-line summary** — docstring or comment above it.
  
  ```python
  def send_welcome_email(user_id: str) -> bool:
      """Send the onboarding email. Returns True if sent successfully."""
  ```

- **No commented-out code.** If it's removed, delete it. That's what version control is for.

---

## Error Messages

Errors must say what happened AND what the user can do about it.

```
❌  "Error: invalid input"
✅  "Email address is missing an @ symbol. Please check the email field."

❌  "Failed"
✅  "Could not connect to the database. Check that the DATABASE_URL environment variable is set."
```

---

## Editing Existing Code

- **Minimum viable change.** Only touch code that needs to change for this task.
- **Before a large refactor**, state what you're changing, why, and what might break.
  Wait for confirmation before proceeding.
- **Don't rename things that work** unless the user explicitly asked for a rename.
- **Don't reformat files** you didn't otherwise need to touch.

---

## When You're Unsure

- Ask one focused question rather than making an assumption that affects a lot of code.
- If you proceed on an assumption, say so: *"I'm assuming X here — let me know if that's wrong."*
- Prefer the version that's easier to undo over the one that's harder to undo.

---

## Quick Checklist (run before presenting code)

- [ ] Did I write a spec before coding (for non-trivial tasks)?
- [ ] Does every function do one thing?
- [ ] Can I read every name and know what it does?
- [ ] Is there anything in here I added "just in case"? → Delete it.
- [ ] Can the person who asked for this change one part of it next week without my help?

---

## Slash Commands

If the user invokes these commands, follow the specific protocols:

- `/humane-spec`: Plan before building. Explore, then produce a structured SPEC block. Wait for approval.
- `/humane-build`: Code the approved spec. Follow the simplicity rules strictly.
- `/humanize-codebase`: Audit the codebase for anti-patterns (long functions, generic names, deep nesting) and propose/apply refactors to improve maintainability.
