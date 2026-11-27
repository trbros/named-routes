# Idiomas e i18n

[Documentação](index.md) / [Internacionalização](internationalization.md)

[English](../en/topic-i18n.md) · [Português](../pt/topic-i18n.md) · [Español](../es/topic-i18n.md) · [日本語](../ja/topic-i18n.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="i18n"></a>

Configure i18n com locales, defaultLocale e, opcionalmente, localePrefix, pathnames e domains. O formato é o mesmo do defineRouting() do next-intl, então você pode passar esse objeto de routing diretamente; chaves exclusivas do next-intl, como localeCookie, são aceitas e ignoradas. Em projetos Next.js com Pages Router, o withNamedRoutes herda automaticamente o i18n do next.config (localePrefix as-needed, incluindo domains).

Uma primeira pasta dinâmica chamada locale ou lang (app/[locale]/…, pages/[lang]/…, altere com localeParam) é removida dos nomes e padrões: app/[locale]/about/page.tsx vira about → /about. Pastas físicas de idioma (src/pages/pt/about.astro) são mescladas na mesma rota. Sem pasta de idioma (i18n do Pages Router, @nuxtjs/i18n, rewrites de middleware), todas as páginas são localizadas. Endpoints e rotas fora de [locale] ficam como unlocalized e nunca recebem prefixo.

route(nome, params) sem locale retorna o caminho interno, que é o esperado pelo Link do next-intl, pelo Link do Pages Router e pelo localePath do @nuxtjs/i18n. Passe { locale } para âncoras simples, redirects, sitemaps, e-mails ou seletores de idioma. route.forLocale(locale) retorna um helper vinculado a esse idioma, e route.locales() lista os idiomas configurados.

localePrefix: always (padrão) prefixa todos os idiomas; as-needed omite o idioma padrão; never omite todos os prefixos; { mode, prefixes: { "en-US": "/us" } } personaliza os prefixos. pathnames mapeia um padrão interno para padrões traduzidos com os mesmos parâmetros. Com absolute: true, um idioma atendido por um domínio configurado usa esse domínio como origem. Os idiomas são tipados: o módulo gerado exporta RouteLocale e idiomas desconhecidos são erros de tipo e de runtime.

**Traduzir URLs recebidas.** route.localize('/sobre', 'en') retorna /en/about quando /sobre é o pathname em português de /about e localePrefix é always. route.localize('/pt/produtos/42?tab=info#details', 'en') pode retornar /en/products/42?tab=info#details. O método busca em todos os idiomas configurados, preserva parâmetros e query/fragmento originais e retorna null para rotas desconhecidas, ambíguas ou não localizadas. route.match() permanece inalterado. Um prefixo de origem reconhecido ou sourceLocale para aliases sem prefixo resolve empates entre patterns de mesma especificidade. Sem idioma de destino, usa o locale de forLocale() ou o idioma padrão da configuração.

**Redirecionar requisições.** O runtime não intercepta requisições. Resolva o idioma preferido com o middleware i18n existente, chame route.localize(pathAndQuery, locale, { basePath: true }) para uma URL pública com o prefixo e faça um redirect temporário apenas quando o caminho retornado for diferente. Deixe os rewrites internos com o framework. Para um caminho interno sem prefixo, use includeBasePath: true para incluí-lo somente na saída. Para domínios por idioma, use absolute: true com domínios configurados e compare a URL completa. Não redirecione APIs, assets, métodos diferentes de GET/HEAD ou rotas não resolvidas. Exemplo pronto de proxy Next.js em examples/app-router/recipes/localized-redirect.ts.example.

## Exemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePrefix: "always",
    pathnames: { "/about": { en: "/about", pt: "/sobre" } },
  },
});
```

## Tópicos relacionados

- [Gerar uma URL localizada](topic-localized-url.md)
- [route.localize()](topic-helper-localize.md)
- [route.forLocale()](topic-helper-for-locale.md)
- [route.locales()](topic-helper-locales.md)
- [route.alternates()](topic-helper-alternates.md)

---

[Todos os tópicos](internationalization.md) · Próximo: [Gerar uma URL localizada](topic-localized-url.md) →
