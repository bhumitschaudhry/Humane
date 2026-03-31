# Simple Coder Skill

**For:** Claude Code · Codex CLI · Gemini CLI · OpenCode · any AI coding agent

A skill that makes your coding agent think like a spec-based engineer and write
code like a minimalist — producing output that *you* can read, understand, and edit.

---

## What It Does

Most coding agents jump straight to code. This skill adds two steps first:

1. **Spec phase** — The agent clarifies the goal, writes a plain-language spec,
   and checks for ambiguity before writing a single line.

2. **Simplicity phase** — The code is written to a strict set of readability rules:
   self-explanatory names, small focused functions, config at the top, human-readable
   errors, minimal dependencies.

The result: code that looks like a thoughtful human wrote it for another human to maintain.

---

## How to Install

### Option A — Claude Code (SKILL.md)

Copy `SKILL.md` into your Claude Code skills directory:

```bash
# The default location is ~/.claude/skills/ (or wherever your SKILLS_DIR points)
cp SKILL.md ~/.claude/skills/simple-coder.md
```

The skill will trigger automatically when you ask Claude Code to write or build something.

### Option B — Any coding agent (AGENTS.md / CLAUDE.md)

Drop the instruction file into your **project root**. Most agents pick it up automatically:

| Agent | File name to use |
|-------|-----------------|
| Claude Code | `CLAUDE.md` |
| Codex CLI | `AGENTS.md` |
| Gemini CLI | `GEMINI.md` |
| OpenCode | `AGENTS.md` or `opencode.md` |
| Cursor / Windsurf | `.cursorrules` or `AGENTS.md` |

```bash
# For Claude Code
cp references/AGENTS.md ./CLAUDE.md

# For Codex, OpenCode, Gemini CLI
cp references/AGENTS.md ./AGENTS.md
```

You can also append the contents to an existing instructions file.

### Option C — Global agent config

If your agent supports a global instructions file, add the contents there so every project
gets the benefit automatically.

---

## Usage

Once installed, just use your agent normally:

```
You: Add a function that reads a CSV and returns a list of dicts
Agent: [checks spec, writes simple code, points out config values]
```

For bigger tasks, the agent will show you a micro-spec first:
```
Goal: Parse CSV file and return rows as dicts
Input: path to a .csv file
Output: list of dicts, one per row
Error cases: file not found, malformed CSV
Out of scope: writing back to the file
```

You can approve or correct before any code is written.

---

## File Layout

```
simple-coder-skill/
├── SKILL.md              ← Claude Code skill file
└── references/
    ├── AGENTS.md         ← Drop into project root for other agents
    └── README.md         ← This file
```

---

## Philosophy

> "Simple" doesn't mean fewer features or less power.  
> It means the next person who opens the file — probably future-you —  
> can understand it without asking anyone.

The rules in this skill come from a simple question: *"Could a reasonably careful
non-expert read this, make a change, and be confident they haven't broken anything?"*

If yes, the code is simple enough.

---

## Customizing

The instructions are plain Markdown. Edit them freely:

- **Add your stack** — e.g. "We use TypeScript with strict mode" or "Python 3.11+"
- **Add project conventions** — naming patterns, folder structure, test requirements
- **Adjust the simplicity rules** — if you want longer functions, or have specific
  commenting standards, change them

The goal is instructions that feel natural for your project, not a rigid standard.
