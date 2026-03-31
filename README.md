# Humane

A coding skill for AI agents that enforces spec-first, human-readable code. Install it once and your agent will plan before it codes, write names that explain themselves, and produce output that a non-expert can read and change a week later.

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
  7. All               →  Install for all tools above

Enter number [1-7]:
```

The installer creates the destination directory if it does not exist, then copies the skill files. No other changes are made to your system.

## What it does

Once installed, your agent follows two hard rules on every task:

**Spec first.** Before touching any file, the agent must produce a brief internal spec:
- What does this code need to do? (one sentence)
- How will it do that? (2–5 bullets)
- What is the simplest version that fully works?

**Human-first simplicity.** Code must be readable and editable by the person who asked for it — not just by other engineers.

Concretely, this means:
- One function = one job. One file = one purpose.
- Names say what they do: `getUserById`, `formatCurrency`, `isEmailValid`.
- No abstraction until it appears twice in real code.
- Comments explain *why*, not *what*.
- Edit the minimum code needed. Ask before large refactors.

## Supported CLIs

| CLI | Install path | Format |
|---|---|---|
| Factory Droid | `~/.factory/skills/humane/` | Full skill directory |
| Claude Code | `~/.claude/skills/humane/` | Full skill directory |
| OpenAI Codex | `~/.codex/AGENTS.md` | Coding guidelines |
| Gemini CLI | `~/.gemini/GEMINI.md` | Coding guidelines |
| Antigravity | `~/.gemini/AGENTS.md` | Coding guidelines |
| Cursor | `~/.cursor/rules/humane.mdc` | Coding guidelines |


## License

MIT
