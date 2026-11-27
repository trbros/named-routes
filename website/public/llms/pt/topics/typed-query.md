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
