# Gerador e API de ferramentas

# API programática do gerador

Topic: `generator-api` · Named Routes v2.2.0

discoverRoutes(opções?) retorna root, framework, directories, routes, entries e os defaults do runtime sem escrever. Cada entrada tem name, path, file, router, framework e, opcionalmente, variant e localized. Rotas extras explícitas têm file: null e router: explicit.

generateRoutes(opções?, { check?: boolean }?) também retorna output e changed. O modo check rejeita saída desatualizada sem modificá-la. validateOptions(opções) lança INVALID_CONFIG para chaves desconhecidas. Importe /generator e /config apenas em ferramentas Node, nunca em código cliente. withNamedRoutes vem de /next e namedRoutes de /vite.

Related topic IDs: generator-discover, generator-generate, generator-validate, configuration
---

# discoverRoutes()

Topic: `generator-discover` · Named Routes v2.2.0

Apenas ferramentas Node: descubra rotas sem gravar o arquivo de saída. Inspecione entries, framework e metadados de descoberta.

```ts
import { discoverRoutes } from "@triooo/named-routes/generator";
const result = await discoverRoutes({ root: ".", framework: "next" });
console.log(result.entries);
```

Related topic IDs: generator-api, discovery
---

# generateRoutes()

Topic: `generator-generate` · Named Routes v2.2.0

Apenas Node: descubra e grave o módulo gerado. Com check: true, rejeita saída desatualizada sem alterar. Retorna output e changed além dos dados de descoberta.

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

Valide opções do gerador em ferramentas Node. Chaves desconhecidas ou valores inválidos geram INVALID_CONFIG. defineConfig auxilia a tipagem; a geração valida a entrada em runtime.

```ts
import { validateOptions } from "@triooo/named-routes/generator";
const options = validateOptions({ framework: "next", includeApi: true });
console.log(options.framework);
```

Related topic IDs: configuration, generator-api
