# Auditoria de rotas e assets

Topic: `audit` · Named Routes v2.2.0

Execute audit no projeto consumidor para encontrar referências literais a rotas/assets desconhecidos, diferenças de caixa, prefixos duplicados e caminhos hardcoded. Escaneia fontes, ignora outputs e nunca reescreve arquivos. É auditoria lexical conservadora, não parser completo: aliases, expressões multilinha e URLs dinâmicas podem escapar; revise avisos de caminhos hardcoded e src. Erros retornam 1, --strict faz avisos falharem, --json gera diagnóstico legível por máquina.

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```
