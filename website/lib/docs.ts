import content from "../../docs/content.json";
import { route } from "../src/routes.generated";
export const docSections = content;
export const docGroups = [
  {
    id: "start",
    title: { en: "Getting started", pt: "Primeiros passos", es: "Primeros pasos", ja: "はじめに" },
    items: ["overview", "comparison", "installation", "quick-start", "naming"],
  },
  {
    id: "frameworks",
    title: { en: "Frameworks", pt: "Frameworks", es: "Frameworks", ja: "フレームワーク" },
    items: [
      "frameworks",
      "nextjs",
      "nuxt",
      "vue",
      "sveltekit",
      "astro",
      "react-router",
      "tanstack-router",
      "manual-routes",
    ],
  },
  {
    id: "use",
    title: { en: "Build with routes", pt: "Desenvolva com rotas", es: "Construye con rutas", ja: "ルートで構築する" },
    items: [
      "app-router",
      "pages-router",
      "parameters",
      "query-hash",
      "base-path",
      "i18n",
      "typescript",
    ],
  },
  {
    id: "reference",
    title: { en: "API reference", pt: "Referência da API", es: "Referencia de la API", ja: "API リファレンス" },
    items: ["runtime-api", "configuration", "stable-names", "generator-api"],
  },
  {
    id: "advanced",
    title: { en: "Guides", pt: "Guias", es: "Guías", ja: "ガイド" },
    items: ["discovery", "development", "cli", "errors", "boundaries"],
  },
  {
    id: "project",
    title: { en: "Project", pt: "Projeto", es: "Proyecto", ja: "プロジェクト" },
    items: ["website", "demos", "contributing", "versioning"],
  },
] as const;
export function docHref(id?: string, hash?: string) {
  return route("docs.$slug", { slug: id ? [id] : [] }, { hash });
}
export function getDoc(id?: string) {
  return docSections.find((section) => section.id === id);
}
