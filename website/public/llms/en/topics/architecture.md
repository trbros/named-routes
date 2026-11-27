# How generation works

Topic: `architecture` · Named Routes v2.2.0

The Node-only generator reads route files and framework route tables. It parses endpoint declarations statically when includeApi is enabled; it does not invoke endpoint handlers. Framework-specific discovery may run the framework route-list command. The generated module contains public patterns and helpers; the browser runtime has no Node.js imports. The framework remains responsible for serving pages and applying navigation rules.

```sh
npx @triooo/named-routes list
```

Related topic IDs: discovery, generator-api, generated-source
