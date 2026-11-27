import type { Metadata } from "next";
import config from "../../docs/locales.json";
import { type Locale } from "./locales";
import { languageAlternates, localizedUrl, seoConfig } from "./seo-urls.mjs";

const ogLocales: Record<Locale, string> = { en: "en_US", pt: "pt_BR", es: "es_ES", ja: "ja_JP" };
const copy = {
  en: { home: ["Named Routes — Type-safe routing for seven JavaScript frameworks", "Generate typed route names, URL parameters and public asset URLs in Next.js, Nuxt, Vue, SvelteKit, Astro, React Router and TanStack Router. Includes CLI and MCP."], docs: ["Documentation", "Learn Named Routes with framework-specific guides, typed URLs, route helpers, assets, CLI commands and AI agent integration."], releases: ["Releases and changelog", "Read Named Routes release notes, new routing features, compatibility changes and migration guidance."], playground: ["Interactive routing playground", "Explore named route conventions, dynamic parameters, locales and URL generation with interactive examples."] },
  pt: { home: ["Named Routes — Rotas tipadas para sete frameworks JavaScript", "Gere nomes de rotas, parâmetros tipados e URLs de assets no Next.js, Nuxt, Vue, SvelteKit, Astro, React Router e TanStack Router. Inclui CLI e MCP."], docs: ["Documentação", "Aprenda Named Routes com guias por framework, URLs tipadas, helpers de rotas, assets, comandos CLI e integração com agentes de IA."], releases: ["Versões e changelog", "Consulte as notas de versão do Named Routes, novos recursos de rotas, mudanças de compatibilidade e orientações de migração."], playground: ["Playground interativo de rotas", "Explore convenções de rotas nomeadas, parâmetros dinâmicos, idiomas e geração de URLs com exemplos interativos."] },
  es: { home: ["Named Routes — Rutas tipadas para siete frameworks JavaScript", "Genera nombres de rutas, parámetros tipados y URLs de assets en Next.js, Nuxt, Vue, SvelteKit, Astro, React Router y TanStack Router. Incluye CLI y MCP."], docs: ["Documentación", "Aprende Named Routes con guías por framework, URLs tipadas, helpers de rutas, assets, comandos CLI e integración con agentes de IA."], releases: ["Versiones y changelog", "Consulta las notas de versión de Named Routes, nuevas funciones, cambios de compatibilidad y guías de migración."], playground: ["Playground interactivo de rutas", "Explora convenciones de rutas con nombre, parámetros dinámicos, idiomas y generación de URLs con ejemplos interactivos."] },
  ja: { home: ["Named Routes — 7つの JavaScript フレームワークの型安全なルーティング", "Next.js、Nuxt、Vue、SvelteKit、Astro、React Router、TanStack Router のルート名、型付きパラメータ、公開アセット URL を生成します。CLI と MCP に対応。"], docs: ["ドキュメント", "フレームワーク別ガイド、型付き URL、ルートヘルパー、アセット、CLI、AI エージェント連携を学びます。"], releases: ["リリースと変更履歴", "Named Routes のリリースノート、新機能、互換性の変更、移行ガイドを確認できます。"], playground: ["インタラクティブなルーティングプレイグラウンド", "名前付きルート、動的パラメータ、ロケール、URL 生成をインタラクティブな例で試せます。"] },
} as const;
const paths = { home: "", docs: "/docs", releases: "/releases", playground: "/playground" } as const;
export function descriptionText(value: string): string {
  const plain = value.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/`|\*\*/g, "").replace(/\s+/g, " ").trim();
  const chars = Array.from(plain);
  if (chars.length <= 175) return plain;
  const short = chars.slice(0, 172).join("");
  const space = short.lastIndexOf(" ");
  return (space > 110 ? short.slice(0, space) : short) + "…";
}
export function pageMetadata(locale: Locale, path: string, title: string, description: string, home = false): Metadata {
  const url = localizedUrl(locale, path);
  const fullTitle = home ? title : `${title} · Named Routes`;
  const summary = descriptionText(description);
  return {
    title: { absolute: fullTitle }, description: summary,
    alternates: { canonical: url, languages: languageAlternates(path, config.locales, config.source) },
    robots: { index: seoConfig.indexable, follow: true },
    openGraph: { type: "website", url, siteName: "Named Routes", title: fullTitle, description: summary, locale: ogLocales[locale], alternateLocale: config.locales.filter(item => item.code !== locale).map(item => ogLocales[item.code as Locale]) },
    twitter: { card: "summary", title: fullTitle, description: summary },
  };
}
export function sectionMetadata(locale: Locale, section: keyof typeof paths): Metadata {
  const [title, description] = copy[locale][section];
  return pageMetadata(locale, paths[section], title, description, section === "home");
}
export function jsonLd(value: object): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
