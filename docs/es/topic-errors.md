# Errores y solución de problemas

[Documentación](index.md) / [CLI, CI y resolución de problemas](guides.md)

[English](../en/topic-errors.md) · [Português](../pt/topic-errors.md) · [Español](../es/topic-errors.md) · [日本語](../ja/topic-errors.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="errors"></a>

NamedRouteError extiende Error y expone un code estable. UNKNOWN_ROUTE indica que el nombre no existe; MISSING_PARAMETER, que se omitió un valor obligatorio; UNKNOWN_PARAMETER, que una clave extra pertenece a la query o está mal escrita; INVALID_PARAMETER, que un valor tiene una forma incorrecta o contiene un segmento prohibido; INVALID_LOCALE, que se pasó un idioma sin i18n o que no está configurado.

INVALID_PATTERN, INVALID_NAME e INVALID_MANIFEST identifican definiciones de ruta mal formadas. INVALID_OPTIONS, INVALID_QUERY e INVALID_HASH identifican opciones inválidas. INVALID_BASE_PATH, INVALID_ORIGIN e INVALID_I18N rechazan defaults de URL. MISSING_ORIGIN exige un origin antes de pedir URLs absolutas. GENERATION_ERROR cubre conflictos de descubrimiento, rutas que no se pueden nombrar y checks desactualizados; INVALID_CONFIG cubre toda opción no válida: configuraciones ausentes, mal formadas o mal escritas, router, pageExtensions, discovery y output.

No se encuentra routes.generated: confirma que la integración se ejecuta, ejecuta generate y revisa output y los alias de import. basePath o idioma duplicados: usa URLs relativas con los enlaces del framework y pasa basePath/locale solo para URLs simples. Nombres desactualizados: confirma que el watcher está activo y revisa los errores de la terminal. Un error de tipos después de mover una página es lo esperado: actualiza el nombre inferido o define un nombre estable.

La generación se niega a sobrescribir un archivo de salida escrito a mano. Elige otro output en lugar de añadir la firma de generado a código no relacionado. Mantén la salida generada fuera de los archivos enrutables. La interpolación dinámica no autoriza una petición; valida los permisos y las entradas de la aplicación en el destino.

Desde la 1.1, todo NamedRouteError también tiene details: { file, files, route, pattern, option, hint } con lo que se conozca, por ejemplo los dos archivos de un conflicto de rutas o "Did you mean users.show?" para un nombre, una opción o una clave de names mal escritos. INVALID_QUERY indica que una query no cumplió su schema o que un mapa de schemas no es válido; INVALID_URL, que match() recibió algo que no es una ruta ni una URL. Desde la 2.0, los valores no válidos de router, pageExtensions y output producen INVALID_CONFIG (GENERATION_ERROR en la 1.x); los mensajes no cambian.

Ante un error 404 de archivos estáticos, comprueba la ruta real de despliegue y el directorio público. `asset()` utiliza la base configurada, no la salida del bundler ni la petición actual. `INVALID_ASSET_BASE`, `INVALID_ASSET` e `INVALID_OPTIONS` identifican bases, rutas y opciones inválidas.

## Ejemplo

```ts
import { NamedRouteError } from "@triooo/named-routes";
try {
  route("users.$user", { user: "" });
} catch (error) {
  if (error instanceof NamedRouteError) console.error(error.code);
  else throw error;
}
```

---

← Anterior: [Actualizaciones automáticas en desarrollo](topic-development.md) · [Todos los temas](guides.md) · Siguiente: [Rewrites y límites](topic-boundaries.md) →
