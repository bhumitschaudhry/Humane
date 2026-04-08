#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const RULES = {
  maxFunctionLines: 40,
  maxFileLines: 400,
  noAny: true,
  badNames: ['data', 'item', 'handler', 'temp', 'obj', 'thing', 'foo'],
  maxNesting: 3,
};

function getLineCount(content) {
  return content.split('\n').length;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const lineCount = lines.length;
  const ext = path.extname(filePath);

  console.log(`Checking ${filePath}...`);

  if (lineCount > RULES.maxFileLines) {
    console.warn(`[FAIL] ${filePath} exceeds ${RULES.maxFileLines} lines (${lineCount}).`);
  } else {
    console.log(`[PASS] File length: ${lineCount} lines.`);
  }

  // Check for 'any' in TypeScript
  if (RULES.noAny && (ext === '.ts' || ext === '.tsx')) {
    const anyMatches = content.match(/:\s*any(?![a-zA-Z0-9_])/g);
    if (anyMatches) {
      console.warn(`[FAIL] Found ${anyMatches.length} 'any' type usages in ${filePath}.`);
    } else {
      console.log(`[PASS] No 'any' types found.`);
    }
  }

  // Check for bad variable names
  const badNameRegex = new RegExp(`\\b(${RULES.badNames.join('|')})\\b`, 'gi');
  const badNameMatches = content.match(badNameRegex);
  if (badNameMatches) {
    console.warn(`[FAIL] Found generic variable names in ${filePath}: ${Array.from(new Set(badNameMatches)).join(', ')}.`);
  } else {
    console.log(`[PASS] No generic variable names found.`);
  }

  // Check for deep nesting (naive)
  let maxNestingFound = 0;
  let currentNesting = 0;
  for (const char of content) {
    if (char === '{') currentNesting++;
    if (char === '}') currentNesting--;
    if (currentNesting > maxNestingFound) maxNestingFound = currentNesting;
  }
  if (maxNestingFound > RULES.maxNesting) {
    console.warn(`[FAIL] Nesting depth is ${maxNestingFound} (max allowed: ${RULES.maxNesting}).`);
  } else {
    console.log(`[PASS] Nesting depth: ${maxNestingFound}.`);
  }

  // Very naive function length check (searching for function blocks)
  // This is a rough estimation.
  let functionStartLine = -1;
  let braceCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/(function|const|let|var)\s+[a-zA-Z0-9_]+\s*=?\s*(\(.*?\)|.*?)\s*=>\s*\{/)) {
      functionStartLine = i;
      braceCount = 0;
    }
    if (functionStartLine !== -1) {
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;
      if (braceCount === 0 && line.includes('}')) {
        const functionLength = i - functionStartLine + 1;
        if (functionLength > RULES.maxFunctionLines) {
          console.warn(`[FAIL] Function at line ${functionStartLine + 1} exceeds ${RULES.maxFunctionLines} lines (${functionLength}).`);
        }
        functionStartLine = -1;
      }
    }
  }
}

function walk(dir, callback) {
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ?
      walk(dirPath, callback) : callback(path.join(dir, f));
  });
};

function main() {
  const args = process.argv.slice(2);
  const targetDir = args[0] || '.';

  console.log(`Humane Code Validator\n`);

  walk(targetDir, (filePath) => {
    const ext = path.extname(filePath);
    if (['.ts', '.tsx', '.js', '.jsx', '.py', '.go', '.rs'].includes(ext)) {
      if (filePath.includes('node_modules')) return;
      checkFile(filePath);
      console.log('');
    }
  });
}

main();
