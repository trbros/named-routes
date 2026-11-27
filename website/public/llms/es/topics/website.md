# Sitio de documentación

Topic: `website` · Named Routes v2.2.0

Esta documentación es una app Next.js en website/. Es el sitio público del proyecto, construido con el propio paquete: todos los enlaces internos usan route(), el playground y las páginas de destino son rutas reales del App Router, y el contenido en inglés, portugués, español y japonés sale del mismo docs/content.json que genera los README.

La página principal muestra cada framework compatible como una línea de un mapa de transporte, un panel de salidas alimentado con resultados reales del generador, una tabla de compatibilidad y un recorrido de instalación. Las animaciones son finitas o las inicia el usuario, se pausan fuera de pantalla y se desactivan con prefers-reduced-motion.

Para desplegar en Vercel, crea un proyecto con Root Directory en website y deja activada la opción "Include files outside the root directory". website/vercel.json instala el repositorio, compila el paquete y después compila el sitio. No se necesitan variables de entorno.

```sh
# From the repository root:
pnpm install
pnpm build
pnpm --dir website install
pnpm --dir website dev
# http://localhost:3000
pnpm --dir website build
```
