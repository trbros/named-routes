"use client";
import { useState } from "react";
import Link from "../i18n/navigation";
import { type ChangelogVersion, versionAnchor } from "../lib/changelog";
import { htmlLang, type Locale } from "../lib/locales";
import { route } from "../src/routes.generated";
import { Icon } from "./icon";
import { RichText } from "./rich-text";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useSiteLocale } from "./use-site-locale";

const sectionKeys: Record<string, string> = {
  added: "changelog_section_added",
  changed: "changelog_section_changed",
  fixed: "changelog_section_fixed",
  breaking: "changelog_section_breaking",
  documentation: "changelog_section_documentation",
};

const extraTitles: Record<string, Record<Locale, string>> = {
  "website and seo": { en: "Website and SEO", pt: "Website e SEO", es: "Sitio web y SEO", ja: "ウェブサイトと SEO" },
  "tests and release tooling": { en: "Tests and release tooling", pt: "Testes e ferramentas de release", es: "Pruebas y herramientas de publicación", ja: "テストとリリースツール" },
  "upgrade notes": { en: "Upgrade notes", pt: "Notas de atualização", es: "Notas de actualización", ja: "アップグレード時の注意事項" },
};

export const changeCount = (entry: ChangelogVersion) =>
  entry.sections.reduce((total, section) => total + section.items.length, 0);

/** One version of CHANGELOG.md. Entries and headings use the active locale. */
export function ChangelogEntry({ entry }: { entry: ChangelogVersion }) {
  const { locale, t } = useSiteLocale();
  return (
    <div className="changelog-entry" lang={htmlLang(locale)}>
      {entry.summary.map((text) => (
        <p key={text} className="changelog-summary">
          <RichText text={text} />
        </p>
      ))}
      {entry.sections.map((section) => {
        const key = sectionKeys[section.title.toLowerCase()];
        return (
          <div key={section.title || "changes"} className="changelog-section">
            {section.title && (
              <h4 data-kind={section.title.toLowerCase()}>{key ? t(key) : (extraTitles[section.title.toLowerCase()]?.[locale] ?? section.title)}</h4>
            )}
            <ul>
              {section.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/** Documentation panel: pick a version and read what changed in it. */
export function VersionChanges({ changelog }: { changelog: ChangelogVersion[] }) {
  const { t } = useSiteLocale();
  const [version, setVersion] = useState(changelog[0]?.version);
  const [open, setOpen] = useState(false);
  const entry = changelog.find((item) => item.version === version);
  if (!entry) return null;
  return (
    <section id="version-changes" className="version-changes" data-doc-anchor>
      <div className="version-changes-bar">
        <Label htmlFor="docs-version" className="version-changes-label">
          {t("changelog_version")}
        </Label>
        <Select
          value={version}
          onValueChange={(next) => {
            setVersion(next);
            setOpen(true);
          }}
        >
          <SelectTrigger id="docs-version" size="sm" className="min-w-36 font-mono text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {changelog.map((item) => (
              <SelectItem key={item.version} value={item.version} className="font-mono text-xs">
                {item.unreleased ? t("changelog_unreleased") : `v${item.version}${item.date ? ` · ${item.date}` : ""}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Link className="version-changes-link" href={route("releases", {}, { hash: versionAnchor(entry.version) })}>
          {t("changelog_full")}
          <Icon name="arrow" size={13} />
        </Link>
      </div>
      <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
        <summary>
          <span>{entry.unreleased ? t("changelog_unreleased") : t("changelog_whats_new", { version: `v${entry.version}` })}</span>
          <span className="badge">{t("changelog_changes", { count: changeCount(entry) })}</span>
        </summary>
        <ChangelogEntry entry={entry} />

      </details>
    </section>
  );
}
