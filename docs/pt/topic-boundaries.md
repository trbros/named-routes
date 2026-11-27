# Rewrites e limites

[Documentação](index.md) / [CLI, CI e solução de problemas](guides.md)

[English](../en/topic-boundaries.md) · [Português](../pt/topic-boundaries.md) · [Español](../es/topic-boundaries.md) · [日本語](../ja/topic-boundaries.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="boundaries"></a>

Este é um construtor de URLs, não um substituto para router, middleware, autorização ou cliente HTTP. Não cria rotas em runtime, não verifica a existência de recursos, não detecta o idioma do visitante e não faz requests de backend.

Redirects, rewrites e detecção de idioma por middleware continuam sendo responsabilidade da aplicação; caminhos declarados em código só ganham nomes quando o framework publica sua tabela de rotas (veja Outros frameworks). Mapeie explicitamente padrões externos ou reescritos com extraRoutes e evite aplicar locale ou basePath duas vezes. O scanner não lê arquivos de configuração do framework; use o withNamedRoutes ou as opções para repassar configurações.

## Exemplo

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```

---

← Anterior: [Erros e solução de problemas](topic-errors.md) · [Todos os tópicos](guides.md)
