# Convenciones y descubrimiento

Topic: `sveltekit-conventions` · Named Routes v2.2.0

Crea `src/routes/users/[id]/+page.svelte`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** src/routes con +page.svelte, +page.ts o +page.server.ts (se fusionan en una ruta); las carpetas (grupo) se omiten; [id=matcher] conserva el parámetro y descarta el matcher; [[lang]] es opcional; [...rest] acepta cero o más segmentos ([[...rest]]) y puede ir antes de segmentos estáticos; los reinicios de layout +page@ son páginas normales; los escapes [x+2f] y [u+0041] se decodifican. Los endpoints +server son opcionales con includeApi.

**Verificación.** Las pruebas de convención y la integración examples/sveltekit cubren descubrimiento y navegación; el ejemplo actual usa SvelteKit 3 con Svelte 5.

```text
src/routes/users/[id]/+page.svelte
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
