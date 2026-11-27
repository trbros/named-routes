# Convenciones y descubrimiento

[Documentación](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs-conventions.md) · [Português](../pt/topic-nextjs-conventions.md) · [Español](../es/topic-nextjs-conventions.md) · [日本語](../ja/topic-nextjs-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs-conventions"></a>

Crea `app/users/[user]/page.tsx`. El nombre en modo de rutas por camino es `users.$user`. El framework sigue renderizando la página.

**Convenciones.** app/ y pages/ (o src/app y src/pages) se escanean juntos. App Router: solo archivos page; los grupos de rutas y los slots paralelos se omiten, las intercepciones se resuelven a su URL canónica, las carpetas _privadas se ignoran y %5F se convierte en guion bajo. Pages Router: index se elimina y _app, _document y _error se omiten. Los Route Handlers y pages/api son opcionales con includeApi. appDir y pagesDir apuntan a carpetas personalizadas (o false para omitir una).

**Verificado.** Servidores de desarrollo reales de Next 16 (App Router y Pages Router, con basePath y descubrimiento de páginas en vivo) se ejecutan en CI. Demos: examples/app-router y examples/pages-router. Consulta también las recetas del App Router y del Pages Router.

## Ejemplo

```text
app/users/[user]/page.tsx
  → users.$user
  → /users/[user]
```

## Temas relacionados

- [Reglas de nombres automáticos](topic-naming.md)
- [Nombres semánticos y grupos](topic-semantic-names.md)
- [Casos límite del descubrimiento](topic-discovery.md)

---

← Anterior: [Next.js: configuración](topic-nextjs.md) · [Todos los temas](framework-nextjs.md) · Siguiente: [Enlaces y navegación](topic-nextjs-navigation.md) →
