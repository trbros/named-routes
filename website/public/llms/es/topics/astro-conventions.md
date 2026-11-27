# Convenciones y descubrimiento

Topic: `astro-conventions` · Named Routes v2.2.0

Crea `src/pages/users/[id].astro`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** src/pages con páginas .astro, .md, .mdx, .markdown y .html; los archivos y carpetas que empiezan por _ son privados; [id]; [...slug] acepta cero o más segmentos ([[...slug]]); segmentos mixtos como [lang]-[version]. Los endpoints .ts/.js son opcionales con includeApi y conservan su extensión interna (api/data.json.ts es /api/data.json).

**Límites y verificación.** Las compilaciones estáticas siguen necesitando getStaticPaths en las páginas dinámicas: el paquete construye URLs, no enumera parámetros. Verificado con pruebas de convención y con examples/astro, que compila y se ejecuta con Astro 5.

```text
src/pages/users/[id].astro
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
