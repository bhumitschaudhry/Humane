---
name: simple-coder
description: >
  Generates ready-to-install agent configuration files (CLAUDE.md, AGENTS.md, GEMINI.md,
  .opencode/instructions.md) that make a coding agent think spec-first and write maximally
  readable, maintainable code. Use this skill whenever the user wants to configure Claude Code,
  Codex CLI, Gemini CLI, or opencode to produce simpler output, plan before coding, or write
  code that a non-expert can read and edit. Trigger on phrases like: "make my coding agent
  write cleaner code", "spec-driven development", "readable code", "maintainable output",
  "think before coding", "simple coder skill", or any request to configure a coding agent's
  behavior around code quality or planning.
---

# Simple Coder Skill

Produces a **drop-in agent config file** that installs a spec-first, human-readable coding
philosophy into any major coding agent.

Two core principles — baked into the config as hard rules, not suggestions:

1. **Spec-first** — the agent must articulate *what*, *why*, and *how* before writing a line.
2. **Human-first simplicity** — code must be readable and editable by the person who asked for it,
   not just by other engineers. Not vanilla/naïve — but never clever for cleverness's sake.

---

## Step 1 — Identify the target agent(s)

Infer from context or ask the user:

| Agent | Config file | Notes |
|---|---|---|
| **Claude Code** | `CLAUDE.md` (project root) or `~/.claude/CLAUDE.md` (global) | Also reads `AGENTS.md` |
| **OpenAI Codex CLI** | `AGENTS.md` (project root) | |
| **Gemini CLI** | `GEMINI.md` (project root) | |
| **opencode** | `.opencode/instructions.md` | |
| **All agents / universal** | `AGENTS.md` | Claude Code + Codex both read this |

If the user wants all agents covered, write a single `AGENTS.md` core and thin
wrapper files for each agent that reference it. Or just write `AGENTS.md` if they're
not sure — it covers the most ground.

---

## Step 2 — Gather project context (improves output; optional)

Ask or infer:
- Language / framework (Python, TypeScript, Go, etc.)
- Who will maintain the code? (solo dev, non-technical founder, team, etc.)
- Any pain points with current agent output? ("writes unreadable one-liners", "over-engineers", etc.)
- Existing conventions to preserve?

Write with sensible defaults if context is unavailable. Tailor aggressively when available.

---

## Step 3 — Write the config file

Read `references/config-template.md` for the full annotated template.
Read `references/simplicity-rules.md` for the per-language simplicity ruleset.

Every config file must contain these five sections:

### A. SPEC PHASE — mandatory before any code
The agent must produce a brief internal spec before touching files:
```
## Spec
- Goal: [one sentence — what does this code need to do?]
- Approach: [2–5 bullet points — how will it do that?]
- Simplicity check: [what's the simplest version that fully works?]
```
Frame this as a *required thinking step* — the agent should do it silently unless the user
asks to see it. If the agent skips this on a non-trivial task, that is a mistake.

### B. SIMPLICITY RULES — hard rules, not preferences
Pull from `references/simplicity-rules.md`. Key universal rules always included:
- No abstraction until it's needed twice in actual code (not hypothetically)
- Functions do one thing. Files do one thing.
- Variable/function names say what they do — no single letters, no `data`, no `handler`
- Prefer flat over nested
- Delete code that isn't used

### C. NAMING & STRUCTURE
- Names are self-documenting: `getUserById`, not `getUser` or `fetch`
- Files named after their purpose: `auth-middleware.ts`, not `middleware.ts`
- No `utils.js` dumping grounds — break into `format-date.js`, `validate-email.js`, etc.

### D. COMMENT POLICY
- Comments explain *why*, not *what* (code explains what)
- Every function/method gets a one-line summary comment
- No commented-out dead code — delete it

### E. CHANGE SAFETY
- Edit the minimum code needed to accomplish the task
- Before large refactors: state what will change and why, wait for confirmation
- Never silently rename or restructure things that work

---

## Step 4 — Self-check before delivering

- [ ] Every section has a concrete, actionable rule (not vague advice like "write clean code")
- [ ] Spec phase is described as **mandatory**, not suggested
- [ ] Simplicity rules are framed as rules ("do X", "never Y"), not preferences ("try to X")
- [ ] File is under 150 lines — readable in 2 minutes
- [ ] No jargon the project owner won't understand
- [ ] Tailored to the user's language/context if that info was available

---

## Step 5 — Deliver

Present the config file(s) with:
1. **Where to save it** — exact path
2. **How to verify** — most agents print the config filename at startup; tell the user what to look for
3. **One-line behavior summary** — "Your agent will now plan before coding and refuse to write
   unreadable nested logic."

If multiple agents were requested, generate each file.

---

## Reference files

- `references/config-template.md` — Full annotated config template with comments
- `references/simplicity-rules.md` — Complete simplicity ruleset organized by language
