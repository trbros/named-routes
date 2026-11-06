"use client";
import { NamedRouteError } from "@triooo/next-named-routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { docHref } from "../lib/docs";
import { type RouteName, route, routes } from "../src/routes.generated";
import { CodeBlock, InlineCode } from "./code-block";
import { CopyButton } from "./copy-button";
import { FlapText } from "./flap-text";
import { Icon } from "./icon";
import { formatParams, RouteStoryboard } from "./route-storyboard";
import { useSiteLocale } from "./use-site-locale";

const scenarios = [
  { id: "users", label: "scenario_0", name: "users.$user", file: "users/[user]/page.tsx", parameter: "user", initial: "ana" },
  { id: "profile", label: "scenario_1", name: "user.profile", file: "user/profile/page.tsx", parameter: "", initial: "" },
  { id: "projects", label: "scenario_2", name: "projects.$project", file: "projects/[project]/page.tsx", parameter: "project", initial: "triooo" },
  { id: "guides", label: "scenario_3", name: "guides.$slug", file: "guides/[[...slug]]/page.tsx", parameter: "slug", initial: "getting-started/installation" },
] as const satisfies readonly {
  id: string;
  label: string;
  name: RouteName;
  file: string;
  parameter: string;
  initial: string;
}[];

/** Replays the storyboard only after typing pauses. */
function useSettled<T>(value: T, delay = 550) {
  const [settled, setSettled] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);
  return settled;
}

export function Playground() {
  const { t } = useSiteLocale();
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState<string>(scenarios[0].initial);
  const [query, setQuery] = useState("overview");
  const [hash, setHash] = useState("");
  const [view, setView] = useState<"link" | "router">("link");
  const scenario = scenarios[selected];
  const options = { query: query ? { tab: query } : undefined, hash: hash || undefined };
  let href = "";
  let error = "";
  try {
    switch (scenario.id) {
      case "users":
        href = route("users.$user", { user: value }, options);
        break;
      case "profile":
        href = route("user.profile", {}, options);
        break;
      case "projects":
        href = route("projects.$project", { project: value }, options);
        break;
      case "guides":
        href = route("guides.$slug", { slug: value ? value.split("/") : [] }, options);
        break;
    }
  } catch (caught) {
    error =
      caught instanceof NamedRouteError
        ? `${scenario.parameter}: ${t("enter_valid_segments_standalone_dots_are_not_allowed_00acd6")}`
        : t("could_not_generate_the_url_34438d");
  }
  const params = scenario.parameter
    ? { [scenario.parameter]: scenario.id === "guides" ? (value ? value.split("/") : []) : value }
    : {};
  const settledHref = useSettled(href);
  const call = `route(${JSON.stringify(scenario.name)}, ${JSON.stringify(params)}${query || hash ? `, ${JSON.stringify({ ...(query ? { query: { tab: query } } : {}), ...(hash ? { hash } : {}) })}` : ""})`;
  const code =
    view === "link"
      ? `import Link from 'next/link';
import { route } from './routes.generated';

<Link href={${call}}>${t("open_page_9ee309")}</Link>`
      : `'use client';
import { useRouter } from 'next/navigation';
import { route } from './routes.generated';

export function OpenPage() {
  const router = useRouter();
  return <button onClick={() => router.push(
    ${call}
  )}>${t("open_page_9ee309")}</button>;
}`;
  function choose(index: number) {
    setSelected(index);
    setValue(scenarios[index].initial);
  }
  return (
    <article className="doc-article page-article playground-page">
      <div className="doc-breadcrumb">
        <Link href={docHref()}>{t("documentation_9e9cf3")}</Link>
        <span>›</span>
        <span>Playground</span>
      </div>
      <section id="introduction">
        <div className="doc-title-meta">
          <span className="doc-eyebrow">PLAYGROUND</span>
          <span className="live-pill">
            <span className="status-dot" />
            {Object.keys(routes).length} {t("discovered_routes_c8a4d6")}
          </span>
        </div>
        <h1>
          {t("one_name_09b4f0")} <span className="title-accent">{t("any_path_35a308")}</span>
        </h1>
        <p className="doc-lead">
          {t("you_create_the_pages_next_finds_the_routes_5acad8")}{" "}
          {t("navigate_by_name_with_typed_parameters_and_no_hand_main_ef6a83")}
        </p>
      </section>
      <section className="playground-story">
        <h2>{t("from_file_to_destination_05928d")}</h2>
        <p>{t("change_it_see_the_code_follow_a_real_route_4b853e")}</p>
        <RouteStoryboard
          story={{ file: `app/${scenario.file}`, name: scenario.name, params: formatParams(params), url: error ? "—" : settledHref }}
          playKey={`${scenario.id}:${settledHref}`}
        />
      </section>
      <section className="playground" aria-label={t("route_explorer_ecc2d7")}>
        <aside className="file-panel">
          <div className="panel-title">
            <Icon name="folder" size={16} /> EXPLORER <span>app/</span>
          </div>
          <div className="file-tree">
            <div className="tree-root">⌄ app</div>
            <div className="tree-home">
              <Icon name="code" size={14} />
              page.tsx <small>home</small>
            </div>
            {scenarios.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={index === selected}
                className={`file-item ${index === selected ? "selected" : ""}`}
                onClick={() => choose(index)}
              >
                <span className="file-folder">
                  <Icon name="folder" size={15} />
                  {item.file.split("/").slice(0, -1).join("/")}
                </span>
                <span className="file-page">
                  <span>TSX</span>page.tsx
                </span>
              </button>
            ))}
          </div>
          <div className="file-tip">
            <Icon name="check" size={15} />
            <span>
              {t("the_name_comes_from_the_structure_21531f")} {t("no_decorators_or_route_configuration_f98a5f")}
            </span>
          </div>
        </aside>
        <div className="route-panel">
          <div className="panel-title">
            <Icon name="route" size={16} />
            <span className="route-name">{scenario.name}</span>
            <span className="badge">{t(scenario.label)}</span>
          </div>
          <div className="route-controls">
            <div className="fields">
              {scenario.parameter && (
                <label>
                  params.{scenario.parameter}
                  <input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    spellCheck={false}
                    aria-invalid={!!error}
                    aria-describedby={error ? "route-error" : undefined}
                  />
                </label>
              )}
              <label>
                query.tab <span>{t("optional_48a7b8")}</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} spellCheck={false} />
              </label>
              <label>
                hash <span>{t("optional_48a7b8")}</span>
                <input
                  value={hash}
                  placeholder={t("activity_0bf417")}
                  onChange={(event) => setHash(event.target.value)}
                  spellCheck={false}
                />
              </label>
            </div>
          </div>
          <div className="code-area" key={scenario.id + view}>
            <div className="code-toolbar">
              <div className="view-switch" role="group" aria-label={t("integration_example_8bc3e1")}>
                <button type="button" onClick={() => setView("link")} aria-pressed={view === "link"}>
                  next/link
                </button>
                <button type="button" onClick={() => setView("router")} aria-pressed={view === "router"}>
                  router.push
                </button>
              </div>
              <span>TSX</span>
            </div>
            <CodeBlock code={code} language="tsx" lineNumbers label={t("integration_code_d516e0")} />
          </div>
          <div className="url-result">
            <span key={href} className="url-train" aria-hidden="true" />
            <div>
              <span className="eyebrow">{t("generated_url_0eb6e2")}</span>
              {error ? (
                <p id="route-error" role="alert" className="error">
                  {error}
                </p>
              ) : (
                <code className="url-value" aria-live="polite">
                  <FlapText text={href} />
                </code>
              )}
            </div>
            {!error &&
              (view === "link" ? (
                <Link href={href} className="button primary">
                  {t("open_page_9ee309")}
                  <Icon name="arrow" size={16} />
                </Link>
              ) : (
                <button type="button" className="button primary" onClick={() => router.push(href)}>
                  {t("open_page_9ee309")}
                  <Icon name="arrow" size={16} />
                </button>
              ))}
          </div>
          <div className="playground-bottom">
            <span>
              <span className="status-dot" />
              {error ? t("fix_the_parameter_to_navigate_175471") : t("url_generated_by_the_package_in_real_time_5d698f")}
            </span>
            <CopyButton key={code} text={code} />
          </div>
        </div>
      </section>
      <section className="benefits" aria-label={t("why_use_it_8b5b9d")}>
        <article>
          <Icon name="folder" />
          <h3>{t("your_filesystem_is_the_source_4c558c")}</h3>
          <p>{t("create_or_move_a_page_the_manifest_updates_during_devel_8a452c")}</p>
          <code>user/profile → user.profile</code>
        </article>
        <article>
          <Icon name="code" />
          <h3>{t("typescript_has_your_back_45543f")}</h3>
          <p>{t("names_and_parameters_are_inferred_unknown_destinations__c29c8a")}</p>
          <InlineCode code={"route('users.$user', { user: 'ana' })"} />
        </article>
        <article>
          <Icon name="route" />
          <h3>{t("next_stays_next_5708b1")}</h3>
          <p>{t("use_link_router_push_or_a_plain_url_app_router_and_page_349d37")}</p>
          <code>Link · push · replace · redirect</code>
        </article>
      </section>
      <section className="doc-next-steps">
        <h2>{t("build_with_confidence_bba261")}</h2>
        <p>{t("installation_recipes_api_reference_and_troubleshooting_70f255")}</p>
        <Link className="button primary" href={docHref("quick-start")}>
          {t("read_the_documentation_f97432")}
          <Icon name="arrow" size={16} />
        </Link>
      </section>
    </article>
  );
}
