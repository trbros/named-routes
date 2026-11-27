import { createRoutes, defineQuery } from "../src/index.js";

const route = createRoutes({
	entrar: "/entrar",
	"admin.alunos.show": "/admin/alunos/[aluno]",
	"api.admin": "/api/admin",
});
const href: "/entrar" = route("entrar");
const asset: string = route.asset("logo.svg");
route.url("entrar", { query: { page: 2 } });
route.url("admin.alunos.show", { params: { aluno: 42 } });
// @ts-expect-error required path params
route.url("admin.alunos.show");
// @ts-expect-error unexpected path param
route.url("admin.alunos.show", { params: { id: 42 } });
// @ts-expect-error unknown named route
route.url("missing");
const post = route.endpoint("api.admin", "POST");
const method: "POST" = post().method;
// @ts-expect-error method typo
route.endpoint("api.admin", "DETELE");
const auto = createRoutes(
	{ entrar: "/entrar" },
	{ basePath: "/cia", includeBasePath: true },
);
const prefixed: string = auto("entrar");
// @ts-expect-error auto-prefix may change the returned literal
const unprefixed: "/entrar" = auto("entrar");
void [href, asset, method, prefixed, unprefixed];

const withQuery = createRoutes(
	{ products: "/products" },
	{},
	{ query: defineQuery({ products: defineQuery.type<{ page: number }>() }) },
);
withQuery.url("products", { query: { page: 2 } });
// @ts-expect-error required query
withQuery.url("products");
// @ts-expect-error wrong query type
withQuery.url("products", { query: { page: "2" } });
