# Rewrites e limites

Topic: `boundaries` · Named Routes v2.2.0

Este é um construtor de URLs, não um substituto para router, middleware, autorização ou cliente HTTP. Não cria rotas em runtime, não verifica a existência de recursos, não detecta o idioma do visitante e não faz requests de backend.

Redirects, rewrites e detecção de idioma por middleware continuam sendo responsabilidade da aplicação; caminhos declarados em código só ganham nomes quando o framework publica sua tabela de rotas (veja Outros frameworks). Mapeie explicitamente padrões externos ou reescritos com extraRoutes e evite aplicar locale ou basePath duas vezes. O scanner não lê arquivos de configuração do framework; use o withNamedRoutes ou as opções para repassar configurações.

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```
