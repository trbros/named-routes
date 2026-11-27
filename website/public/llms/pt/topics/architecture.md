# Como a geração funciona

Topic: `architecture` · Named Routes v2.2.0

O gerador Node lê arquivos e tabelas de rotas do framework. Analisa declarações de endpoints estaticamente quando includeApi está ativo, sem executar handlers. A descoberta pode usar o comando de listagem do framework. O módulo gerado contém padrões públicos e helpers; o runtime do navegador não importa Node.js. O framework continua responsável por servir páginas e aplicar as regras de navegação.

```sh
npx @triooo/named-routes list
```

Related topic IDs: discovery, generator-api, generated-source
