# Queries tipadas e atualização de URLs

# Query parameters tipados

Topic: `typed-query` · Named Routes v2.2.0

Declare schemas de query por rota em um módulo cujo export default é defineQuery({...}) e aponte a opção query para ele. As chaves são nomes de rota; os valores são validadores Standard Schema (Zod 3.24+, Valibot 1+, ArkType e outros) ou defineQuery.type<T>() para tipos apenas do TypeScript. Rotas sem schema mantêm a query da 1.0.

Com um schema, o TypeScript rejeita chaves desconhecidas e valores incompatíveis, e chaves obrigatórias tornam options.query obrigatório. Nenhuma biblioteca de schema vira dependência: saídas TypeScript importam o módulo apenas como tipos, então nada é empacotado e nada é validado em runtime.

Defina validateQuery: true para empacotar os schemas e validar cada objeto de query quando uma URL é gerada; falhas lançam INVALID_QUERY com os problemas encontrados. A validação nunca altera a URL: os valores são serializados como você os passa, sem defaults nem transformações do schema. Schemas assíncronos são rejeitados porque route() é síncrono. Saídas JavaScript importam o módulo como valor para inferir os tipos. Zod 4 e Valibot 1 exigem TypeScript 5.4+.

route.parseQuery(name, url) lê de volta a query de uma URL com o schema da rota quando ele está disponível em runtime (validateQuery: true, ou schemas passados ao createRoutes) e retorna { ok: true, value } com o tipo de saída do schema, ou { ok: false, issues }. Os valores chegam como strings; nas chaves que o schema rejeita, as strings que route() escreve para números e true/false são convertidas de volta e um valor único vira array, então o mesmo schema monta e lê. Rotas sem schema em runtime (sem schema, defineQuery.type() ou schemas importados só como tipos) retornam a query crua, e o tipo diz isso.

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

# Conectar um schema de query

Topic: `query-schema-config` · Named Routes v2.2.0

Aponte query para o módulo que exporta defineQuery como default. Ative validateQuery quando quiser validação em runtime; schemas apenas de tipo nunca validam valores em runtime.

```ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({ query: "src/route-query.ts", validateQuery: true });
```

Related topic IDs: typed-query, query-schema-use, helper-parse-query
---

# Usar queries tipadas

Topic: `query-schema-use` · Named Routes v2.2.0

Depois de configurar os schemas products e search do guia de query tipada, gere o módulo. O TypeScript rejeita chaves desconhecidas e exige os parâmetros obrigatórios.

```ts
route("products", {}, { query: { page: 2, sort: "newest" } }); // /products?page=2&sort=newest
route("products", {}, { query: { pgae: 2 } }); // type error: unknown key
route("search"); // type error: q is required
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
---

# defineQuery()

Topic: `helper-define-query` · Named Routes v2.2.0

Use um mapa de Standard Schema por rota. O helper preserva tipos de entrada e saída. Validadores síncronos podem validar em runtime; o pacote de schema é dependência opcional do consumidor.

```ts
import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";

export default defineQuery({ products: z.object({ page: z.number().int().min(1) }) });
```

Related topic IDs: typed-query, query-schema-config, helper-parse-query
---

# defineQuery.type<T>()

Topic: `helper-define-query-type` · Named Routes v2.2.0

Declare o contrato da query apenas com TypeScript. Não adiciona validação em runtime. Valide separadamente valores recebidos do usuário.

```ts
import { defineQuery } from "@triooo/named-routes";
export default defineQuery({ search: defineQuery.type<{ q: string }>() });
```

Related topic IDs: helper-define-query, typed-query, helper-parse-query
---

# route.parseQuery()

Topic: `helper-parse-query` · Named Routes v2.2.0

`route.parseQuery(name, input)` lê a query de uma URL ou query string e retorna um resultado com `ok`. Um Standard Schema em runtime converte e valida valores; schemas apenas de tipo retornam os valores brutos. No módulo gerado, use `query` e `validateQuery: true` para incluir schemas em runtime. Zod abaixo é uma dependência opcional do consumidor. Não use o valor quando a validação falhar.

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

Atualize uma URL relativa à raiz ou HTTP(S) sem reconstruir o caminho ou hash. Use null ou [] para remover, undefined para preservar e arrays para substituir valores repetidos. Os demais valores repetidos permanecem. URLSearchParams normaliza a codificação. Passe { name, basePath: true } ao validar uma rota conhecida com prefixo; patches nomeados usam o tipo do schema. Quando existe schema runtime para a rota encontrada, a query completa é validada. Schemas apenas de tipos não validam em runtime.

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
