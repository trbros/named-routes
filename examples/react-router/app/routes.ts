import { type RouteConfig, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
// File conventions in app/routes/, plus a route declared in code: named-routes
// reads the final table from `react-router routes --json`.
export default [
	...(await flatRoutes()),
	route("sobre", "about.tsx"),
] satisfies RouteConfig;
