import { release } from "./release";

export type ChangelogSection = { title: string; items: string[] };
export type ChangelogVersion = {
  version: string;
  date?: string;
  /** The "Unreleased" heading, shown as the package.json version until it gets its own heading. */
  unreleased?: boolean;
  summary: string[];
  sections: ChangelogSection[];
};

/** Anchor id of a version on the releases page: 2.0.0 → v2-0-0. */
export const versionAnchor = (version: string) => `v${version.replaceAll(".", "-")}`;

/** Parses the repository CHANGELOG.md ("## x.y.z - date", "### Section", "- item"), newest first. */
export function parseChangelog(markdown: string, current = release.version): ChangelogVersion[] {
  const versions: ChangelogVersion[] = [];
  for (const block of markdown.split(/^## /m).slice(1)) {
    const [heading, ...lines] = block.split(/\r?\n/);
    const [name, date] = heading.split(" - ").map((part) => part.trim());
    const unreleased = /^unreleased$/i.test(name);
    const entry: ChangelogVersion = { version: unreleased ? current : name, date, unreleased, summary: [], sections: [] };
    let section: ChangelogSection | undefined;
    for (const line of lines) {
      const text = line.trim();
      if (!text) continue;
      if (text.startsWith("### ")) {
        const title = text.slice(4).trim();
        // A heading repeated inside one version (e.g. two "### Added") is merged.
        section = entry.sections.find((item) => item.title === title);
        if (!section) entry.sections.push((section = { title, items: [] }));
      } else if (text.startsWith("- ")) {
        if (!section) entry.sections.push((section = { title: "", items: [] }));
        section.items.push(text.slice(2));
      } else if (section && section.items.length) {
        // Continuation line of the previous item.
        section.items[section.items.length - 1] += ` ${text}`;
      } else {
        entry.summary.push(text);
      }
    }
    // An "Unreleased" block whose version already has a heading would duplicate it.
    if (unreleased && markdown.includes(`\n## ${current}`)) continue;
    versions.push(entry);
  }
  return versions;
}
