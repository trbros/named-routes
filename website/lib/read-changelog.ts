import catalog from "../../docs/changelog.json";
import { type ChangelogVersion, parseChangelog } from "./changelog";
import type { Locale } from "./locales";

/** Static catalog is bundled with the site, including on Vercel. */
export function readChangelog(locale: Locale): ChangelogVersion[] {
  return parseChangelog(catalog[locale]);
}
