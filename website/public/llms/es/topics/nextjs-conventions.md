# Convenciones y descubrimiento

Topic: `nextjs-conventions` · Named Routes v2.2.0

Crea `app/users/[user]/page.tsx`. El nombre en modo de rutas por camino es `users.$user`. El framework sigue renderizando la página.

**Convenciones.** app/ y pages/ (o src/app y src/pages) se escanean juntos. App Router: solo archivos page; los grupos de rutas y los slots paralelos se omiten, las intercepciones se resuelven a su URL canónica, las carpetas _privadas se ignoran y %5F se convierte en guion bajo. Pages Router: index se elimina y _app, _document y _error se omiten. Los Route Handlers y pages/api son opcionales con includeApi. appDir y pagesDir apuntan a carpetas personalizadas (o false para omitir una).

**Verificado.** Servidores de desarrollo reales de Next 16 (App Router y Pages Router, con basePath y descubrimiento de páginas en vivo) se ejecutan en CI. Demos: examples/app-router y examples/pages-router. Consulta también las recetas del App Router y del Pages Router.

```text
app/users/[user]/page.tsx
  → users.$user
  → /users/[user]
```

Related topic IDs: naming, semantic-names, discovery
