"use client";
import { createRoutes } from "@triooo/named-routes";
import { useState } from "react";
import { CodeBlock, InlineCode } from "./code-block";
import { Icon } from "./icon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { useSiteLocale } from "./use-site-locale";

type Field = "id" | "lang" | "url" | "asset" | "page";
type Option = "strict" | "version" | "absolute" | "includeBase";
/** Each helper lists the inputs and options it reads, so only those are shown. */
const groups = {
  helpers_group_routes: {
    "route()": ["id", "lang", "absolute", "includeBase"],
    "route.has()": [],
    "route.names()": [],
    "route.pattern()": ["lang"],
    "route.withQuery()": ["url", "page"],
    "route.withDefaults()": ["lang"],
  },
  helpers_group_assets: {
    "asset()": ["asset", "version", "absolute", "strict"],
    "asset.has()": ["asset", "strict"],
    "asset.paths()": [],
    "asset.info()": ["asset"],
  },
  helpers_group_i18n: {
    "route.localize()": ["url", "lang"],
    "route.forLocale()": ["lang"],
    "route.locales()": [],
    "route.canonical()": ["lang"],
    "route.alternates()": [],
  },
  helpers_group_reverse: {
    "route.match()": ["url"],
    "route.is()": ["url"],
    "route.breadcrumbs()": ["url"],
    "route.parseQuery()": ["url"],
  },
} as const satisfies Record<string, Record<string, readonly (Field | Option)[]>>;
type Action = { [G in keyof typeof groups]: keyof (typeof groups)[G] }[keyof typeof groups];
const uses = Object.assign({}, ...Object.values(groups)) as Record<Action, readonly (Field | Option)[]>;

const routeTable = { about: "/about", products: "/products", "users.show": "/users/[id]" };
// Illustrative metadata, not a scan of the website's own public directory.
const files = { "images/logo.svg": { version: "a8f32c910123", size: 64 }, "fonts/inter.woff2": { version: "aabbccddeeff", size: 1024 } };

export function HelpersPlayground() {
  const { t } = useSiteLocale();
  const [action, setAction] = useState<Action>("route()");
  const [basePath, setBasePath] = useState("/app");
  const [origin, setOrigin] = useState("https://example.com");
  const [assetBase, setAssetBase] = useState("");
  const [lang, setLang] = useState<"en" | "pt">("pt");
  const [id, setId] = useState("42");
  const [url, setUrl] = useState("/products?page=1&category=books#list");
  const [path, setPath] = useState("images/logo.svg");
  const [page, setPage] = useState("2");
  const [options, setOptions] = useState<Record<Option, boolean>>({ strict: true, version: false, absolute: false, includeBase: true });
  const [copied, setCopied] = useState(false);
  const { strict, version, absolute, includeBase } = options;
  const used = new Set<Field | Option>(uses[action]);
  const common = { locale: lang, absolute, basePath: includeBase };
  const q = JSON.stringify;
  const snippets: Record<Action, string> = {
    "route()": `route("users.show", { id: ${q(id)} }, ${q(common)})`,
    "asset()": `asset(${q(path)}, ${q({ version, absolute })})`,
    "asset.has()": `asset.has(${q(path)})`,
    "asset.paths()": "asset.paths()",
    "asset.info()": `asset.info(${q(path)})`,
    "route.withQuery()": `route.withQuery(${q(url)}, { page: ${q(page)} })`,
    "route.localize()": `route.localize(${q(url)}, ${q(lang)})`,
    "route.match()": `route.match(${q(url)})`,
    "route.parseQuery()": `route.parseQuery("products", ${q(url)})`,
    "route.canonical()": `route.canonical("about", {}, { locale: ${q(lang)} })`,
    "route.alternates()": `route.alternates("about")`,
    "route.withDefaults()": `route
  .withDefaults({ origin: "https://tenant.example.com", basePath: "/dashboard" })
  .canonical("about", {}, { locale: ${q(lang)} })`,
    "route.is()": `route.is("products", ${q(url)})`,
    "route.breadcrumbs()": `route.breadcrumbs(${q(url)})`,
    "route.forLocale()": `route.forLocale(${q(lang)})("about")`,
    "route.has()": `route.has("about")`,
    "route.names()": "route.names()",
    "route.pattern()": `route.pattern("about", ${q(lang)})`,
    "route.locales()": "route.locales()",
  };
  const config = {
    basePath,
    origin,
    ...(assetBase ? { assetBase } : {}),
    i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "always", pathnames: { "/about": { pt: "/sobre" } } },
    assetManifest: { strict, files },
  };
  let output = "";
  let error = false;
  try {
    const route = createRoutes(routeTable, config as Parameters<typeof createRoutes>[1]);
    const run = () => {
      switch (action) {
        case "route()": return route("users.show", { id }, common);
        case "asset()": return route.asset(path, { version, absolute });
        case "asset.has()": return route.asset.has(path);
        case "asset.paths()": return route.asset.paths();
        case "asset.info()": return route.asset.info(path);
        case "route.withQuery()": return route.withQuery(url, { page });
        case "route.localize()": return route.localize(url, lang);
        case "route.match()": return route.match(url);
        case "route.parseQuery()": return route.parseQuery("products", url);
        case "route.canonical()": return route.canonical("about", {}, { locale: lang });
        case "route.alternates()": return route.alternates("about");
        case "route.withDefaults()": return route.withDefaults({ origin: "https://tenant.example.com", basePath: "/dashboard" }).canonical("about", {}, { locale: lang });
        case "route.is()": return route.is("products", url);
        case "route.breadcrumbs()": return route.breadcrumbs(url);
        case "route.forLocale()": return route.forLocale(lang)("about");
        case "route.has()": return route.has("about");
        case "route.names()": return route.names();
        case "route.pattern()": return route.pattern("about", lang);
        case "route.locales()": return route.locales();
      }
    };
    const result = run();
    output = typeof result === "string" ? q(result) : (q(result, null, 2) ?? "undefined");
  } catch (caught) {
    error = true;
    output = caught instanceof Error ? caught.message : String(caught);
  }
  const text = (field: Field, label: string, value: string, set: (next: string) => void, placeholder?: string) =>
    used.has(field) && (
      <div className="grid min-w-0 gap-2" key={field}>
        <Label htmlFor={`helpers-${field}`} className="font-mono text-[11px] font-normal text-muted-foreground">
          {label}
        </Label>
        <Input
          id={`helpers-${field}`}
          value={value}
          placeholder={placeholder}
          spellCheck={false}
          onChange={(event) => set(event.target.value)}
          className="h-9 bg-background font-mono text-xs md:text-xs"
        />
      </div>
    );
  const toggles: [Option, string][] = [
    ["strict", t("helpers_strict")],
    ["version", t("helpers_version")],
    ["absolute", t("helpers_absolute")],
    ["includeBase", t("helpers_include_base")],
  ];
  const visibleToggles = toggles.filter(([key]) => used.has(key));
  const inputs = [
    text("id", t("helpers_id"), id, setId),
    used.has("lang") && (
      <div className="grid min-w-0 gap-2" key="lang">
        <Label htmlFor="helpers-lang" className="font-mono text-[11px] font-normal text-muted-foreground">
          {t("helpers_lang")}
        </Label>
        <Select value={lang} onValueChange={(next) => setLang(next as "en" | "pt")}>
          <SelectTrigger id="helpers-lang" className="h-9 w-full bg-background font-mono text-xs md:text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en" className="font-mono text-xs md:text-xs">en</SelectItem>
            <SelectItem value="pt" className="font-mono text-xs md:text-xs">pt</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ),
    text("url", t("helpers_url"), url, setUrl),
    text("asset", t("helpers_asset"), path, setPath),
    text("page", "query.page", page, setPage),
  ].filter(Boolean);
  return (
    <section className="playground-story helpers-lab" aria-labelledby="helpers-lab-title">
      <h2 id="helpers-lab-title">{t("helpers_title")}</h2>
      <p>{t("helpers_intro")}</p>
      <div className="route-panel">
        <div className="panel-title flex-wrap gap-3">
          <Icon name="route" size={16} />
          <Label htmlFor="helpers-action" className="sr-only">
            {t("helpers_helper")}
          </Label>
          <Select
            value={action}
            onValueChange={(next) => {
              setAction(next as Action);
              setCopied(false);
            }}
          >
            <SelectTrigger id="helpers-action" className="h-9 min-w-56 bg-background font-mono text-xs md:text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {Object.entries(groups).map(([group, items]) => (
                <SelectGroup key={group}>
                  <SelectLabel className="font-mono text-[10px] uppercase tracking-wider">{t(group)}</SelectLabel>
                  {Object.keys(items).map((item) => (
                    <SelectItem key={item} value={item} className="font-mono text-xs md:text-xs">
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          <span className="badge">{t(Object.entries(groups).find(([, items]) => action in items)?.[0] ?? "")}</span>
        </div>
        <div className="route-controls grid gap-5">
          <fieldset className="m-0 grid min-w-0 gap-3 rounded-lg border border-border p-4 pt-1">
            <legend className="px-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{t("helpers_deployment")}</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["base", t("helpers_base"), basePath, setBasePath, ""],
                ["origin", t("helpers_origin"), origin, setOrigin, ""],
                ["cdn", t("helpers_cdn"), assetBase, setAssetBase, "https://cdn.example.com"],
              ].map(([key, label, value, set, placeholder]) => (
                <div className="grid min-w-0 gap-2" key={key as string}>
                  <Label htmlFor={`helpers-${key}`} className="font-mono text-[11px] font-normal text-muted-foreground">
                    {label as string}
                  </Label>
                  <Input
                    id={`helpers-${key}`}
                    value={value as string}
                    placeholder={placeholder as string}
                    spellCheck={false}
                    onChange={(event) => (set as (next: string) => void)(event.target.value)}
                    className="h-9 bg-background font-mono text-xs md:text-xs"
                  />
                </div>
              ))}
            </div>
          </fieldset>
          {(inputs.length > 0 || visibleToggles.length > 0) && (
            <fieldset className="m-0 grid min-w-0 gap-3 rounded-lg border border-border p-4 pt-1">
              <legend className="px-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{t("helpers_inputs")}</legend>
              {inputs.length > 0 && <div className="grid gap-3 sm:grid-cols-2">{inputs}</div>}
              {visibleToggles.length > 0 && (
                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1">
                  {visibleToggles.map(([key, label]) => (
                    <div className="flex items-center gap-2" key={key}>
                      <Switch
                        id={`helpers-${key}`}
                        checked={options[key]}
                        onCheckedChange={(checked) => setOptions((current) => ({ ...current, [key]: checked }))}
                      />
                      <Label htmlFor={`helpers-${key}`} className="text-sm font-normal">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </fieldset>
          )}
          <p className="m-0 text-xs text-muted-foreground">{t("helpers_manifest_note")}</p>
        </div>
        <div className="code-area">
          <div className="code-toolbar">
            <span>{t("helpers_call")}</span>
            <span>TS</span>
          </div>
          <CodeBlock code={snippets[action]} language="ts" label={t("helpers_call")} />
        </div>
        <div className="code-area" data-error={error || undefined}>
          <div className="code-toolbar">
            <span>{error ? t("helpers_error") : t("helpers_output")}</span>
            <span>{error ? "Error" : "JSON"}</span>
          </div>
          <div role="status" aria-live="polite">
            <CodeBlock code={output} language={error ? "text" : "json"} label={t("helpers_output")} />
          </div>
        </div>
        <div className="playground-bottom">
          <span>
            <span className="status-dot" />
            {t("helpers_audit")} <InlineCode code="npx @triooo/named-routes audit --strict" />
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(output);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            <Icon name={copied ? "check" : "copy"} size={15} />
            {t("helpers_copy")}
          </Button>
        </div>
      </div>
    </section>
  );
}
