# Auditoría de rutas y assets

[Documentación](index.md) / [CLI, CI y resolución de problemas](guides.md)

[English](../en/topic-audit.md) · [Português](../pt/topic-audit.md) · [Español](../es/topic-audit.md) · [日本語](../ja/topic-audit.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="audit"></a>

Ejecuta audit en el proyecto consumidor para encontrar referencias literales desconocidas, diferencias de mayúsculas, prefijos duplicados y rutas hardcoded. Escanea fuentes, ignora outputs y nunca reescribe archivos. Es una auditoría léxica conservadora, no un parser completo: alias, expresiones multilínea y URLs dinámicas pueden escapar; revisa advertencias de rutas hardcoded y src. Los errores devuelven 1, --strict también falla con avisos y --json produce diagnósticos para máquinas.

## Ejemplo

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```

---

← Anterior: [Diagnóstico: named-routes doctor](topic-doctor.md) · [Todos los temas](guides.md) · Siguiente: [migrate --to 2](topic-cli-migrate.md) →
