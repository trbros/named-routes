import { withNamedRoutes } from "@triooo/named-routes/next";
// typedRoutes + hrefs: "typed": route() results are accepted by <Link> and
// router.push() without casts.
export default withNamedRoutes({ basePath: "/demo", typedRoutes: true }, { hrefs: "typed" });
