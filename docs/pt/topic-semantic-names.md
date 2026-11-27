# Nomes semânticos e grupos

[Documentação](index.md) / [Construção de URLs e nomes](build-with-routes.md)

[English](../en/topic-semantic-names.md) · [Português](../pt/topic-semantic-names.md) · [Español](../es/topic-semantic-names.md) · [日本語](../ja/topic-semantic-names.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="semantic-names"></a>

Defina naming.style como semantic para usar index em páginas-pai e show em parâmetros escalares obrigatórios finais. Os nomes atuais continuam sendo o padrão. Segmentos estáticos não são traduzidos nem singularizados. Use names para dar nomes estáveis a URLs específicas (inclusive create); atualize o mapa quando uma URL mudar. Colisões interrompem a geração.

## Exemplo

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

## Tópicos relacionados

- [Nomes estáveis opcionais](topic-stable-names.md)
- [Regras de nomes automáticos](topic-naming.md)
- [Convenções de nomes](topic-config-naming.md)
- [Leia o manifesto gerado](topic-generated-source.md)

---

← Anterior: [Barras finais](topic-trailing-slash.md) · [Todos os tópicos](build-with-routes.md) · Próximo: [Nomes estáveis opcionais](topic-stable-names.md) →
