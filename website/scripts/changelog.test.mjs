import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { parseChangelog, versionAnchor } from "../lib/changelog.ts";

const catalog = JSON.parse(await readFile(new URL("../../docs/changelog.json", import.meta.url), "utf8"));
const shape = (entries) => entries.map(({ version, date, unreleased, summary, sections }) => ({
  version, date, unreleased, summary: summary.length,
  sections: sections.map(({ title, items }) => ({ title, items: items.length })),
}));

test("each locale preserves releases, dates, sections and all entries", () => {
  const source = parseChangelog(catalog.en);
  assert.ok(source.length > 0);
  for (const locale of ["pt", "es", "ja"]) {
    const translated = parseChangelog(catalog[locale]);
    assert.deepEqual(shape(translated), shape(source));
    assert.notDeepEqual(translated, source);
  }
});

test("Unreleased has a distinct anchor and does not hide pending changes", () => {
  const entries = parseChangelog("# Changelog\n\n## 2.1.1 - 2026-11-26\n- Published\n\n## Unreleased\n- Pending\n");
  assert.deepEqual(entries.map((entry) => entry.version), ["2.1.1", "unreleased"]);
  assert.deepEqual(entries.map((entry) => versionAnchor(entry.version)), ["v2-1-1", "unreleased"]);
  assert.deepEqual(entries[1].sections[0].items, ["Pending"]);
});
