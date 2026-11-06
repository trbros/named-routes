"use client";
import { createRoutes } from "@triooo/named-routes";
import Link from "../i18n/navigation";
import { type CSSProperties, useState } from "react";
import { docHref } from "../lib/docs";
import { release } from "../lib/release";
import { lines } from "../lib/transit";
import { route, routes } from "../src/routes.generated";
import { BrandMark } from "./brand-mark";
import { CodeBlock, InlineCode } from "./code-block";
import { CopyButton } from "./copy-button";
import { DepartureBoard } from "./departure-board";
import { Icon } from "./icon";
import { TransitMap } from "./transit-map";
import { useSiteLocale } from "./use-site-locale";

const installCommands = {
  npm: "npm i @triooo/named-routes",
  pnpm: "pnpm add @triooo/named-routes",
  yarn: "yarn add @triooo/named-routes",
  bun: "bun add @triooo/named-routes",
} as const;
const proofMessages = {
  next: "real_next_dev_server_3a7c19",
  vite: "real_vite_dev_server_6e2b40",
  demo: "real_demo_build_7b3e2c",
  runtime: "runtime_and_type_tests_2d5e83",
} as const;
const navigateExample = `import { route } from "./routes.generated";

<Link href={route("users.$user", { user: 42 })}>Ana</Link>
// → /users/42 · typo or missing user = type error`;
const examples = [
  { name: "user.profile", parameter: "", initial: "" },
  { name: "users.$user", parameter: "user", initial: "ana" },
  {
    name: "guides.$slug",
    parameter: "slug",
    initial: "getting-started/installation",
  },
] as const;
// File conventions per framework, as inferred by the package's own adapters.
// React Router and TanStack Router name their splat parameter splat/_splat.
const conventions = [
  {
    id: "app",
    localePrefix: "[locale]/",
    label: "App Router",
    dir: "app/",
    files: [
      "user/profile/page.tsx",
      "users/[user]/page.tsx",
      "guides/[[...slug]]/page.tsx",
    ],
  },
  {
    id: "pages",
    localePrefix: "",
    label: "Pages Router",
    dir: "pages/",
    files: ["user/profile.tsx", "users/[user].tsx", "guides/[[...slug]].tsx"],
  },
  {
    id: "nuxt",
    localePrefix: "[locale]/",
    label: "Nuxt",
    dir: "app/pages/",
    files: ["user/profile.vue", "users/[user].vue", "guides/[...slug].vue"],
  },
  {
    id: "vue",
    localePrefix: "[locale]/",
    label: "Vue Router",
    dir: "src/pages/",
    files: ["user/profile.vue", "users/[user].vue", "guides/[...slug].vue"],
  },
  {
    id: "sveltekit",
    localePrefix: "[[locale]]/",
    label: "SvelteKit",
    dir: "src/routes/",
    files: [
      "user/profile/+page.svelte",
      "users/[user]/+page.svelte",
      "guides/[...slug]/+page.svelte",
    ],
  },
  {
    id: "astro",
    localePrefix: "[locale]/",
    label: "Astro",
    dir: "src/pages/",
    files: [
      "user/profile.astro",
      "users/[user].astro",
      "guides/[...slug].astro",
    ],
  },
  {
    id: "react-router",
    localePrefix: "($locale).",
    label: "React Router",
    dir: "app/routes/",
    files: ["user.profile.tsx", "users.$user.tsx", "guides.$.tsx"],
    splat: "splat",
  },
  {
    id: "tanstack",
    localePrefix: "{-$locale}/",
    label: "TanStack",
    dir: "src/routes/",
    files: ["user/profile.tsx", "users/$user.tsx", "guides/$.tsx"],
    splat: "_splat",
  },
] as const;
type Convention = (typeof conventions)[number];
const splatOf = (convention: Convention) =>
  "splat" in convention ? convention.splat : undefined;
// A locale-aware copy of this site's manifest, used only to preview i18n URLs.
const localized = createRoutes(routes, {
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "as-needed",
  },
});
const integrations = {
  next: {
    file: "next.config.ts",
    code: `import { withNamedRoutes } from '@triooo/named-routes/next';\n\nexport default withNamedRoutes({\n  reactStrictMode: true,\n}, {\n  i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" }\n});`,
  },
  vite: {
    file: "vite.config.ts",
    code: `import { defineConfig } from 'vite';\nimport { namedRoutes } from '@triooo/named-routes/vite';\n\n// Nuxt, Vue, SvelteKit, Astro, React Router, TanStack Router\nexport default defineConfig({\n  plugins: [namedRoutes({\n    i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" }\n  })],\n});`,
  },
} as const;
const frameworkList = [
  "Next.js",
  "Nuxt",
  "Vue Router",
  "SvelteKit",
  "Astro",
  "React Router",
  "TanStack Router",
];
export function Landing() {
  const { t } = useSiteLocale();
  const [framework, setFramework] = useState<Convention["id"]>("app");
  const [selected, setSelected] = useState(1);
  const [value, setValue] = useState<string>("ana");
  const [withQuery, setWithQuery] = useState(false);
  const [withLocale, setWithLocale] = useState(true);
  const [target, setTarget] = useState<keyof typeof integrations>("next");
  const [manager, setManager] = useState<keyof typeof installCommands>("npm");
  const convention =
    conventions.find((item) => item.id === framework) ?? conventions[0];
  const example = examples[selected];
  // The URL is identical in every framework; only the splat name differs.
  const splat =
    example.name === "guides.$slug" ? splatOf(convention) : undefined;
  const shownName = splat ? `guides.$${splat}` : example.name;
  const shownParameter = splat ?? example.parameter;
  let href = "",
    error = "";
  const options = {
    ...(withQuery ? { query: { tab: "activity" } } : {}),
    ...(withLocale ? { locale: "pt" as const } : {}),
  };
  // Without a locale, the i18n-aware helper returns the same path as route().
  const helper = localized;
  try {
    switch (example.name) {
      case "user.profile":
        href = helper("user.profile", {}, options);
        break;
      case "users.$user":
        href = helper("users.$user", { user: value }, options);
        break;
      case "guides.$slug":
        href = helper(
          "guides.$slug",
          { slug: value ? value.split("/") : [] },
          options,
        );
        break;
    }
  } catch {
    error = t("enter_a_valid_parameter_standalone_dots_are_not_allowed_b0594f");
  }
  const params = shownParameter
    ? {
      [shownParameter]:
        example.parameter === "slug"
          ? value
            ? value.split("/")
            : []
          : value,
    }
    : {};
  const extras = [
    withQuery ? "query: { tab: 'activity' }" : "",
    withLocale ? "locale: 'pt'" : "",
  ].filter(Boolean);
  const call = `route('${shownName}'${shownParameter || extras.length ? ", " + JSON.stringify(params, null, 2) : ""}${extras.length ? `, { ${extras.join(", ")} }` : ""})`;
  const code = `import { route } from './routes.generated';\n\nconst url = ${call};\n// ${href || "—"}`;
  const integration = integrations[target];
  function choose(index: number) {
    setSelected(index);
    setValue(examples[index].initial);
  }
  return (
    <div className="landing-v1 transit-theme page-enter">
      <section className="v1-hero reference-hero">
        <Link className="v1-announcement" href={route("releases")}>
          <span className="announcement-version">v{release.version}</span>
          <span>{t("named_routes_for_next_js_109bc4")}</span>
          <Icon name="arrow" size={13} />
        </Link>
        <div className="hero-composition">
          <div className="hero-message">
            <h1>
              {t("create_pages_496e41")}
              <br />
              <span>{t("get_named_routes_4f56a4")}</span>
            </h1>
            <p className="v1-hero-copy">
              {t(
                "build_typed_urls_from_the_pages_you_already_create_one__c4d65c",
              )}
            </p>
            <div className="v1-actions">
              <Link className="button primary" href={docHref("quick-start")}>
                {t("get_started_90e40d")}
                <Icon name="arrow" size={15} />
              </Link>
              <Link className="button outline" href={route("playground")}>
                {t("explore_the_playground_b4e944")}
                <Icon name="code" size={15} />
              </Link>
            </div>
            <div className="hero-install">
              <code>
                <span aria-hidden="true">$ </span>npm i @triooo/named-routes
              </code>
              <CopyButton
                text="npm i @triooo/named-routes"
                label={t("copy_install_command_c36ef7")}
              />
            </div>
          </div>
          <DepartureBoard />
        </div>
        <div
          className="line-strip"
          aria-label={t("supported_frameworks_47a1d9")}
        >
          {lines.map((line) => (
            <a
              key={line.id}
              href="#network-title"
              style={{ "--lc": line.color } as CSSProperties}
            >
              <span className="line-dot" aria-hidden="true" />
              {line.framework}
            </a>
          ))}
          <span>i18n</span>
          <span>TypeScript</span>
          <span>{t("no_runtime_dependencies_52f6ed")}</span>
        </div>
      </section>
      <section className="network" data-reveal aria-labelledby="network-title">
        <div className="v1-section-heading">
          <span className="eyebrow justify-center">{t("the_network_a10c3f")}</span>
          <h2 id="network-title">{t("seven_frameworks_one_helper")}</h2>
          <p>{t("map_copy_5e9f04")}</p>
        </div>
        <TransitMap />
      </section>
      <div className="product-intro" data-reveal>
        <div>
          <span className="eyebrow">
            {t("the_filesystem_is_your_api_53b275")}
          </span>
          <h2>{t("follow_a_route_see_it_click_bf4b5a")}</h2>
        </div>
        <p>
          {t("pick_a_page_edit_a_parameter_and_open_the_url_this_is_t_9ee6e5")}
        </p>
      </div>
      <section
        data-reveal
        className="v1-product"
        id="product"
        aria-label={t("interactive_route_discovery_d3c6a3")}
      >
        <div className="workbench-bar">
          <div>
            <BrandMark size={20} />
            <span>
              named-routes / <strong>workbench</strong>
            </span>
          </div>
          <div
            className="router-switch framework-switch"
            role="group"
            aria-label={t("router_convention_486482")}
          >
            {conventions.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={framework === item.id}
                onClick={() => setFramework(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="workbench-status">
            <span className="status-dot" />
            {t("auto_discovered_e0643d")}
          </span>
        </div>
        <div className="workbench-body">
          <aside className="workbench-files">
            <div className="workbench-label">
              <Icon name="folder" size={13} />
              {convention.dir}{withLocale && convention.id === "pages" ? " · i18n" : ""}
            </div>
            {examples.map((item, index) => (
              <button
                key={item.name}
                className={selected === index ? "selected" : ""}
                onClick={() => choose(index)}
                type="button"
                aria-pressed={selected === index}
              >
                <span className="tree-branch" aria-hidden="true" />
                <Icon name="code" size={14} />
                <span>{withLocale ? convention.localePrefix : ""}{convention.files[index]}</span>
              </button>
            ))}
            <div className="filesystem-note">
              <Icon name="check" size={13} />
              <span>{t("your_pages_are_the_source_of_truth_df194d")}</span>
            </div>
          </aside>
          <div className="workbench-engine" aria-hidden="true">
            <svg
              className="engine-lines"
              viewBox="0 0 220 240"
              preserveAspectRatio="none"
            >
              <path d="M0 40C65 40 45 120 110 120M0 120H110M0 200C65 200 45 120 110 120M110 120H220" />
              <path className="engine-signal" d="M0 120H220" />
            </svg>
            <div className="engine-orbit">
              <div className="engine-core">
                <BrandMark size={39} />
              </div>
            </div>
            <span className="engine-caption">discover · infer · generate</span>
          </div>
          <div className="workbench-editor">
            <div className="editor-caption">
              <span>
                <Icon name="code" size={13} />
                navigation.ts
              </span>
              <span>TypeScript</span>
            </div>
            <CodeBlock
              code={code}
              language="ts"
              lineNumbers
              label={t("generated_navigation_code_85a431")}
            />
            <div className="workbench-inputs">
              {example.parameter ? (
                <label>
                  <span>params.{shownParameter}</span>
                  <input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? "preview-error" : undefined}
                    spellCheck={false}
                  />
                </label>
              ) : (
                <span className="no-params">
                  <Icon name="check" size={13} />
                  {t("no_parameters_required_3212e7")}
                </span>
              )}
              <button
                type="button"
                className="query-toggle"
                aria-pressed={withQuery}
                onClick={() => setWithQuery(!withQuery)}
              >
                <span className="toggle-box">
                  {withQuery && <Icon name="check" size={11} />}
                </span>
                query.tab
              </button>
              <button
                type="button"
                className="query-toggle"
                aria-pressed={withLocale}
                onClick={() => setWithLocale(!withLocale)}
              >
                <span className="toggle-box">
                  {withLocale && <Icon name="check" size={11} />}
                </span>
                locale: pt
              </button>
            </div>
          </div>
        </div>
        <div className="workbench-output">
          <div className="output-name">
            <span className="workbench-label">{t("inferred_name_30c43b")}</span>
            <code key={shownName}>{shownName}</code>
          </div>
          <Icon name="arrow" size={19} />
          <div className="output-url">
            <span className="workbench-label">{t("generated_url_0eb6e2")}</span>
            {error ? (
              <p className="error" id="preview-error" role="alert">
                {error}
              </p>
            ) : (
              <code key={href}>{href}</code>
            )}
          </div>
          {!error && (
            <Link className="output-open" href={withLocale ? href.replace(/^\/pt(?=\/|$)/, "") || "/" : href} locale={withLocale ? "pt" : undefined}>
              {t("follow_route_57b1dd")}
              <Icon name="arrow" size={14} />
            </Link>
          )}
        </div>
        <div className="workbench-foot">
          <span>
            {t(
              "live_url_generation_router_tabs_demonstrate_equivalent__6b179a",
            )}
          </span>
          <CopyButton text={code} />
        </div>
      </section>
      <section className="v1-principles" data-reveal>
        <div>
          <Icon name="folder" size={16} />
          <span>{t("filesystem_first_1314c3")}</span>
        </div>
        <div>
          <Icon name="code" size={16} />
          <span>{t("types_included_ff87b3")}</span>
        </div>
        <div>
          <Icon name="route" size={16} />
          <span>{t("client_server_6d11ba")}</span>
        </div>
        <div>
          <Icon name="check" size={16} />
          <span>{t("no_runtime_dependencies_52f6ed")}</span>
        </div>
      </section>
      <section className="v1-features" data-reveal>
        <div className="v1-section-heading">
          <span className="eyebrow justify-start">
            {t("built_around_your_codebase_2be038")}
          </span>
          <h2>
            {t("less_to_keep_in_sync_8feaff")}
            <br />
            <span>{t("more_room_to_build_a77ed7")}</span>
          </h2>
          <p>
            {t(
              "keep_next_js_in_charge_of_routing_bring_names_types_and_12a9cc",
            )}
          </p>
        </div>
        <div className="v1-feature-grid">
          <article className="feature-wide">
            <div className="feature-copy">
              <Icon name="folder" />
              <h3>{t("a_new_page_is_a_new_named_route_54ff58")}</h3>
              <p>
                {t(
                  "static_pages_dynamic_parameters_and_catch_all_paths_nam_5af155",
                )}
              </p>
              <Link href={docHref("naming")}>
                {t("explore_discovery_bfdf9a")}
                <Icon name="arrow" size={13} />
              </Link>
            </div>
            <div className="discovery-map">
              {[
                ["app/page.tsx", "home"],
                ["app/user/profile/page.tsx", "user.profile"],
                ["app/users/[user]/page.tsx", "users.$user"],
                ["app/guides/[[...slug]]/page.tsx", "guides.$slug"],
              ].map(([file, name]) => (
                <div key={file}>
                  <code>{file}</code>
                  <Icon name="arrow" size={13} />
                  <code>{name}</code>
                </div>
              ))}
            </div>
          </article>
          <article className="feature-types">
            <div className="feature-copy">
              <Icon name="code" />
              <h3>{t("intent_the_editor_understands_01b68a")}</h3>
              <p>
                {t(
                  "route_names_and_parameter_shapes_are_inferred_a_missing_107b06",
                )}
              </p>
            </div>
            <div className="type-preview">
              <CodeBlock
                code={`route('users.$user', { user: 42 });\n\n// @ts-expect-error: missing user\nroute('users.$user');`}
                language="ts"
                label={t("type_checking_example_afbf91")}
              />
              <span>
                <Icon name="code" size={13} />
                {t("checked_by_typescript_01da4d")}
              </span>
            </div>
          </article>
          <article className="feature-urls">
            <div className="feature-copy">
              <Icon name="route" />
              <h3>{t("small_api_complete_urls_b63a38")}</h3>
              <p>
                {t(
                  "encoded_parameters_repeated_queries_fragments_and_optio_58f37c",
                )}
              </p>
            </div>
            <CodeBlock
              code={`route('users.$user', { user: 'ana' }, {\n  query: { tab: 'activity' },\n  hash: 'recent',\n});\n// /users/ana?tab=activity#recent`}
              language="ts"
              label={t("url_options_example_1c2cf1")}
            />
          </article>
          <article className="feature-routers">
            <div className="feature-copy">
              <Icon name="grid" />
              <h3>{t("one_helper_both_routers_bceab7")}</h3>
              <p>
                {t(
                  "use_existing_next_link_push_replace_and_redirect_apis_y_49e45b",
                )}
              </p>
            </div>
            <ul className="framework-grid">
              {frameworkList.map((name) => (
                <li key={name}>
                  <Icon name="route" size={13} />
                  {name}
                </li>
              ))}
              <li>
                <Icon name="code" size={13} />
                {t("manual_routes_7c41d2")}
              </li>
            </ul>
          </article>
          <article className="feature-routers feature-locales">
            <div className="feature-copy">
              <Icon name="grid" />
              <h3>{t("locale_aware_from_v1_0b7e5f")}</h3>
              <p>
                {t("locales_prefixes_localized_pathnames_and_domains_f3c2d1")}
              </p>
              <Link href={docHref("i18n")}>
                {t("explore_i18n_5d2e8a")}
                <Icon name="arrow" size={13} />
              </Link>
            </div>
            <CodeBlock
              code={`// app/[locale]/about/page.tsx → about\n// pathnames: { '/about': { pt: '/sobre' } }\nroute('about');                       // /about\nroute('about', {}, { locale: 'pt' }); // /pt/sobre\nroute.forLocale('pt')('users.$user', { user: 42 });\n// /pt/users/42`}
              language="ts"
              label={t("locale_example_9b14c6")}
            />
          </article>
        </div>
      </section>
      <section className="where" data-reveal aria-labelledby="where-title">
        <div className="v1-section-heading">
          <span className="eyebrow">{t("where_it_runs_4e1b0a")}</span>
          <h2 id="where-title">{t("honest_compatibility_7a2c90")}</h2>
          <p>{t("where_copy_3d8b21")}</p>
        </div>
        <div className="where-table" role="table" aria-labelledby="where-title">
          <div className="where-row where-head" role="row">
            <span role="columnheader">Framework</span>
            <span role="columnheader">{t("discovers_5c0e7f")}</span>
            <span role="columnheader">{t("connect_with_9b3d14")}</span>
            <span role="columnheader">{t("verified_by_2e6a58")}</span>
          </div>
          {lines.map((line, index) => (
            <div
              key={line.id}
              className="where-row"
              role="row"
              style={{ "--lc": line.color, "--n": index } as CSSProperties}
            >
              <span role="cell" className="where-framework">
                <span className="line-dot" aria-hidden="true" />
                <Link href={docHref(line.docId)}>{line.framework}</Link>
              </span>
              <span role="cell">
                <code>{line.scans}</code>
              </span>
              <span role="cell">
                <code>{line.connect}</code>
                <small>{line.connectWhere}</small>
              </span>
              <span
                role="cell"
                className={`where-proof proof-${line.verified}`}
              >
                {t(proofMessages[line.verified])}
              </span>
            </div>
          ))}
          <div
            className="where-row"
            role="row"
            style={{ "--lc": "var(--muted)" } as CSSProperties}
          >
            <span role="cell" className="where-framework">
              <span className="line-dot is-manual" aria-hidden="true" />
              {t("manual_routes_7c41d2")}
            </span>
            <span role="cell">
              <code>React, Vue, …</code>
            </span>
            <span role="cell">
              <code>createRoutes()</code>
              <small>{t("your_code_8a1f3e")}</small>
            </span>
            <span role="cell" className="where-proof proof-runtime">
              {t(proofMessages.runtime)}
            </span>
          </div>
        </div>
        <p className="where-note">{t("where_footnote_6f9c02")}</p>
      </section>
      <section className="journey" data-reveal aria-labelledby="journey-title">
        <div className="v1-section-heading">
          <span className="eyebrow">{t("three_stops_1c8e4d")}</span>
          <h2 id="journey-title">{t("from_install_to_first_link_0b7a65")}</h2>
          <p>
            {t(
              "wrap_the_existing_configuration_the_manifest_is_generat_280dc6",
            )}
          </p>
        </div>
        <ol className="journey-stops">
          <li data-reveal>
            <span className="stop-number">01</span>
            <h3>{t("stop_install_4a9d20")}</h3>
            <div
              className="router-switch"
              role="group"
              aria-label={t("package_manager_7e3b81")}
            >
              {(
                Object.keys(installCommands) as (keyof typeof installCommands)[]
              ).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={manager === item}
                  onClick={() => setManager(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="journey-command">
              <div className="flex min-w-0 items-center gap-2">
                <span aria-hidden="true">$</span>
                <InlineCode key={manager} code={installCommands[manager]} language="bash" />
              </div>
              <CopyButton
                text={installCommands[manager]}
                label={t("copy_install_command_c36ef7")}
              />
            </div>
          </li>
          <li data-reveal>
            <span className="stop-number">02</span>
            <h3>{t("stop_connect_6b2f19")}</h3>
            <div
              className="router-switch"
              role="group"
              aria-label={t("integration_target_9a3c51")}
            >
              {(["next", "vite"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={target === item}
                  onClick={() => setTarget(item)}
                >
                  {item === "next" ? "Next.js" : "Vite"}
                </button>
              ))}
            </div>
            <div className="journey-code">
              <div className="editor-caption">
                <span>
                  <Icon name="code" size={14} />
                  {integration.file}
                </span>
                <CopyButton text={integration.code} />
              </div>
              <CodeBlock
                key={target}
                code={integration.code}
                language="ts"
                label={
                  target === "next"
                    ? t("next_integration_840bc7")
                    : t("vite_integration_4b7d0e")
                }
              />
            </div>
          </li>
          <li data-reveal>
            <span className="stop-number">03</span>
            <h3>{t("stop_navigate_3c7e52")}</h3>
            <p>{t("stop_navigate_copy_8d4a17")}</p>
            <div className="journey-code">
              <CodeBlock
                code={navigateExample}
                language="tsx"
                label={t("usage_example_3439e8")}
              />
            </div>
            <Link className="text-link" href={docHref("quick-start")}>
              {t("start_the_setup_c5c38e")}
              <Icon name="arrow" size={15} />
            </Link>
          </li>
        </ol>
      </section>
      <section className="v1-release-strip" data-reveal>
        <div className="release-emblem">
          <BrandMark size={40} />
          <span>{release.version.split(".").slice(0, 2).join(".")}</span>
        </div>
        <div>
          <p className="eyebrow">{t("ready_for_the_next_chapter_396bf5")}</p>
          <h2>{t("a_contract_you_can_build_on_e918ee")}</h2>
          <p>
            {t(
              "automatic_names_typed_parameters_and_one_consistent_api_7adfde",
            )}
          </p>
        </div>
        <Link className="button outline" href={route("releases")}>
          {t("explore_v1_f38096")}
          <Icon name="arrow" size={15} />
        </Link>
      </section>
      <section className="v1-faq" data-reveal>
        <div className="v1-section-heading">
          <span className="eyebrow">{t("a_few_details_2329b8")}</span>
          <h2>{t("before_your_first_route_4f7b2f")}</h2>
          <p>{t("before_your_first_route_description")}</p>
        </div>
        <div>
          {[
            [
              t("which_frameworks_are_supported_51c0de"),
              t("next_js_app_and_pages_router_nuxt_vue_router_fil_7e2b44"),
            ],
            [
              t("does_it_work_with_next_intl_8d1f03"),
              t("yes_configure_locales_once_or_pass_your_next_intl_r_2a9c77"),
            ],
            [
              t("does_this_replace_the_next_js_router_1912ac"),
              t(
                "no_the_package_generates_url_strings_next_js_continues__8056c6",
              ),
            ],
            [
              t("do_i_need_to_name_my_pages_manually_c0bed1"),
              t(
                "no_names_follow_url_segments_optional_overrides_let_you_962667",
              ),
            ],
            [
              t("what_is_the_v1_compatibility_baseline_e5d6a5"),
              t(
                "node_js_20_19_typescript_5_and_tested_next_16_examples__e894a7",
              ),
            ],
            [
              t("how_do_i_add_it_to_my_project_c05b23"),
              t(
                "install_triooo_next_named_routes_with_your_package_mana_ee766b",
              ),
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="v1-final" data-reveal>
        <div className="final-lines" aria-hidden="true" />
        <BrandMark size={44} />
        <h2>{t("give_your_next_route_a_name_462907")}</h2>
        <p>
          {t("see_the_filesystem_become_an_api_then_try_it_in_your_pr_1a564d")}
        </p>
        <div className="v1-actions">
          <Link className="button primary" href={route("playground")}>
            {t("try_it_live_ab45c9")}
            <Icon name="arrow" size={16} />
          </Link>
          <Link className="button outline" href={route("docs.$slug")}>
            {t("read_the_guide_b0fb2e")}
          </Link>
        </div>
        <code>{release.name}</code>
      </section>
    </div>
  );
}
