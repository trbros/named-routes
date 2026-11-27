# Convenciones y descubrimiento

Topic: `nuxt-conventions` · Named Routes v2.2.0

Crea `app/pages/users/[id].vue`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** app/pages o pages: index.vue, [id], [[id]] opcional, [...slug] (también acepta un resto vacío, así que se convierte en [[...slug]]), carpetas (grupo), segmentos mixtos como v[major]-[minor] y anidamiento parent.vue + parent/ fusionado en una sola ruta. Los archivos que empiezan por - se ignoran. Con includeApi se escanean server/api (con prefijo /api) y server/routes y se quitan los sufijos .get/.post.

**Límites y verificación.** El módulo también escribe .nuxt/named-routes/pages.json, así que named-routes check y generate ven las mismas rutas después de nuxt prepare. Ponlo antes de @nuxtjs/i18n en modules, para que vea las rutas antes de que se localicen. El plugin de Vite sigue funcionando en Nuxt, pero solo ve los archivos. Los nombres siguen el estilo con puntos de este paquete (users.$id), no los nombres de ruta de Nuxt (users-id). Verificado con tests de convenciones y con examples/nuxt, que compila y se ejecuta con Nuxt 4, incluida una página con definePageMeta({ path }).

```text
app/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
