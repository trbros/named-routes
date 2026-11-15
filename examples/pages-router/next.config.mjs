import { withNamedRoutes } from "@triooo/named-routes/next";
// Pages Router i18n is inherited: route() returns locale-free paths and
// next/link adds the locale prefix (as-needed) itself.
export default withNamedRoutes({
  basePath: "/demo",
  i18n: { locales: ["en", "pt"], defaultLocale: "en" },
});
