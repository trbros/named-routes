# Convenciones y descubrimiento

Topic: `tanstack-router-conventions` · Named Routes v2.2.0

Crea `src/routes/users/$id.tsx`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** __root se omite; index y route.tsx son la ruta de la carpeta; los archivos planos (posts.$postId.tsx) y en carpetas se combinan; $param; {-$locale} es opcional ([[locale]]); prefijo{$id}sufijo se convierte en un segmento mixto; un $ solo es un splat llamado _splat ([[..._splat]]); _layout no tiene ruta; posts_ excluye el anidamiento; los archivos con prefijo - y las carpetas (grupo) se ignoran; los archivos .lazy pertenecen a la misma ruta.

**Verificado.** Los nombres salen del routeTree.gen.ts que genera el plugin o la CLI de TanStack Router (sus rutas navegables); antes de que exista, se recorren los archivos. Tests de convenciones y examples/tanstack-router, que compila y se ejecuta con el plugin de TanStack Router.

```text
src/routes/users/$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
