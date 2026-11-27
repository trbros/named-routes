# Nomes semânticos e grupos

Topic: `semantic-names` · Named Routes v2.2.0

Defina naming.style como semantic para usar index em páginas-pai e show em parâmetros escalares obrigatórios finais. Os nomes atuais continuam sendo o padrão. Segmentos estáticos não são traduzidos nem singularizados. Use names para dar nomes estáveis a URLs específicas (inclusive create); atualize o mapa quando uma URL mudar. Colisões interrompem a geração.

```ts
// named-routes.config.ts
import { defineConfig } from "@triooo/named-routes/config";
export default defineConfig({
  naming: { style: "semantic" },
  names: { "/admin/alunos/novo": "admin.alunos.create" },
});
```

Related topic IDs: stable-names, naming, config-naming, generated-source
