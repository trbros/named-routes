import { readFileSync } from "node:fs";
import path from "node:path";
import { type ChangelogVersion, parseChangelog } from "./changelog";

/** Server-only: the changelog lives at the repository root, next to the package it describes. */
export function readChangelog(): ChangelogVersion[] {
  return parseChangelog(readFileSync(path.join(process.cwd(), "..", "CHANGELOG.md"), "utf8"));
}
