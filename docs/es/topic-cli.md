# CLI e integración continua

[Documentación](index.md) / [CLI, CI y resolución de problemas](guides.md)

[English](../en/topic-cli.md) · [Português](../pt/topic-cli.md) · [Español](../es/topic-cli.md) · [日本語](../ja/topic-cli.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="cli"></a>

El binario se llama named-routes. generate (por defecto) escribe el manifiesto. list imprime las entradas descubiertas en JSON. check compara sin escribir y sale con código 1 cuando está desactualizado. watch genera al inicio y mantiene el módulo al día hasta SIGINT/SIGTERM (eventos de archivos con un nuevo escaneo, o sondeo con --watch-mode poll). init escribe named-routes.config.mjs para el framework detectado y nunca sobrescribe una configuración existente. doctor diagnostica el proyecto sin escribir nada (consulta Diagnóstico).

Opciones: --root <directorio>, --config <archivo>, --framework <nombre>, --output <archivo>, --routes-dir <carpeta>, --router <auto|app|pages>, --api, --watch-interval <ms>, --watch-mode <auto|native|poll>, --json, --strict, --no-color y --v2 (doctor), --to y --write (migrate), --version (-v), --help (-h). Ejecuta los comandos desde el proyecto consumidor con el paquete instalado localmente. Los errores muestran su code y, cuando se conocen, el archivo, la ruta, la opción y una corrección.

Si versionas el archivo generado, ejecuta check antes del build. Las integraciones regeneran durante el build, así que un check posterior no puede detectar un archivo versionado que ya estaba desactualizado. La generación es determinista, atómica y sin marcas de tiempo. Los archivos existentes sin la firma del generador nunca se sobrescriben.

migrate --to 2 prepara un proyecto 1.x para la 2.0: fija hrefs: "string" y, cuando las rutas del framework difieren del recorrido de archivos, discovery: "files" en la configuración de named-routes (creando named-routes.config.mjs si no existe), para que el módulo generado siga igual hasta que quites esas líneas. Es una simulación salvo que pases --write, y nunca edita configuraciones de framework ni código de la aplicación. doctor --v2 enumera el resto (Node.js, TypeScript, moduleResolution, códigos de error).

Usa npx @triooo/named-routes generate para una ejecución independiente o npm exec -- named-routes generate con el paquete instalado. El paquete named-routes sin scope no pertenece a este proyecto. --base-path /docs sobrescribe el prefijo; --base-path / lo elimina.

**Sobrescritura del prefijo.** --base-path <path> funciona en generación/check/watch y doctor. Sobrescribe el prefijo en caché y el default compartido para esa ejecución; / elimina el prefijo. Los snapshots de integraciones son metadatos generados, no código fuente.

Con el paquete instalado localmente, usa pnpm exec named-routes list (pnpm) o npm exec --package=@triooo/named-routes -- named-routes list (npm). Si Windows informa MODULE_NOT_FOUND antes de iniciar la CLI, inspecciona el acceso generado y reinstala con el gestor original. Un acceso que apunta fuera de node_modules no puede repararse desde código de la CLI que no se ejecuta. El bin apunta a bin/named-routes.js, que carga dist/cli.js desde su propia ubicación y conserva el directorio de trabajo.

## Ejemplo

```sh
npx @triooo/named-routes --help
```

## Temas relacionados

- [init](topic-cli-init.md)
- [generate](topic-cli-generate.md)
- [list](topic-cli-list.md)
- [check](topic-cli-check.md)
- [watch](topic-cli-watch.md)
- [Diagnóstico: named-routes doctor](topic-doctor.md)
- [Auditoría de rutas y assets](topic-audit.md)
- [migrate --to 2](topic-cli-migrate.md)

---

[Todos los temas](guides.md) · Siguiente: [init](topic-cli-init.md) →
