# Nombres estables opcionales

Topic: `stable-names` · Named Routes v2.2.0

Los nombres automáticos siguen la estructura de la URL. Si una refactorización mueve una URL pública y necesitas un nombre semántico estable, actualiza el mapa opcional names. Cada ruta con alias debe existir. Las rutas no listadas conservan sus nombres automáticos. Los nombres duplicados y los errores de escritura hacen fallar la generación en lugar de crear enlaces rotos en silencio.

Un nombre personalizado reemplaza el nombre automático de esa ruta; no añade automáticamente un segundo alias. Es útil para nombres al estilo Laravel como posts.show, pero no es necesario para el uso normal.

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```

Related topic IDs: semantic-names, config-naming, naming
