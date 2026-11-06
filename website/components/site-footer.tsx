"use client";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { docHref } from "../lib/docs";
import { release } from "../lib/release";
import { lines } from "../lib/transit";
import { route } from "../src/routes.generated";
import { BrandMark } from "./brand-mark";
import { CopyButton } from "./copy-button";
import { useSiteLocale } from "./use-site-locale";

const NPM_URL = `https://www.npmjs.com/package/${release.name}`;

export function SiteFooter() {
  const { t } = useSiteLocale();
  const columns = [
    {
      title: t("product_dd3b86"),
      links: [
        { href: route("home"), label: t("overview_0efc2e") },
        { href: route("playground"), label: "Playground" },
        { href: route("releases"), label: t("releases_8fa41d") },
        { href: docHref("demos"), label: t("demos_3b8e1f") },
      ],
    },
    {
      title: t("documentation_9e9cf3"),
      links: [
        { href: docHref("quick-start"), label: t("quick_start_b342f0") },
        { href: docHref("frameworks"), label: t("frameworks_5c4d20") },
        { href: docHref("i18n"), label: "i18n" },
        { href: docHref("runtime-api"), label: t("reference_db1c78") },
      ],
    },
    {
      title: t("project_title_8d7f3a"),
      links: [
        { href: release.githubUrl, label: "GitHub", external: true },
        { href: NPM_URL, label: "npm", external: true },
        { href: docHref("contributing"), label: t("contributing_1e9b47") },
        { href: docHref("versioning"), label: t("versioning_6a0f58") },
      ],
    },
  ];
  return (
    <footer className="site-footer institutional-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href={route("home")} className="brand">
            <BrandMark size={34} />
            <span>
              NamedRoutes
              <small>v{release.version}</small>
            </span>
          </Link>
          <p>{t("footer_mission_2f6b19")}</p>
          <div className="footer-install">
            <code>
              <span aria-hidden="true">$ </span>npm i {release.name}
            </code>
            <CopyButton text={`npm i ${release.name}`} label={t("copy_install_command_c36ef7")} />
          </div>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="footer-column">
            <h2>{column.title}</h2>
            {column.links.map((link) =>
              "external" in link ? (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        ))}
        <div className="footer-column footer-lines">
          <h2>{t("frameworks_5c4d20")}</h2>
          <ul>
            {lines.map((line) => (
              <li key={line.id} style={{ "--lc": line.color } as CSSProperties}>
                <span className="line-dot" aria-hidden="true" />
                <Link href={docHref(line.docId)}>{line.framework}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-legal">
        <div className="footer-inner">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} triooo · {t("released_under_apache_9c1e72")}
          </span>
          <span className="footer-legal-meta">
            <code>{release.name}</code>
            <a className="footer-maker" href="https://triooo.com.br" target="_blank" rel="noreferrer" aria-label={t("built_by_triooo_6a0bf7")}>
              <span>{t("built_by_5d150c")}</span>
              <Image loading="eager" className="triooo-light" src="/brand/triooo-light.svg" alt="triooo" width={84} height={23} />
              <Image loading="eager" className="triooo-dark" src="/brand/triooo-dark.svg" alt="triooo" width={84} height={23} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
