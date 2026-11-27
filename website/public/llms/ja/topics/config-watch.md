# 監視と開発オプション

Topic: `config-watch` · Named Routes v2.2.0

開発中は統合が更新します。withNamedRoutes の watch、watchMode、watchInterval で調整できます。

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({}, { watchMode: "poll", watchInterval: 750 });
```

Related topic IDs: development, cli-watch
