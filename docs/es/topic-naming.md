# Reglas de nombres automáticos

[Documentación](index.md) / [Primeros pasos](getting-started.md)

[English](../en/topic-naming.md) · [Português](../pt/topic-naming.md) · [Español](../es/topic-naming.md) · [日本語](../ja/topic-naming.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="naming"></a>

Los segmentos estáticos de la URL se unen con puntos. Los parámetros dinámicos, opcionales, catch-all y catch-all opcionales usan $ seguido del nombre del parámetro; los segmentos mixtos como v[major]-[minor] se convierten en v$major-$minor. La página raíz es home. El signo de dólar distingue un parámetro dinámico de un segmento literal.

Los nombres de archivo del framework (page.tsx, index, +page.svelte, _index, route.tsx) no se convierten en segmentos del nombre. Los grupos de rutas, los slots paralelos y los layouts sin ruta se omiten. Crear, mover o eliminar una página cambia el nombre público inferido; los alias opcionales mantienen un nombre estable cuando las URLs cambian.

El estilo se configura con naming: separator (por defecto "."), paramPrefix (por defecto "$", puede estar vacío) y home (por defecto "home"). En una configuración JavaScript o TypeScript, naming.transform(route) puede devolver otro nombre para cualquier ruta automática.

## Ejemplo

```text
App Router                           Pages Router                     Name
app/page.tsx                         pages/index.tsx                  home
app/user/page.tsx                    pages/user/index.tsx             user
app/user/profile/page.tsx            pages/user/profile.tsx           user.profile
app/users/[user]/page.tsx            pages/users/[user].tsx           users.$user
app/docs/[...slug]/page.tsx          pages/docs/[...slug].tsx          docs.$slug
app/shop/[[...path]]/page.tsx        pages/shop/[[...path]].tsx        shop.$path
```

---

← Anterior: [Tu primera ruta con nombre (Next.js)](topic-quick-start.md) · [Todos los temas](getting-started.md) · Siguiente: [Lee el manifiesto generado](topic-generated-source.md) →
