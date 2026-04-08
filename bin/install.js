#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { intro, outro, select, multiselect, spinner, note, isCancel, cancel, text } = require('@clack/prompts');
const pc = require('picocolors');

const SKILL_NAME = 'humane';
const SKILL_DIR = path.join(__dirname, '..', 'skill');
const AGENTS_MD = path.join(SKILL_DIR, 'assets', 'AGENTS.md');

const TARGETS = [
  {
    value: 'factory',
    label: 'Factory Droid',
    hint: '~/.factory/skills/humane/',
    dest: (home) => path.join(home, '.factory', 'skills', SKILL_NAME),
    mode: 'skill',
  },
  {
    value: 'claude',
    label: 'Claude Code',
    hint: '~/.claude/skills/humane/',
    dest: (home) => path.join(home, '.claude', 'skills', SKILL_NAME),
    mode: 'skill',
  },
  {
    value: 'codex',
    label: 'OpenAI Codex',
    hint: '~/.codex/AGENTS.md',
    dest: (home) => path.join(home, '.codex', 'AGENTS.md'),
    mode: 'file',
  },
  {
    value: 'gemini',
    label: 'Gemini CLI',
    hint: '~/.gemini/GEMINI.md',
    dest: (home) => path.join(home, '.gemini', 'GEMINI.md'),
    mode: 'file',
  },
  {
    value: 'antigravity',
    label: 'Antigravity',
    hint: '~/.gemini/AGENTS.md',
    dest: (home) => path.join(home, '.gemini', 'AGENTS.md'),
    mode: 'file',
  },
  {
    value: 'cursor',
    label: 'Cursor',
    hint: '~/.cursor/rules/humane.mdc',
    dest: (home) => path.join(home, '.cursor', 'rules', 'humane.mdc'),
    mode: 'file',
  },
  {
    value: 'windsurf',
    label: 'Windsurf',
    hint: '~/.windsurf/rules/humane.mdc',
    dest: (home) => path.join(home, '.windsurf', 'rules', 'humane.mdc'),
    mode: 'file',
  },
  {
    value: 'cline',
    label: 'Cline',
    hint: '~/.cline/rules/humane.mdc',
    dest: (home) => path.join(home, '.cline', 'rules', 'humane.mdc'),
    mode: 'file',
  },
  {
    value: 'custom',
    label: 'Custom path...',
    hint: 'Enter a custom path',
    mode: 'custom',
  },
];

/** Recursively copy a directory. */
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/** Install the skill or guidelines file to the chosen destination. */
function install(target, dest) {
  const finalDest = typeof dest === 'string' ? dest : target.dest(os.homedir());
  if (target.mode === 'skill' || target.mode === 'custom') {
    // For custom, if it's a directory we'll copy the skill, if it looks like a file we'll copy AGENTS.md
    // To keep it simple for 'custom', if it ends with .md or .mdc we treat it as a file.
    if (finalDest.endsWith('.md') || finalDest.endsWith('.mdc')) {
      fs.mkdirSync(path.dirname(finalDest), { recursive: true });
      fs.copyFileSync(AGENTS_MD, finalDest);
    } else {
      copyDir(SKILL_DIR, finalDest);
    }
  } else {
    fs.mkdirSync(path.dirname(finalDest), { recursive: true });
    fs.copyFileSync(AGENTS_MD, finalDest);
  }
  return finalDest;
}

async function main() {
  intro(pc.bgCyan(pc.black(' Humane Skill Installer ')));

  const selectedTargetValues = await multiselect({
    message: 'Select AI tools to install Humane for:',
    options: TARGETS.map(t => ({ value: t.value, label: t.label, hint: t.hint })),
    required: true,
  });

  if (isCancel(selectedTargetValues)) {
    cancel('Installation cancelled.');
    process.exit(0);
  }

  const installs = [];
  
  for (const value of selectedTargetValues) {
    const target = TARGETS.find(t => t.value === value);
    if (value === 'custom') {
      const customPath = await text({
        message: 'Enter custom installation path:',
        placeholder: 'e.g. ./docs/HUMANE.md or ~/.my-ai/rules/',
        validate: (v) => v.trim() === '' ? 'Path is required' : undefined,
      });

      if (isCancel(customPath)) {
        cancel('Installation cancelled.');
        process.exit(0);
      }
      installs.push({ target, dest: customPath.trim() });
    } else {
      installs.push({ target, dest: null });
    }
  }

  const s = spinner();
  s.start('Installing Humane skill...');

  try {
    const results = [];
    for (const { target, dest } of installs) {
      const finalPath = install(target, dest);
      results.push(`• ${target.label === 'Custom path...' ? 'Custom' : target.label}: ${pc.dim(finalPath)}`);
    }

    s.stop('Installation complete!');

    note(results.join('\n'), 'Installed Locations');
    outro(pc.green('Done! Your AI agents are now more humane.'));
  } catch (err) {
    s.stop('Installation failed', 1);
    console.error(pc.red(`\nError: ${err.message}`));
    process.exit(1);
  }
}

main().catch(console.error);
