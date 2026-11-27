# Nomes estáveis opcionais

Topic: `stable-names` · Named Routes v2.2.0

Nomes automáticos acompanham a estrutura da URL. Se uma refatoração mover uma URL pública e você precisar de um nome semântico estável, atualize o mapa opcional names. Todo caminho apelidado deve existir. Rotas não listadas mantêm nomes automáticos. Nomes duplicados e erros de digitação interrompem a geração.

Um nome personalizado substitui o automático daquele caminho; não adiciona um segundo alias automaticamente. Isso é útil para nomes no estilo Laravel, como posts.show, mas não é obrigatório no fluxo normal.

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

Related topic IDs: semantic-names, config-naming, naming
