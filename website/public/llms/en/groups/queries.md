# Typed queries & URL updates

# Typed query parameters

Topic: `typed-query` · Named Routes v2.2.0

Declare per-route query schemas in a module whose default export is defineQuery({...}) and point the query option to it. Keys are route names; values are Standard Schema validators (Zod 3.24+, Valibot 1+, ArkType and others) or defineQuery.type<T>() for TypeScript-only types. Routes without a schema keep the 1.0 query.

With a schema, TypeScript rejects unknown keys and incompatible values, and required keys make options.query required. No schema library becomes a dependency: TypeScript outputs import the module as types only, so nothing is bundled and nothing is validated at runtime.

Set validateQuery: true to bundle the schemas and validate every query object when a URL is built; failures throw INVALID_QUERY with the issues. Validation never changes the URL: values are serialized as you pass them, without the schema's defaults or transforms. Asynchronous schemas are rejected because route() is synchronous. JavaScript outputs import the module as a value to infer its types. Zod 4 and Valibot 1 require TypeScript 5.4+.

route.parseQuery(name, url) reads a URL's query back with the route's schema when it is available at runtime (validateQuery: true, or schemas passed to createRoutes) and returns { ok: true, value } with the schema's output type, or { ok: false, issues }. Values arrive as strings; for keys the schema rejects, the strings route() writes for numbers and true/false are converted back and a single value becomes an array, so one schema both builds and parses. Routes without a runtime schema (no schema, defineQuery.type() or schemas imported as types only) return the raw query, and their type says so.

```ts
// src/route-query.ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({
  products: z.object({
    page: z.number().int().min(1).optional(),
    sort: z.enum(["newest", "price"]).optional(),
  }),
  search: defineQuery.type<{ q: string }>(),
});
```

Related topic IDs: query-schema-config, query-schema-use, helper-parse-query, helper-define-query
---

# Connect a query schema

Topic: `query-schema-config` · Named Routes v2.2.0

Point query at the module with the default defineQuery export. Enable validateQuery only when you want the runtime validator bundled; type-only schemas never validate values at runtime.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({ query: "src/route-query.ts", validateQuery: true });
```

Related topic IDs: typed-query, query-schema-use, helper-parse-query
---

# Use typed queries

Topic: `query-schema-use` · Named Routes v2.2.0

After configuring the products and search schemas in the typed query guide, regenerate the module. TypeScript rejects unknown keys and requires mandatory query parameters.

```ts
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
---

# defineQuery()

Topic: `helper-define-query` · Named Routes v2.2.0

Use a per-route Standard Schema map. The helper preserves input and output types. A synchronous validator can be used for runtime validation; the schema package is your optional dependency.

```ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({ products: z.object({ page: z.number().int().min(1) }) });
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
---

# defineQuery.type<T>()

Topic: `helper-define-query-type` · Named Routes v2.2.0

Declare a query contract using TypeScript only. It adds no runtime validator. Do not trust user-provided URL values without validating them separately.

```ts
import { defineQuery } from "@triooo/named-routes";
export default defineQuery({ search: defineQuery.type<{ q: string }>() });
```

Related topic IDs: helper-define-query, typed-query, helper-parse-query
---

# route.parseQuery()

Topic: `helper-parse-query` · Named Routes v2.2.0

`route.parseQuery(name, input)` reads query parameters from a URL or query string and returns a result with `ok`. A runtime Standard Schema converts and validates values; type-only schemas return raw values instead. In generated modules use `query` and `validateQuery: true` to include schemas at runtime. Zod below is an optional consumer dependency. Do not assume a failed result contains a valid value.

```ts
import { createRoutes } from "@triooo/named-routes";
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";
const urls = createRoutes({ products: "/products" }, {}, {
  query: defineQuery({ products: z.object({ page: z.number().int().min(1) }) }),
});
const parsed = urls.parseQuery("products", "?page=2");
if (parsed.ok) {
  console.log(parsed.value.page); // 2 (number)
}
urls.parseQuery("products", "?page=0").ok; // false
```
---

# route.withQuery()

Topic: `helper-with-query` · Named Routes v2.2.0

Update a root-relative or HTTP(S) URL without recreating its path or hash. Set null or [] to remove a key, undefined to preserve it, and an array to replace repeated values. Unchanged repeated values remain. Query encoding is normalized by URLSearchParams. Pass { name, basePath: true } when validating a known prefixed route; named patches use the route query input type. When a runtime schema is available for the matched route, the complete resulting query is validated. Type-only schemas do not validate at runtime.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ products: "/products" });
urls.withQuery("/products?page=1&category=books#list", { page: 2 });
// /products?category=books&page=2#list
urls.withQuery("/products?page=2&category=books", { category: null });
// /products?page=2
urls.withQuery("/products?tag=a&tag=b", { tag: ["c", "d"] });
// /products?tag=c&tag=d
```
