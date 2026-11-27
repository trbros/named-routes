# Convenciones y descubrimiento

[Documentación](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-conventions.md) · [Português](../pt/topic-astro-conventions.md) · [Español](../es/topic-astro-conventions.md) · [日本語](../ja/topic-astro-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-conventions"></a>

Crea `src/pages/users/[id].astro`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** src/pages con páginas .astro, .md, .mdx, .markdown y .html; los archivos y carpetas que empiezan por _ son privados; [id]; [...slug] acepta cero o más segmentos ([[...slug]]); segmentos mixtos como [lang]-[version]. Los endpoints .ts/.js son opcionales con includeApi y conservan su extensión interna (api/data.json.ts es /api/data.json).

**Límites y verificación.** Las compilaciones estáticas siguen necesitando getStaticPaths en las páginas dinámicas: el paquete construye URLs, no enumera parámetros. Verificado con pruebas de convención y con examples/astro, que compila y se ejecuta con Astro 5.

## Ejemplo

```text
src/pages/users/[id].astro
  → users.$id
  → /users/[id]
```

## Temas relacionados

- [Reglas de nombres automáticos](topic-naming.md)
- [Nombres semánticos y grupos](topic-semantic-names.md)
- [Casos límite del descubrimiento](topic-discovery.md)

---

← Anterior: [Astro: configuración](topic-astro.md) · [Todos los temas](framework-astro.md) · Siguiente: [Enlaces y navegación](topic-astro-navigation.md) →
