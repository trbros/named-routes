# Convenciones y descubrimiento

[Documentación](index.md) / [TanStack Router](framework-tanstack-router.md)

[English](../en/topic-tanstack-router-conventions.md) · [Português](../pt/topic-tanstack-router-conventions.md) · [Español](../es/topic-tanstack-router-conventions.md) · [日本語](../ja/topic-tanstack-router-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="tanstack-router-conventions"></a>

Crea `src/routes/users/$id.tsx`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** __root se omite; index y route.tsx son la ruta de la carpeta; los archivos planos (posts.$postId.tsx) y en carpetas se combinan; $param; {-$locale} es opcional ([[locale]]); prefijo{$id}sufijo se convierte en un segmento mixto; un $ solo es un splat llamado _splat ([[..._splat]]); _layout no tiene ruta; posts_ excluye el anidamiento; los archivos con prefijo - y las carpetas (grupo) se ignoran; los archivos .lazy pertenecen a la misma ruta.

**Verificado.** Los nombres salen del routeTree.gen.ts que genera el plugin o la CLI de TanStack Router (sus rutas navegables); antes de que exista, se recorren los archivos. Tests de convenciones y examples/tanstack-router, que compila y se ejecuta con el plugin de TanStack Router.

## Ejemplo

```text
src/routes/users/$id.tsx
  → users.$id
  → /users/[id]
```

## Temas relacionados

- [Reglas de nombres automáticos](topic-naming.md)
- [Nombres semánticos y grupos](topic-semantic-names.md)
- [Casos límite del descubrimiento](topic-discovery.md)

---

← Anterior: [TanStack Router: configuración](topic-tanstack-router.md) · [Todos los temas](framework-tanstack-router.md) · Siguiente: [Enlaces y navegación](topic-tanstack-router-navigation.md) →
