#!/usr/bin/env node
/**
 * Keeps every language in sync with the source language (English).
 *
 *   node scripts/sync-locales.mjs              fill gaps, drop stale keys, fix key order
 *   node scripts/sync-locales.mjs --check      verify only; exit 1 on any problem (CI)
 *   node scripts/sync-locales.mjs --untranslated   also list texts identical to English
 *
 * Sources of truth:
 *   docs/locales.json          languages (code, name, htmlLang, README file, labels)
 *   docs/content.json          documentation: title[code] and paragraphs[code] per section
 *   website/messages/<code>.json   website interface strings under "ui"
 *
 * Gaps are filled with the English text so the site keeps working, and each
 * filled entry is reported as "needs translation". Nothing is ever translated
 * automatically.
 */
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = async (path) => JSON.parse(await readFile(new URL(path, root), "utf8"));
const write = (path, value) =>
  writeFile(new URL(path, root), `${JSON.stringify(value, null, 2)}\n`);
const args = new Set(process.argv.slice(2));
const check = args.has("--check");
const listUntranslated = args.has("--untranslated");

const config = await read("docs/locales.json");
const source = config.source;
const codes = config.locales.map((locale) => locale.code);
const targets = codes.filter((code) => code !== source);
const problems = [];
const filled = [];
const untranslated = [];

const bold = (text) => (text.match(/\*\*/g) ?? []).length;
const placeholders = (text) =>
  [...text.matchAll(/\{\s*([A-Za-z0-9_]+)\s*(?:,[^}]*)?\}/g)].map((match) => match[1]).sort().join(",");
// Names, code and product terms legitimately stay in English.
const sameIsFine = (text) =>
  text.length < 4 || !/[a-z]{3}/i.test(text) || /^[\w.$/@()[\]{}:·\- ]+$/.test(text);

// ------------------------------------------------------- documentation
const sections = await read("docs/content.json");
let contentChanged = false;
for (const section of sections) {
  const at = `docs/content.json#${section.id}`;
  const english = section.paragraphs[source];
  for (const code of targets) {
    if (typeof section.title[code] !== "string" || !section.title[code]) {
      problems.push(`${at}: missing title.${code}`);
      section.title[code] = section.title[source];
      filled.push(`${at} title.${code}`);
      contentChanged = true;
    }
    const paragraphs = section.paragraphs[code];
    if (!Array.isArray(paragraphs)) {
      problems.push(`${at}: missing paragraphs.${code}`);
      section.paragraphs[code] = [...english];
      filled.push(`${at} paragraphs.${code} (all)`);
      contentChanged = true;
      continue;
    }
    if (paragraphs.length !== english.length) {
      problems.push(
        `${at}: paragraphs.${code} has ${paragraphs.length} paragraphs, ${source} has ${english.length}`,
      );
      if (paragraphs.length < english.length) {
        section.paragraphs[code] = [...paragraphs, ...english.slice(paragraphs.length)];
        filled.push(`${at} paragraphs.${code}[${paragraphs.length}..${english.length - 1}]`);
      } else section.paragraphs[code] = paragraphs.slice(0, english.length);
      contentChanged = true;
    }
    section.paragraphs[code].forEach((paragraph, index) => {
      if (bold(paragraph) !== bold(english[index]))
        problems.push(`${at}: paragraphs.${code}[${index}] has unbalanced **bold** markers`);
      if (listUntranslated && paragraph === english[index] && !sameIsFine(paragraph))
        untranslated.push(`${at} paragraphs.${code}[${index}]`);
    });
  }
  (section.tables ?? []).forEach((table, index) => {
    const width = table.head?.[source]?.length ?? 0;
    for (const code of codes) {
      if (!Array.isArray(table.head?.[code]) || table.head[code].length !== width)
        problems.push(`${at}: tables[${index}].head.${code} must have ${width} columns`);
      if (typeof table.caption?.[code] !== "string" || !table.caption[code])
        problems.push(`${at}: tables[${index}].caption.${code} is missing`);
    }
    table.rows.forEach((row, rowIndex) => {
      if (row.length !== width)
        problems.push(`${at}: tables[${index}].rows[${rowIndex}] has ${row.length} cells, expected ${width}`);
    });
  });
  for (const code of Object.keys(section.title))
    if (!codes.includes(code)) problems.push(`${at}: title.${code} is not a configured locale`);
}
if (contentChanged && !check) await write("docs/content.json", sections);

// ------------------------------------------------------- website messages
const messages = Object.fromEntries(
  await Promise.all(
    codes.map(async (code) => {
      const path = `website/messages/${code}.json`;
      return [code, existsSync(new URL(path, root)) ? await read(path) : { ui: {} }];
    }),
  ),
);
const sourceKeys = Object.keys(messages[source].ui);
for (const code of targets) {
  const path = `website/messages/${code}.json`;
  const current = messages[code].ui ?? {};
  const next = {};
  for (const key of sourceKeys) {
    const english = messages[source].ui[key];
    if (typeof current[key] !== "string") {
      problems.push(`${path}: missing ${key}`);
      filled.push(`${path} ${key}`);
      next[key] = english;
      continue;
    }
    next[key] = current[key];
    if (placeholders(current[key]) !== placeholders(english))
      problems.push(`${path}: ${key} uses different ICU placeholders than ${source}`);
    if (listUntranslated && current[key] === english && !sameIsFine(english))
      untranslated.push(`${path} ${key}`);
  }
  for (const key of Object.keys(current))
    if (!(key in messages[source].ui)) problems.push(`${path}: stale key ${key}`);
  const ordered = JSON.stringify(Object.keys(current)) === JSON.stringify(sourceKeys);
  if (!ordered && Object.keys(current).length === sourceKeys.length && !problems.some((p) => p.startsWith(path)))
    problems.push(`${path}: keys are not in the ${source}.json order`);
  if (!check) await write(path, { ...messages[code], ui: next });
}

// ------------------------------------------------------- website locale list
const siteLocales = await readFile(new URL("website/lib/locales.ts", root), "utf8");
for (const code of codes)
  if (!siteLocales.includes(`"${code}"`))
    problems.push(`website/lib/locales.ts: add "${code}" to the Locale union`);

// ------------------------------------------------------- report
if (filled.length)
  console.log(`Needs translation (filled with ${source} text):\n  ${filled.join("\n  ")}`);
if (untranslated.length)
  console.log(`Identical to ${source} (check if intentional):\n  ${untranslated.join("\n  ")}`);
if (check && problems.length) {
  console.error(`Locales out of sync:\n  ${problems.join("\n  ")}\nRun pnpm locales, translate the reported entries, then pnpm docs.`);
  process.exit(1);
}
console.log(
  `${check ? "Verified" : "Synchronized"} ${codes.join(", ")}: ${sections.length} documentation sections, ${sourceKeys.length} interface messages.`,
);
