# Sitio de documentación

[Documentación](index.md) / [Proyecto y versiones](project.md)

[English](../en/topic-website.md) · [Português](../pt/topic-website.md) · [Español](../es/topic-website.md) · [日本語](../ja/topic-website.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="website"></a>

Esta documentación es una app Next.js en website/. Es el sitio público del proyecto, construido con el propio paquete: todos los enlaces internos usan route(), el playground y las páginas de destino son rutas reales del App Router, y el contenido en inglés, portugués, español y japonés sale del mismo docs/content.json que genera los README.

La página principal muestra cada framework compatible como una línea de un mapa de transporte, un panel de salidas alimentado con resultados reales del generador, una tabla de compatibilidad y un recorrido de instalación. Las animaciones son finitas o las inicia el usuario, se pausan fuera de pantalla y se desactivan con prefers-reduced-motion.

Para desplegar en Vercel, crea un proyecto con Root Directory en website y deja activada la opción "Include files outside the root directory". website/vercel.json instala el repositorio, compila el paquete y después compila el sitio. No se necesitan variables de entorno.

## Ejemplo

```sh
# From the repository root:
pnpm install
pnpm build
pnpm --dir website install
pnpm --dir website dev
# http://localhost:3000
pnpm --dir website build
```

---

[Todos los temas](project.md) · Siguiente: [Pruébalo: demos por framework](topic-demos.md) →
