# Cómo funciona la generación

[Documentación](index.md) / [Primeros pasos](getting-started.md)

[English](../en/topic-architecture.md) · [Português](../pt/topic-architecture.md) · [Español](../es/topic-architecture.md) · [日本語](../ja/topic-architecture.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="architecture"></a>

El generador Node lee archivos y tablas de rutas. Analiza declaraciones de endpoints sin ejecutar handlers. Puede usar el comando de listado del framework. El runtime del navegador no importa Node.js; el framework sirve las páginas.

## Ejemplo

```sh
npx @triooo/named-routes list
```

## Temas relacionados

- [Casos límite del descubrimiento](topic-discovery.md)
- [API programática del generador](topic-generator-api.md)
- [Lee el manifiesto generado](topic-generated-source.md)

---

← Anterior: [Comparación con alternativas](topic-comparison.md) · [Todos los temas](getting-started.md)
