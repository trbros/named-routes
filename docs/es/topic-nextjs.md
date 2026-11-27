# Next.js: configuración

[Documentación](index.md) / [Next.js](framework-nextjs.md)

[English](../en/topic-nextjs.md) · [Português](../pt/topic-nextjs.md) · [Español](../es/topic-nextjs.md) · [日本語](../ja/topic-nextjs.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="nextjs"></a>

Envuelve next.config con withNamedRoutes de @triooo/named-routes/next. El módulo se genera antes de next dev y next build, se mantiene al día con un watcher dentro de next dev y nunca se escribe durante next start, así que los despliegues de solo lectura son seguros. El wrapper hereda pageExtensions, basePath, trailingSlash y la configuración i18n del Pages Router.

<a id="without-base"></a>
## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ typedRoutes: true });
```

<a id="with-base"></a>
## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";

export default withNamedRoutes({ basePath: "/app", typedRoutes: true });
```

## Temas relacionados

- [Convenciones y descubrimiento](topic-nextjs-conventions.md)
- [Enlaces y navegación](topic-nextjs-navigation.md)
- [Instalación](topic-installation.md)
- [Configuración del generador](topic-configuration.md)

---

[Todos los temas](framework-nextjs.md) · Siguiente: [Convenciones y descubrimiento](topic-nextjs-conventions.md) →
