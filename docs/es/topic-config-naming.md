# Convenciones de nombres

[Documentación](index.md) / [Configuración y referencia del runtime](api-reference.md)

[English](../en/topic-config-naming.md) · [Português](../pt/topic-config-naming.md) · [Español](../es/topic-config-naming.md) · [日本語](../ja/topic-config-naming.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-naming"></a>

naming.style elige path o semantic. separator, paramPrefix y home personalizan; transform modifica nombres automáticos. names tiene prioridad.

## Ejemplo

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

## Temas relacionados

- [Nombres semánticos y grupos](topic-semantic-names.md)
- [Nombres estables opcionales](topic-stable-names.md)
- [Reglas de nombres automáticos](topic-naming.md)

---

← Anterior: [Salida y exports generados](topic-config-output.md) · [Todos los temas](api-reference.md) · Siguiente: [Valores predeterminados de URL](topic-config-defaults.md) →
