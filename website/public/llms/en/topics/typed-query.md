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
