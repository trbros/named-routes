# Nombres semánticos y grupos

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-semantic-names.md) · [Português](../pt/topic-semantic-names.md) · [Español](../es/topic-semantic-names.md) · [日本語](../ja/topic-semantic-names.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="semantic-names"></a>

Configura naming.style como semantic para usar index y show. Los nombres originales siguen siendo el valor predeterminado. Usa names para nombres estables y personalizados; las colisiones detienen la generación.

## Ejemplo

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

## Temas relacionados

- [Nombres estables opcionales](topic-stable-names.md)
- [Reglas de nombres automáticos](topic-naming.md)
- [Convenciones de nombres](topic-config-naming.md)
- [Lee el manifiesto generado](topic-generated-source.md)

---

← Anterior: [Barras finales](topic-trailing-slash.md) · [Todos los temas](build-with-routes.md) · Siguiente: [Nombres estables opcionales](topic-stable-names.md) →
