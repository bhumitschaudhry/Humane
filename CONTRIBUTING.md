# Contributing to Humane

Thank you for your interest in making AI agents more humane!
This project exists to enforce spec-first, human-readable code.

## How to contribute

1.  **Language-specific rules**: If you know a language well, add a section to `skill/references/simplicity-rules.md`. Follow the existing format: Structure, Naming, Safety, and "What to avoid".
2.  **CLI Support**: If you use a CLI agent not listed in `bin/install.js`, add it to the `TARGETS` array.
3.  **Core guidelines**: If you think a rule in `AGENTS.md` is too restrictive or not restrictive enough, open an issue or PR.

## Rules for rules

- Rules must be **concrete** and **actionable**. No "write clean code" — instead, use "keep methods under 20 lines".
- Rules should favor **readability** over brevity.
- Rules should favor **explicit** over implicit.

## Development

-   `bin/install.js`: The installer script.
-   `skill/SKILL.md`: The main skill definition for agents.
-   `AGENTS.md`: The core guidelines.
-   `skill/references/`: Language-specific rule sets.

To test the installer:
```bash
node bin/install.js
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
