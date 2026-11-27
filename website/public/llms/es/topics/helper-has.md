# route.has()

Topic: `helper-has` · Named Routes v2.2.0

`route.has(name)` consulta el manifiesto y restringe una cadena a un nombre válido. No verifica que el servidor sirva la ruta. Úsalo antes de acceder a rutas seleccionadas desde entradas externas.

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
function patternFor(name: string) {
  return urls.has(name) ? urls.pattern(name) : null;
}
patternFor("about"); // /about
patternFor("missing"); // null
```

Related topic IDs: helper-names, helper-pattern
