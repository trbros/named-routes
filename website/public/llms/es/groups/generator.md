# Generador y API de herramientas

# API programática del generador

Topic: `generator-api` · Named Routes v2.2.0

discoverRoutes(opciones?) devuelve root, framework, directories, routes, entries y los defaults del runtime sin escribir nada. Cada entrada tiene name, path, file, router, framework y, opcionalmente, variant y localized. Las rutas extra explícitas tienen file: null y router: explicit.

generateRoutes(opciones?, { check?: boolean }?) devuelve además output y changed. El modo check rechaza la salida desactualizada sin modificarla. validateOptions(opciones) lanza INVALID_CONFIG ante claves desconocidas. Importa /generator y /config solo en herramientas de Node, nunca en código de cliente. withNamedRoutes viene de /next y namedRoutes de /vite.

Related topic IDs: generator-discover, generator-generate, generator-validate, configuration
---

# discoverRoutes()

Topic: `generator-discover` · Named Routes v2.2.0

Solo Node: descubre rutas sin escribir el archivo de salida. Inspecciona entries y metadatos.

```ts
import { discoverRoutes } from "@triooo/named-routes/generator";
const result = await discoverRoutes({ root: ".", framework: "next" });
console.log(result.entries);
```

Related topic IDs: generator-api, discovery
---

# generateRoutes()

Topic: `generator-generate` · Named Routes v2.2.0

Solo Node: descubre y escribe el módulo. check: true rechaza salida obsoleta sin escribirla.

```ts
import { generateRoutes } from "@triooo/named-routes/generator";
const result = await generateRoutes({ root: "." });
console.log(result.output, result.changed);
await generateRoutes({ root: "." }, { check: true });
```

Related topic IDs: generator-api, cli-generate, cli-check
---

# validateOptions()

Topic: `generator-validate` · Named Routes v2.2.0

Valida opciones en Node. Claves desconocidas generan INVALID_CONFIG. defineConfig ayuda con tipos.

```ts
import { validateOptions } from "@triooo/named-routes/generator";
const options = validateOptions({ framework: "next", includeApi: true });
console.log(options.framework);
```

Related topic IDs: configuration, generator-api
