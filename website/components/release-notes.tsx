"use client";
import Link from "../i18n/navigation";
import { docHref } from "../lib/docs";
import { type ChangelogVersion, versionAnchor } from "../lib/changelog";
import { release } from "../lib/release";
import { ChangelogEntry, changeCount } from "./changelog";
import { CodeBlock } from "./code-block";
import { FlapText } from "./flap-text";
import { Icon } from "./icon";
import { useSiteLocale } from "./use-site-locale";

/** Translated one-line summaries; the full entries come from the localized catalog. */
const notes: Record<string, string> = {
  "1.0.0": "release_v100_note_7b2c94",
  "1.1.0": "release_v110_note",
  "2.0.0": "release_v200_note",
  "2.1.0": "release_v210_note",
};

export function ReleaseNotes({ changelog }: { changelog: ChangelogVersion[] }) {
  const { t } = useSiteLocale();
  const timeline = changelog.filter((item) => !item.unreleased).reverse();
  return (
    <article className="doc-article page-article release-page">
      <div className="doc-breadcrumb">
        <Link href={docHref()}>{t("documentation_9e9cf3")}</Link>
        <span>›</span>
        <span>{t("releases_8fa41d")}</span>
      </div>
      <section id="introduction">
        <div className="doc-title-meta">
          <span className="doc-eyebrow">NAMED ROUTES / RELEASES</span>
          <span className="badge">{t("version_1_x_534eea")}</span>
        </div>
        <div className="release-stamp" aria-hidden="true">
          <FlapText text={`v${release.version}`} />
        </div>
        <h1>{t("the_v1_contract_bbca32")}</h1>
        <p className="doc-lead">{t("automatic_route_discovery_typed_navigation_and_a_stable_dc1609")}</p>
      </section>
      <section>
        <h2>{t("release_line_5f1c03")}</h2>
        <ol className="release-line">
          {timeline.map((item, index) => (
            <li key={item.version} className={index === timeline.length - 1 ? "is-current" : undefined}>
              <span className="release-dot" aria-hidden="true" />
              <a href={`#${versionAnchor(item.version)}`}>
                <code>v{item.version}</code>
              </a>
              <p>{notes[item.version] ? t(notes[item.version]) : (item.summary[0] ?? "")}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="release-changelog" aria-labelledby="changelog">
        <h2 id="changelog">{t("changelog_title")}</h2>
        <p>
          {t("changelog_lead")}
        </p>
        {changelog.map((entry) => (
          <section key={entry.version} id={versionAnchor(entry.version)} className="changelog-version">
            <header>
              <h3>
                <a href={`#${versionAnchor(entry.version)}`}>{entry.unreleased ? t("changelog_unreleased") : `v${entry.version}`}</a>
              </h3>
              {entry.unreleased ? (
                <span className="badge">{t("changelog_unreleased")}</span>
              ) : (
                entry.date && <time dateTime={entry.date}>{entry.date}</time>
              )}
              <span className="changelog-count">{t("changelog_changes", { count: changeCount(entry) })}</span>
            </header>
            <ChangelogEntry entry={entry} />
          </section>
        ))}
      </section>
      <section className="release-contract">
        <h2>{t("stable_in_1_x_52c983")}</h2>
        {[
          [t("automatic_names_c2ab56"), "home · user.profile · users.$user"],
          [t("typed_url_generation_55fd0d"), "route(name, params, options)"],
          [t("explicit_url_options_f0dbd3"), "query · hash · basePath · absolute · locale"],
          [t("next_integration_840bc7"), "withNamedRoutes(nextConfig, options)"],
          [t("vite_integration_4b7d0e"), "namedRoutes(options) · @triooo/named-routes/nuxt"],
          [t("tooling_4fc60e"), "generate · check · list · watch · init · doctor · migrate"],
          [t("compatibility_baseline_f0f3e2"), "Node.js 22.12+ · TypeScript 5.4+ · Next 16 · Vite"],
        ].map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <code>{value}</code>
          </div>
        ))}
      </section>
      <section className="release-validation">
        <div>
          <p className="doc-eyebrow">{t("get_started_890bdc")}</p>
          <h2>{t("add_named_routes_to_your_project_f96989")}</h2>
          <p>{t("install_the_package_and_connect_withnamedroutes_to_your_ebf41c")}</p>
        </div>
        <CodeBlock code="npm install @triooo/named-routes" language="sh" label={t("install_the_package_a52739")} />
      </section>
      <section className="doc-next-steps">
        <p className="release-note">{t("a_breaking_change_to_this_documented_contract_requires__c5f529")}</p>
        <Link className="button primary" href={docHref("versioning")}>
          {t("read_the_v1_guide_2f37de")}
          <Icon name="arrow" size={16} />
        </Link>
      </section>
    </article>
  );
}
