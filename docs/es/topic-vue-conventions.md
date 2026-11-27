# Convenciones y descubrimiento

[Documentación](index.md) / [Vue Router](framework-vue.md)

[English](../en/topic-vue-conventions.md) · [Português](../pt/topic-vue-conventions.md) · [Español](../es/topic-vue-conventions.md) · [日本語](../ja/topic-vue-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="vue-conventions"></a>

Crea `src/pages/users/[id].vue`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** index.vue y (nombre).vue son rutas index; los puntos anidan (users.edit.vue es /users/edit); [id] y [[id]]; [id]+ es un parámetro repetible de uno o más ([...id]) y [[id]]+ de cero o más ([[...id]]); [...path] también acepta un resto vacío ([[...path]]); las carpetas (grupo) se omiten; el anidamiento parent.vue + parent/ se fusiona; los segmentos mixtos como v[major]-[minor] funcionan.

**Verificado.** Los nombres salen del typed-router.d.ts que escribe Vue Router 5 (opción dts), así que las rutas sobrescritas con definePage({ path }) se nombran por la URL que sirven; antes de que exista, se recorren los archivos. Un servidor Vite real con estas convenciones se ejecuta en CI, y examples/vue se compila, se ejecuta y se recorre en un navegador con Vue Router 5 (vue-router/vite), incluido un layout users/_parent.vue y una página con definePage({ path }).

## Ejemplo

```text
src/pages/users/[id].vue
  → users.$id
  → /users/[id]
```

## Temas relacionados

- [Reglas de nombres automáticos](topic-naming.md)
- [Nombres semánticos y grupos](topic-semantic-names.md)
- [Casos límite del descubrimiento](topic-discovery.md)

---

← Anterior: [Vue Router: configuración](topic-vue.md) · [Todos los temas](framework-vue.md) · Siguiente: [Enlaces y navegación](topic-vue-navigation.md) →
