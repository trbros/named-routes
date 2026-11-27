# Watch y opciones de desarrollo

Topic: `config-watch` · Named Routes v2.2.0

La integración actualiza rutas en desarrollo. withNamedRoutes acepta watch, watchMode y watchInterval. Usa polling si los eventos nativos no funcionan.

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({}, { watchMode: "poll", watchInterval: 750 });
```

Related topic IDs: development, cli-watch
