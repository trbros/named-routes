"use client";
import { useEffect, useRef, useState } from "react";
import Link from "../i18n/navigation";
import { release } from "../lib/release";
import { docGroups, docSections, docHref, getDoc, relatedTopics, getBaseExamples } from "../lib/docs";
import { route } from "../src/routes.generated";
import { useSiteLocale } from "./use-site-locale";
import { DocsCode } from "./docs-code";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { CopyButton } from "./copy-button";
import { Icon } from "./icon";
import { RichText } from "./rich-text";
import { lines } from "../lib/transit";
import { RouteStoryboard } from "./route-storyboard";
import { VersionChanges } from "./changelog";
import type { ChangelogVersion } from "../lib/changelog";

export function Documentation({ selectedId, changelog }: { selectedId?: string; changelog: ChangelogVersion[] }) {
  const { locale, t } = useSiteLocale();
  const selected = getDoc(selectedId);
  const related = relatedTopics(selectedId);
  const baseExamples = getBaseExamples(selectedId);
  const side = useRef<HTMLElement>(null);
  const [active, setActive] = useState("introduction");
  const [pageLink, setPageLink] = useState<string>(docHref(selectedId));
  const [mobileNav, setMobileNav] = useState(false);
  const group = docGroups.find((item) => item.items.some((id) => id === selectedId));
  const items = group?.items ?? [];
  const index = items.findIndex((id) => id === selectedId);
  const previous = index > 0 ? getDoc(items[index - 1]) : undefined;
  const next = index >= 0 ? getDoc(items[index + 1]) : docSections[0];
  const anchors = selected
    ? [
        { id: "introduction", label: t("overview_0efc2e") },
        ...("tables" in selected && Array.isArray(selected.tables) ? [{ id: "comparison-tables", label: t("doc_comparisons") }] : []),
        ...(related.length ? [{ id: "related-topics", label: t("doc_related_topics") }] : []),
        ...(lines.some((line) => line.docId === selected.id)
          ? [{ id: "journey", label: t("how_this_url_was_built_4d2a9c") }]
          : []),
        ...(selected.code
          ? [{ id: "usage", label: t("usage_example_3439e8") }]
          : []),
        ...baseExamples.map((example) => ({ id: example.id, label: example.title[locale] })),
        ...(selected.paragraphs[locale].length > 1
          ? [{ id: "details", label: t("details_dc3dec") }]
          : []),
        { id: "next-steps", label: t("next_steps_11fc14") },
      ]
    : [
        { id: "introduction", label: t("documentation_9e9cf3") },
        { id: "version-changes", label: t("changelog_title") },
        { id: "start-here", label: t("start_here_54acc2") },
        { id: "framework-index", label: t("doc_choose_framework") },
        { id: "topic-index", label: t("doc_browse_all") },
        {
          id: "explore-guides",
          label: t("guides_reference_db7058"),
        },
        { id: "need-help", label: t("project_support_17d544") },
        { id: "next-steps", label: t("next_steps_11fc14") },
      ];
  useEffect(() => {
    setPageLink(window.location.href.split("#")[0]);
    setActive("introduction");
    setMobileNav(false);
    const link = side.current?.querySelector<HTMLElement>(
      '[data-doc-nav][aria-current="page"]',
    );
    if (link) {
      const details = link.closest("details");
      if (details) details.open = true;
      const nav = link.closest("nav");
      if (nav) {
        const item = link.getBoundingClientRect(),
          frame = nav.getBoundingClientRect();
        if (item.top < frame.top) nav.scrollTop += item.top - frame.top;
        else if (item.bottom > frame.bottom)
          nav.scrollTop += item.bottom - frame.bottom;
      }
    }
  }, [selectedId]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-16% 0px -58% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("[data-doc-anchor]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [selectedId, locale]);
  return (
    <div className="reference-grid">
      <aside
        className={"doc-side " + (mobileNav ? "mobile-open" : "")}
        ref={side}
      >
        <button
          className="doc-mobile-toggle"
          type="button"
          aria-expanded={mobileNav}
          onClick={() => setMobileNav(!mobileNav)}
        >
          <Icon name="book" />
          {t("browse_documentation_10ee90")}
          <Icon name="chevron" size={14} />
        </button>
        <div className="doc-primary-links">
          <Link href={docHref()} aria-current={!selected ? "page" : undefined}>
            <Icon name="book" size={17} />
            {t("documentation_9e9cf3")}
          </Link>
          <Link href={route("playground")}>
            <Icon name="grid" size={17} />
            Playground<span>Live</span>
          </Link>
          <a href={release.githubUrl} target="_blank" rel="noreferrer">
            <Icon name="code" size={17} />
            GitHub<small>trbros ↗</small>
          </a>
        </div>
        <nav
          className="doc-topic-nav"
          aria-label={t("documentation_topics_8079fc")}
        >
          {docGroups.map((category) => (
            <details open={selected ? category.items.some((id) => id === selectedId) : category.id === "start"} key={category.id} data-doc-group={category.id}>
              <summary>
                {category.title[locale]}
                <Icon name="chevron" size={13} />
              </summary>
              <div>
                {category.items.map((id) => {
                  const section = getDoc(id);
                  return section ? (
                    <Link
                      key={id}
                      href={docHref(id)}
                      data-doc-nav
                      aria-current={selectedId === id ? "page" : undefined}
                    >
                      {section.title[locale]}
                      {id === "quick-start" && <small>Next.js</small>}
                      {/* The frameworks overview includes native integrations as well as Vite. */}
                    </Link>
                  ) : null;
                })}
              </div>
            </details>
          ))}
        </nav>
        <div className="doc-help-card">
          <span className="help-mark">
            <Icon name="terminal" size={21} />
          </span>
          <h3>{t("learn_by_following_a_route_2b70ff")}</h3>
          <p>
            {t(
              "change_a_parameter_inspect_the_url_see_what_next_receiv_d2b68c",
            )}
          </p>
          <Link href={route("playground")}>
            {t("open_the_playground_3443b9")}
            <Icon name="arrow" size={13} />
          </Link>
        </div>
      </aside>
      <article className="doc-article" key={selectedId ?? "index"}>
        <div className="doc-breadcrumb">
          <Link href={docHref()}>{t("documentation_9e9cf3")}</Link>
          <span>›</span>
          <span>{selected ? group?.title[locale] : t("overview_0efc2e")}</span>
        </div>
        <section id="introduction" data-doc-anchor>
          <div className="doc-title-meta">
            <span className="doc-eyebrow">
              {selected
                ? group?.title[locale]
                : t("your_next_route_starts_here_c28546")}
            </span>
            <span>v{release.version}</span>
          </div>
          <h1>
            {selected ? selected.title[locale] : t("documentation_9e9cf3")}
          </h1>
          <p className="doc-lead">
            {selected
              ? <RichText text={selected.paragraphs[locale][0]} />
              : t("doc_index_description")}
          </p>
        </section>
        {!selected && <VersionChanges changelog={changelog} />}
        {selected ? (
          <>
            {lines.some((line) => line.docId === selected.id) && (
              <section id="journey" className="framework-journey" data-doc-anchor>
                {lines
                  .filter((line) => line.docId === selected.id)
                  .map((line) => (
                    <RouteStoryboard
                      key={line.id}
                      story={{ file: line.file, name: line.name, params: line.params, url: line.url, color: line.color }}
                    />
                  ))}
              </section>
            )}
            {"tables" in selected && Array.isArray(selected.tables) && (
              <section id="comparison-tables" className="doc-tables" data-doc-anchor>
                {selected.tables.map((table) => (
                  <div key={table.caption.en} className="doc-table-wrap">
                    <table className="doc-table">
                      <caption>{table.caption[locale]}</caption>
                      <thead>
                        <tr>
                          {table.head[locale].map((cell) => (
                            <th key={cell} scope="col">
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, index) =>
                              index === 0 ? (
                                <th key={`${row[0]}-${index}`} scope="row">
                                  <RichText text={cell} />
                                </th>
                              ) : (
                                <td key={`${row[0]}-${index}`}>
                                  <RichText text={cell} />
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </section>
            )}
            {selected.paragraphs[locale].length > 1 && (
              <section id="details" data-doc-anchor>
                <h2>{t("details_dc3dec")}</h2>
                {selected.paragraphs[locale].slice(1).map((paragraph, i) => (
                  <p key={i}>
                    <RichText text={paragraph} />
                  </p>
                ))}
              </section>
            )}
            {baseExamples.map((example) => (
              <section key={example.id} id={example.id} data-doc-anchor>
                <h2>{example.title[locale]}</h2>
                <p><RichText text={example.description[locale]} /></p>
                <DocsCode code={example.code} language={example.language} label={example.title[locale]} />
              </section>
            ))}
            {selected.code && (
              <section id="usage" data-doc-anchor>
                <div className="doc-section-title">
                  <h2>{t("usage_example_3439e8")}</h2>
                  <span>{selected.language.toUpperCase()}</span>
                </div>
                <DocsCode
                  code={selected.code}
                  language={selected.language}
                  label={selected.title[locale]}
                />
              </section>
            )}

</>
        ) : (
          <>
            <section id="start-here" data-doc-anchor>
              <h2>{t("a_good_starting_point_ef6820")}</h2>
              <p>
                {t(
                  "the_shortest_path_from_your_filesystem_to_your_first_na_0eb26c",
                )}
              </p>
              <div className="doc-start-grid">
                {[
                  {
                    id: "quick-start",
                    icon: "route",
                    message: "connect_to_next_js_da17eb",

                    description: t(
                      "one_wrapper_automatic_discovery_your_existing_workflow_2952fa",
                    ),
                  },
                  {
                    id: "installation",
                    icon: "terminal",
                    message: "installation_c81b79",

                    description: t(
                      "install_locally_and_prepare_the_package_for_your_projec_0c95f6",
                    ),
                  },
                  {
                    id: "naming",
                    icon: "folder",
                    message: "naming_conventions_34803b",

                    description: t(
                      "see_how_folders_and_dynamic_segments_become_route_names_a1d736",
                    ),
                  },
                  {
                    id: "runtime-api",
                    icon: "code",
                    message: "api_reference_89c25a",

                    description: t(
                      "explore_route_url_options_and_type_inference_50a5fe",
                    ),
                  },
                ].map((card) => (
                  <Link key={card.id} href={docHref(card.id)}>
                    <Icon
                      name={
                        card.icon as "route" | "terminal" | "folder" | "code"
                      }
                      size={21}
                    />
                    <h3>{t(card.message)}</h3>
                    <p>{card.description}</p>
                    <span>
                      <Icon name="arrow" size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
            <section id="framework-index" data-doc-anchor>
              <h2>{t("doc_choose_framework")}</h2>
              <div className="doc-reference-links">
                {docGroups.filter((item) => item.id.startsWith("framework-")).map((item) => (
                  <Link key={item.id} href={docHref(item.items[0])}>
                    <Icon name="book" size={16} />
                    {item.title[locale]}
                    <Icon name="arrow" size={14} />
                  </Link>
                ))}
              </div>
            </section>
            <section id="topic-index" data-doc-anchor>
              <h2>{t("doc_browse_all")}</h2>
              <Accordion type="multiple" className="w-full rounded-lg border border-border bg-background px-4">
                {docGroups.filter((item) => !item.id.startsWith("framework-")).map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-base">{item.title[locale]}</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid min-w-0 gap-1 sm:grid-cols-2">
                        {item.items.map((id) => {
                          const topic = getDoc(id);
                          return topic ? (
                            <Button key={id} variant="ghost" asChild className="h-auto min-h-9 w-full justify-between whitespace-normal px-2 py-2 text-left font-normal">
                              <Link href={docHref(id)}>
                                <span className="min-w-0 break-words">{topic.title[locale]}</span>
                                <Icon name="arrow" size={14} />
                              </Link>
                            </Button>
                          ) : null;
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
            <section id="explore-guides" data-doc-anchor>
              <h2>{t("go_a_little_deeper_b67cab")}</h2>
              <p>
                {t(
                  "recipes_and_contracts_for_the_way_your_application_work_b8bf63",
                )}
              </p>
              <div className="doc-reference-links">
                {[
                  "app-router",
                  "pages-router",
                  "parameters",
                  "configuration",
                  "errors",
                  "versioning",
                ].map((id) => {
                  const section = getDoc(id)!;
                  return (
                    <Link key={id} href={docHref(id)}>
                      <Icon name="book" size={16} />
                      {section.title[locale]}
                      <Icon name="arrow" size={14} />
                    </Link>
                  );
                })}
              </div>
            </section>
            <section
              id="need-help"
              className="doc-project-card"
              data-doc-anchor
            >
              <div>
                <Icon name="route" size={24} />
                <h2>{t("build_your_first_named_route_068566")}</h2>
                <p>
                  {t(
                    "connect_the_next_js_wrapper_create_a_page_and_use_its_g_ba8b81",
                  )}
                </p>
              </div>
              <div>
                <Link href={docHref("quick-start")}>
                  {t("quick_start_b342f0")}
                  <Icon name="arrow" size={14} />
                </Link>
                <a href={release.githubUrl} target="_blank" rel="noreferrer">
                  GitHub / trbros ↗
                </a>
              </div>
            </section>
          </>
        )}
        {selected && related.length > 0 && (
          <section id="related-topics" data-doc-anchor>
            <h2>{t("doc_related_topics")}</h2>
            <div className="doc-reference-links">
              {related.map((topic) => (
                <Link key={topic.id} href={docHref(topic.id)}>
                  <Icon name="book" size={16} />{topic.title[locale]}<Icon name="arrow" size={14} />
                </Link>
              ))}
            </div>
          </section>
        )}
        <section id="next-steps" className="doc-next-steps" data-doc-anchor>
          <h2>{t("next_steps_11fc14")}</h2>
          <div>
            <Link href={previous ? docHref(previous.id) : docHref()}>
              <span>← {t("previous_50f942")}</span>
              <strong>
                {previous
                  ? previous.title[locale]
                  : t("documentation_overview_0b58dc")}
              </strong>
            </Link>
            {next && (
              <Link href={docHref(next.id)}>
                <span>{t("next_bc9819")} →</span>
                <strong>{next.title[locale]}</strong>
              </Link>
            )}
          </div>
        </section>
        <div className="doc-article-footer">
          <span>{release.name}</span>
          <span>{t("app_router_pages_router_c2afa2")}</span>
        </div>
      </article>
      <aside className="doc-on-page">
        <div className="doc-copy-link">
          <CopyButton text={pageLink} label={t("copy_page_link_6226a2")} />
        </div>
        <h2>{t("on_this_page_7e439c")}</h2>
        <nav aria-label={t("on_this_page_7e439c")}>
          {anchors.map((anchor) => (
            <a
              key={anchor.id}
              href={"#" + anchor.id}
              aria-current={active === anchor.id ? "location" : undefined}
              onClick={() => setActive(anchor.id)}
            >
              {anchor.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="doc-back-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            })
          }
        >
          ↑ <span>{t("back_to_top_d9c883")}</span>
        </button>
        <div className="doc-release-note">
          <span>v{release.version}</span>
          <p>{t("api_contract_and_compatibility_c62cc4")}</p>
          <Link href={route("releases")}>
            {t("view_release_notes_04c207")} ↗
          </Link>
        </div>
      </aside>
    </div>
  );
}
