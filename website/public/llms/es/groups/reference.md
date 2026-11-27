# Configuración y referencia del runtime

# Referencia de la API del runtime

Topic: `runtime-api` · Named Routes v2.2.0

createRoutes(manifiesto, defaults?) crea un helper independiente y congelado y copia el manifiesto. Defaults contiene basePath, assetBase, trailingSlash, origin e i18n. parsePattern(patrón) devuelve segmentos static/dynamic/optionalDynamic/catchAll/optional/mixed y valida la sintaxis; formatPattern es su inverso y patternParameters lista los nombres de los parámetros. RouteValue, QueryValue, RouteParams, RouteOptions, RouteDefaults, I18nOptions, LocalePrefix, LocaleDomain, NamedRoutes y PatternSegment son tipos exportados.

Un manifiesto tipado como un simple Record<string, string> (por ejemplo, cargado desde JSON) sigue funcionando: los nombres pasan a ser string y los parámetros un registro flexible, mientras el runtime sigue validando cada llamada.

Related topic IDs: helper-route, public-url, helper-create-routes, helper-endpoint, helper-match, helper-parse-pattern, helper-define-query, assets
---

# Configuración del generador

Topic: `configuration` · Named Routes v2.2.0

La configuración es opcional. Añade solo lo necesario. El orden es .ts, .mts, .mjs, .js, .cjs, .json; usa .mjs si Node no admite TypeScript. defineConfig da autocompletado; --config elige otro archivo.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({});
```

Related topic IDs: config-discovery, config-output, config-naming, config-defaults, config-api, config-extra-routes
---

# Descubrimiento y directorios

Topic: `config-discovery` · Named Routes v2.2.0

Usa framework: auto o explícito. discovery: framework usa la tabla publicada; files fuerza el escáner. Next usa appDir/pagesDir; otros routesDir. pageExtensions y exclude personalizan la búsqueda.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  framework: "next",
  router: "app",
  appDir: "src/app",
  exclude: ["**/__tests__/**"],
});
```

Related topic IDs: discovery, architecture, naming
---

# Salida y exports generados

Topic: `config-output` · Named Routes v2.2.0

output define el módulo fuera del directorio de rutas. exportNames renombra exports; importSource cambia el import. hrefs: typed es el valor predeterminado.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  output: "src/lib/routes.generated.ts",
  hrefs: "typed",
});
```

Related topic IDs: generated-source, typed-hrefs
---

# Convenciones de nombres

Topic: `config-naming` · Named Routes v2.2.0

naming.style elige path o semantic. separator, paramPrefix y home personalizan; transform modifica nombres automáticos. names tiene prioridad.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: semantic-names, stable-names, naming
---

# Valores predeterminados de URL

Topic: `config-defaults` · Named Routes v2.2.0

defaults incluye basePath, includeBasePath, origin, trailingSlash y assetBase. Son valores públicos. Los explícitos prevalecen sobre los heredados.

## Sin base path

La aplicación se sirve en la raíz del dominio. No configures un prefijo.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { origin: "https://example.com" },
});
```

## Con base path

La aplicación se sirve bajo /app. Configura la base antes de regenerar las rutas.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  defaults: { basePath: "/app", origin: "https://example.com" },
});
```

Related topic IDs: base-path, asset-base, absolute-urls
---

# Añadir rutas explícitas

Topic: `config-extra-routes` · Named Routes v2.2.0

extraRoutes relaciona nombres con patrones sin requerir descubrimiento. No crea páginas o endpoints.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  extraRoutes: { "public.login": "/login" },
});
```

Related topic IDs: stable-names, manual-routes, boundaries
---

# Activar descubrimiento de API

Topic: `config-api` · Named Routes v2.2.0

includeApi es false por defecto. Actívalo para incluir endpoints reconocidos. Solo se generan métodos detectables estáticamente.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  includeApi: true,
});
```

Related topic IDs: endpoint-methods, helper-endpoint
---

# Watch y opciones de desarrollo

Topic: `config-watch` · Named Routes v2.2.0

La integración actualiza rutas en desarrollo. withNamedRoutes acepta watch, watchMode y watchInterval. Usa polling si los eventos nativos no funcionan.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({}, { watchMode: "poll", watchInterval: 750 });
```

Related topic IDs: development, cli-watch
