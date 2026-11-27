# Nombres estables opcionales

[Documentación](index.md) / [Construcción de URL y nombres](build-with-routes.md)

[English](../en/topic-stable-names.md) · [Português](../pt/topic-stable-names.md) · [Español](../es/topic-stable-names.md) · [日本語](../ja/topic-stable-names.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="stable-names"></a>

Los nombres automáticos siguen la estructura de la URL. Si una refactorización mueve una URL pública y necesitas un nombre semántico estable, actualiza el mapa opcional names. Cada ruta con alias debe existir. Las rutas no listadas conservan sus nombres automáticos. Los nombres duplicados y los errores de escritura hacen fallar la generación en lugar de crear enlaces rotos en silencio.

Un nombre personalizado reemplaza el nombre automático de esa ruta; no añade automáticamente un segundo alias. Es útil para nombres al estilo Laravel como posts.show, pero no es necesario para el uso normal.

## Ejemplo

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

## Temas relacionados

- [Nombres semánticos y grupos](topic-semantic-names.md)
- [Convenciones de nombres](topic-config-naming.md)
- [Reglas de nombres automáticos](topic-naming.md)

---

← Anterior: [Nombres semánticos y grupos](topic-semantic-names.md) · [Todos los temas](build-with-routes.md) · Siguiente: [TypeScript y typedRoutes de Next](topic-typescript.md) →
