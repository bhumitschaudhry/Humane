#!/usr/bin/env node

'use strict';

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_NAME = 'humane';
const SKILL_DIR = path.join(__dirname, '..', 'skill');
const AGENTS_MD = path.join(SKILL_DIR, 'assets', 'AGENTS.md');

const TARGETS = [
  {
    label: 'Factory Droid   →  ~/.factory/skills/humane/',
    dest: path.join(os.homedir(), '.factory', 'skills', SKILL_NAME),
    mode: 'skill',
  },
  {
    label: 'Claude Code     →  ~/.claude/skills/humane/',
    dest: path.join(os.homedir(), '.claude', 'skills', SKILL_NAME),
    mode: 'skill',
  },
  {
    label: 'OpenAI Codex    →  ~/.codex/AGENTS.md',
    dest: path.join(os.homedir(), '.codex', 'AGENTS.md'),
    mode: 'file',
  },
  {
    label: 'Gemini CLI      →  ~/.gemini/GEMINI.md',
    dest: path.join(os.homedir(), '.gemini', 'GEMINI.md'),
    mode: 'file',
  },
  {
    label: 'Antigravity     →  ~/.gemini/AGENTS.md',
    dest: path.join(os.homedir(), '.gemini', 'AGENTS.md'),
    mode: 'file',
  },
  {
    label: 'Cursor          →  ~/.cursor/rules/humane.mdc',
    dest: path.join(os.homedir(), '.cursor', 'rules', 'humane.mdc'),
    mode: 'file',
  },
  {
    label: 'Windsurf        →  ~/.windsurf/rules/humane.mdc',
    dest: path.join(os.homedir(), '.windsurf', 'rules', 'humane.mdc'),
    mode: 'file',
  },
  {
    label: 'Cline           →  ~/.cline/rules/humane.mdc',
    dest: path.join(os.homedir(), '.cline', 'rules', 'humane.mdc'),
    mode: 'file',
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
function install(target) {
  if (target.mode === 'skill') {
    copyDir(SKILL_DIR, target.dest);
    console.log(`\nInstalled to: ${target.dest}`);
  } else {
    fs.mkdirSync(path.dirname(target.dest), { recursive: true });
    fs.copyFileSync(AGENTS_MD, target.dest);
    console.log(`\nInstalled to: ${target.dest}`);
  }
}

function main() {
  console.log('\nHumane Skill Installer\n');
  console.log('Select your CLI:\n');

  TARGETS.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.label}`);
  });
  console.log(`  ${TARGETS.length + 1}. All               →  Install for all tools above`);

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const maxOption = TARGETS.length + 1;

  rl.question(`\nEnter number [1-${maxOption}]: `, (answer) => {
    rl.close();

    const choice = parseInt(answer, 10);
    if (isNaN(choice) || choice < 1 || choice > maxOption) {
      console.error('Invalid selection. Please run again and enter a number from the list.');
      process.exit(1);
    }

    const isAll = choice === maxOption;
    const targets = isAll ? TARGETS : [TARGETS[choice - 1]];

    try {
      for (const target of targets) {
        install(target);
      }
      console.log('Done.\n');
    } catch (err) {
      console.error(`\nInstall failed: ${err.message}`);
      process.exit(1);
    }
  });
}

main();
