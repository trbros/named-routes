# Convenciones y descubrimiento

[Documentación](index.md) / [SvelteKit](framework-sveltekit.md)

[English](../en/topic-sveltekit-conventions.md) · [Português](../pt/topic-sveltekit-conventions.md) · [Español](../es/topic-sveltekit-conventions.md) · [日本語](../ja/topic-sveltekit-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="sveltekit-conventions"></a>

Crea `src/routes/users/[id]/+page.svelte`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** src/routes con +page.svelte, +page.ts o +page.server.ts (se fusionan en una ruta); las carpetas (grupo) se omiten; [id=matcher] conserva el parámetro y descarta el matcher; [[lang]] es opcional; [...rest] acepta cero o más segmentos ([[...rest]]) y puede ir antes de segmentos estáticos; los reinicios de layout +page@ son páginas normales; los escapes [x+2f] y [u+0041] se decodifican. Los endpoints +server son opcionales con includeApi.

**Verificación.** Las pruebas de convención y la integración examples/sveltekit cubren descubrimiento y navegación; el ejemplo actual usa SvelteKit 3 con Svelte 5.

## Ejemplo

```text
src/routes/users/[id]/+page.svelte
  → users.$id
  → /users/[id]
```

## Temas relacionados

- [Reglas de nombres automáticos](topic-naming.md)
- [Nombres semánticos y grupos](topic-semantic-names.md)
- [Casos límite del descubrimiento](topic-discovery.md)

---

← Anterior: [SvelteKit: configuración](topic-sveltekit.md) · [Todos los temas](framework-sveltekit.md) · Siguiente: [Enlaces y navegación](topic-sveltekit-navigation.md) →
