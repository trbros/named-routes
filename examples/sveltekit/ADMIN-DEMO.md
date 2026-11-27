# Admin demo

Open `/admin` under the application's configured base. Browse sample students, open IDs 42 and 7, and preview a new student's name via a native GET form. No data is persisted and no real personal data is required.

The four names are stable aliases in `named-routes.config.json`, so existing route names continue to work. Public anchors and form actions use `route.url()`; native framework links can use `route()`. The sort link demonstrates a named query without positional placeholders.

The existing app's `dev` and `build` scripts run the entire demo. Root-level E2E tests exercise the additional flow.
