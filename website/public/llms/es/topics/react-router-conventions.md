# Convenciones y descubrimiento

Topic: `react-router-conventions` · Named Routes v2.2.0

Crea `app/routes/users.$id.tsx`. El nombre en modo de rutas por camino es `users.$id`. El framework sigue renderizando la página.

**Convenciones.** Los puntos anidan (concerts.$city.tsx es /concerts/[city]); _index es el índice; $param; ($lang) es opcional ([[lang]]); un $ solo es un splat llamado splat ([[...splat]]); los prefijos _auth son layouts sin ruta; concerts_ excluye el anidamiento; los escapes [.] conservan caracteres; una carpeta con route.tsx es una ruta y las carpetas más profundas se ignoran. Un layout y su _index comparten URL y se fusionan.

**Límites y verificación.** Sin @react-router/dev instalado, o cuando el comando falla, se recorren los archivos de flat routes anteriores y la CLI indica el motivo. Los segmentos estáticos opcionales como (beta) no se pueden nombrar; el generador se detiene con un error claro para que excluyas el archivo. Verificado con tests de convenciones y con examples/react-router, que compila y se ejecuta con React Router 8, incluida una ruta declarada con route() en app/routes.ts.

```text
app/routes/users.$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
