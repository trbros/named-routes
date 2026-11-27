# Watch & development options

Topic: `config-watch` · Named Routes v2.2.0

The integration handles updates during development. withNamedRoutes accepts watch, watchMode and watchInterval; use polling only when native events are unreliable. CLI watch supports --watch-mode poll. Restart the framework after changing its router base.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({}, { watchMode: "poll", watchInterval: 750 });
```

Related topic IDs: development, cli-watch
