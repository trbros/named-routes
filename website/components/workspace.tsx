"use client";
import Link from "../i18n/navigation";
import { usePathname } from "../i18n/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { docHref } from "../lib/docs";
import { release } from "../lib/release";
import { route, routes } from "../src/routes.generated";
import { BrandMark } from "./brand-mark";
import { DocsSearch } from "./docs-search";
import { Icon } from "./icon";
import { SiteFooter } from "./site-footer";
import { useSiteLocale } from "./use-site-locale";
import { locales, localeNames } from "../lib/locales";

/** Real pages of this site, reached through route() like any app would. */
const explore = [
  { message: "playground_a68eb2", routeName: "playground", href: route("playground") },
  { message: "profile_ff4fc0", routeName: "user.profile", href: route("user.profile") },
  { message: "dynamic_user_bfb407", routeName: "users.$user", href: route("users.$user", { user: "ana" }) },
  { message: "project_f6f4da", routeName: "projects.$project", href: route("projects.$project", { project: "triooo" }) },
  { message: "catch_all_example_c17a64", routeName: "guides.$slug", href: route("guides.$slug", { slug: ["getting-started", "installation"] }) },
  { message: "releases_8fa41d", routeName: "releases", href: route("releases") },
] as const;

type Section = "home" | "docs" | "explore" | "content";

function SiteHeader({ section }: { section: Section }) {
  const { t, locale, setLocale, pending, error } = useSiteLocale();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const light = mounted && resolvedTheme === "light";
  const nav = [
    { href: docHref(), label: t("documentation_9e9cf3"), active: section === "docs" },
    { href: route("playground"), label: t("playground_a68eb2"), active: pathname === route("playground") },
    { href: route("releases"), label: t("releases_8fa41d"), active: pathname === route("releases") },
  ];
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-brand">
          <Link className="brand" href={route("home")}>
            <BrandMark size={30} />
            <span>
              NamedRoutes
              <small>{t("by_triooo_d1b51e")}</small>
            </span>
          </Link>
          <Link className="doc-version-pill" href={route("releases")}>
            v{release.version}
          </Link>
        </div>
        <nav className="site-nav" aria-label={t("main_navigation_efd197")}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={item.active ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
          <a href={release.githubUrl} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
        {section !== "home" && <DocsSearch />}
        <div className="header-actions">
          <div className="language-switch" aria-busy={pending} role="group" aria-label={t("language_89b86a")}>
            {locales.map((item) => (
              <button
                key={item}
                type="button"
                lang={item}
                title={localeNames[item]}
                aria-label={localeNames[item]}
                disabled={pending}
                aria-pressed={locale === item}
                onClick={() => setLocale(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          {error && (
            <span className="locale-error" role="alert">
              {t("language_change_error")}
            </span>
          )}
          <button
            type="button"
            className="icon-button"
            aria-label={light ? t("switch_to_dark_theme_5ec71e") : t("switch_to_light_theme_f90085")}
            disabled={!mounted}
            onClick={() => setTheme(light ? "dark" : "light")}
          >
            <Icon name={light ? "moon" : "sun"} />
          </button>
        </div>
      </div>
    </header>
  );
}

function ExploreSide() {
  const { t } = useSiteLocale();
  const pathname = usePathname();
  return (
    <aside className="doc-side explore-side">
      <div className="doc-primary-links">
        <Link href={docHref()}>
          <Icon name="book" size={17} />
          {t("documentation_9e9cf3")}
        </Link>
        <a href={release.githubUrl} target="_blank" rel="noreferrer">
          <Icon name="code" size={17} />
          GitHub<small>trbros ↗</small>
        </a>
      </div>
      <nav className="doc-topic-nav" aria-label={t("demo_navigation_a80618")}>
        <details open>
          <summary>
            {t("explore_in_practice_7d9fac")}
            <Icon name="chevron" size={13} />
          </summary>
          <div>
            {explore.map((item) => {
              const pattern = route.pattern(item.routeName);
              const base = pattern.split("/[")[0];
              const active = pattern.includes("[")
                ? pathname === base || pathname.startsWith(`${base}/`)
                : pathname === pattern;
              return (
                <Link key={item.routeName} href={item.href} data-doc-nav aria-current={active ? "page" : undefined}>
                  <span>{t(item.message)}</span>
                  <small>{item.routeName}</small>
                </Link>
              );
            })}
          </div>
        </details>
      </nav>
      <div className="doc-help-card explore-card">
        <Icon name="check" size={18} />
        <strong>{t("automatic_discovery_97f90e")}</strong>
        <p>
          {Object.keys(routes).length} {t("pages_no_manual_names_1aef63")}
        </p>
      </div>
    </aside>
  );
}

export function Workspace({ children, section }: { children: React.ReactNode; section: Section }) {
  const { t } = useSiteLocale();
  const skip = (
    <a className="skip" href="#main">
      {t("skip_to_content_0a4470")}
    </a>
  );
  if (section === "home")
    return (
      <div className="workspace landing-workspace site-shell">
        {skip}
        <SiteHeader section={section} />
        <div className="landing-main">
          <main id="main">{children}</main>
        </div>
        <SiteFooter />
      </div>
    );
  return (
    <div className="workspace reference-docs site-shell">
      {skip}
      <SiteHeader section={section} />
      <div className="doc-window">
        {section !== "explore" ? (
          <main id="main">{children}</main>
        ) : (
          <div className="reference-grid explore-grid">
            <ExploreSide />
            <main id="main" className="explore-main">
              {children}
            </main>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
