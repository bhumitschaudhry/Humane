# Humane

A coding skill for AI agents that enforces spec-first, human-readable code. Install it once and your agent gains two commands — `/humane-spec` to plan before touching any file, and `/humane-build` to code the approved plan following strict human-readable rules.

## Install

```bash
npx get-humane@latest
```

You will be prompted to pick your CLI:

```
Humane Skill Installer

Select your CLI:

  1. Factory Droid   →  ~/.factory/skills/humane/
  2. Claude Code     →  ~/.claude/skills/humane/
  3. OpenAI Codex    →  ~/.codex/AGENTS.md
  4. Gemini CLI      →  ~/.gemini/GEMINI.md
  5. Antigravity     →  ~/.gemini/AGENTS.md
  6. Cursor          →  ~/.cursor/rules/humane.mdc
  7. Windsurf        →  ~/.windsurf/rules/humane.mdc
  8. Cline           →  ~/.cline/rules/humane.mdc
  9. All               →  Install for all tools above

Enter number [1-9]:
```

The installer creates the destination directory if it does not exist, then copies the skill files. No other changes are made to your system.

## What it does

Two commands. One principle: no code without a plan, and no plan without a human who can read it.

**`/humane-spec`** — Plan before building.
The agent explores your codebase, then produces a structured spec:
- Goal (one sentence)
- Approach (2–5 bullets)
- Simplest version that fully solves the problem
- NOT doing (complexity explicitly rejected, with reasons)
- Files to create or modify
- Key function signatures or data shapes

No code is written until you approve the spec.

**`/humane-build`** — Code the approved spec.
The agent implements exactly what was specced, following hard rules:
- One function = one job. One file = one purpose.
- Names say what they do: `getUserById`, `formatCurrency`, `isEmailValid`.
- No abstraction until it appears twice in real code.
- Comments explain *why*, not *what*.
- Edit the minimum code needed. Ask before large refactors.

Runs lint and tests if the project has them, then reports what was built mapped to each spec point.

## Supported CLIs

| CLI | Install path | Format |
|---|---|---|
| Factory Droid | `~/.factory/skills/humane/` | Full skill directory |
| Claude Code | `~/.claude/skills/humane/` | Full skill directory |
| OpenAI Codex | `~/.codex/AGENTS.md` | Coding guidelines |
| Gemini CLI | `~/.gemini/GEMINI.md` | Coding guidelines |
| Antigravity | `~/.gemini/AGENTS.md` | Coding guidelines |
| Cursor | `~/.cursor/rules/humane.mdc` | Coding guidelines |
| Windsurf | `~/.windsurf/rules/humane.mdc` | Coding guidelines |
| Cline | `~/.cline/rules/humane.mdc` | Coding guidelines |


## License

MIT
