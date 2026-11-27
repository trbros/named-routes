# Nomes estáveis opcionais

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-stable-names.md) · [Português](../pt/topic-stable-names.md) · [Español](../es/topic-stable-names.md) · [日本語](../ja/topic-stable-names.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="stable-names"></a>

Nomes automáticos acompanham a estrutura da URL. Se uma refatoração mover uma URL pública e você precisar de um nome semântico estável, atualize o mapa opcional names. Todo caminho apelidado deve existir. Rotas não listadas mantêm nomes automáticos. Nomes duplicados e erros de digitação interrompem a geração.

Um nome personalizado substitui o automático daquele caminho; não adiciona um segundo alias automaticamente. Isso é útil para nomes no estilo Laravel, como posts.show, mas não é obrigatório no fluxo normal.

## Exemplo

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```

## Tópicos relacionados

- [Nomes semânticos e grupos](topic-semantic-names.md)
- [Convenções de nomes](topic-config-naming.md)
- [Regras de nomes automáticos](topic-naming.md)

---

← Anterior: [Nomes semânticos e grupos](topic-semantic-names.md) · [Todos os tópicos](build-with-routes.md) · Próximo: [TypeScript e typedRoutes do Next](topic-typescript.md) →
