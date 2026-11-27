# Auditoría de rutas y assets

Topic: `audit` · Named Routes v2.2.0

Ejecuta audit en el proyecto consumidor para encontrar referencias literales desconocidas, diferencias de mayúsculas, prefijos duplicados y rutas hardcoded. Escanea fuentes, ignora outputs y nunca reescribe archivos. Es una auditoría léxica conservadora, no un parser completo: alias, expresiones multilínea y URLs dinámicas pueden escapar; revisa advertencias de rutas hardcoded y src. Los errores devuelven 1, --strict también falla con avisos y --json produce diagnósticos para máquinas.

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```
