import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
// File conventions in app/routes/ — the same files named-routes discovers.
export default flatRoutes() satisfies RouteConfig;
