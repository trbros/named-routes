# Contribua passo a passo

[Documentação](index.md) / [Projeto e versões](project.md)

[English](../en/topic-contributing.md) · [Português](../pt/topic-contributing.md) · [Español](../es/topic-contributing.md) · [日本語](../ja/topic-contributing.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="contributing"></a>

**1. Pré-requisitos.** Instale Node.js 22.12 ou superior (22.18+ se quiser carregar arquivos named-routes.config.ts), Git e Python 3 (usado apenas para gerar os READMEs). Ative o pnpm 12.16.1, a versão fixada no package.json: corepack enable ou npm install --global pnpm@12.16.1.

**2. Clone e compile.** Clone o repositório, rode pnpm install na raiz e depois pnpm build. O build limpa o dist/ e compila src/*.ts para JavaScript ESM, declarações e source maps. Rode pnpm build de novo a cada mudança em src/: o site e as demos usam o dist/, não os fontes TypeScript.

**3. Conheça a estrutura.** src/index.ts é o runtime que roda no navegador (createRoutes, i18n, padrões); src/frameworks.ts tem os adaptadores de convenção de arquivos; src/generator.ts descobre, valida e escreve o módulo; src/config.ts carrega named-routes.config.*; src/next.ts e src/vite.ts são as integrações; src/cli.ts é o binário named-routes. tests/ tem a suíte Node e os smoke tests. docs/locales.json lista os idiomas, docs/content.json guarda a documentação multilíngue e website/messages/<código>.json os textos da interface. website/ é este site, examples/ tem uma demo por framework e scripts/ tem os utilitários de release, documentação e idiomas.

**4. Teste enquanto desenvolve.** pnpm check compila e roda todos os testes Node mais os contratos TypeScript positivos e negativos; é o que o CI executa no Node 20, 22, 24 e 26. pnpm test:next inicia servidores reais do Next.js (instale antes examples/app-router com pnpm --dir examples/app-router install). pnpm test:vite inicia um servidor Vite real. pnpm test:package empacota o tarball e o instala em um projeto limpo. pnpm release:check roda todos eles.

**5. Edite a documentação.** docs/content.json é a fonte única do site e de todos os READMEs. Cada seção tem id, title.<código>, paragraphs.<código> (uma lista de parágrafos por idioma), code e language; os códigos são en, pt, es e ja. O inglês é o idioma de origem: escreva primeiro o texto em inglês e mantenha o mesmo número de parágrafos em todos os idiomas. **texto** vira negrito no site e no README. Uma seção nova também precisa entrar em um grupo de docs/groups.json (a barra lateral do site e as páginas de tópicos do README), senão o pnpm run docs falha. A página dela é /docs/<id>.

**6. Traduza e sincronize os idiomas.** Rode pnpm locales (node scripts/sync-locales.mjs) depois de mudar textos em inglês. Ele compara cada idioma com o inglês em docs/content.json e website/messages/*.json, preenche o que faltar com o texto em inglês para o site continuar funcionando, remove chaves da interface que não existem mais no inglês, reordena as chaves conforme o en.json e imprime a lista "Needs translation". Traduza cada item listado no seu idioma e depois rode pnpm locales:check (node scripts/sync-locales.mjs --check): ele não altera nada e falha quando faltam títulos ou parágrafos, quando o número de parágrafos é diferente, quando os marcadores **negrito** estão desbalanceados, quando faltam ou sobram chaves da interface, quando placeholders ICU como {count} diferem, quando as chaves estão fora de ordem ou quando um idioma não está em website/lib/locales.ts. O CI roda esse check. node scripts/sync-locales.mjs --untranslated também lista textos que ainda estão iguais ao inglês, útil para revisar um idioma antes de uma release.

**7. Sincronize os READMEs.** Rode pnpm run docs (python3 scripts/sync-docs.py) para gerar README.md, README.pt-BR.md, README.es.md e README.ja.md (o essencial e um índice) e as páginas de tópicos em docs/<código>/*.md (uma por grupo de docs/groups.json) a partir de docs/content.json, docs/groups.json e docs/locales.json e versione todos eles. pnpm run docs:check falha quando qualquer um desses arquivos está desatualizado; o CI roda esse check, então nunca os edite à mão. A ordem usual é: editar o inglês, pnpm locales, traduzir, pnpm locales:check, pnpm run docs.

**8. Adicione um idioma novo.** (a) Adicione uma entrada em docs/locales.json com code, name, htmlLang, readme (por exemplo README.fr.md) e os rótulos do README contents, references, localGuide, documentation, back, previous e next. (b) Adicione o código à união Locale em website/lib/locales.ts e um título para ele em cada grupo de docs/groups.json. (c) Rode pnpm locales: ele cria website/messages/<código>.json e preenche docs/content.json com o texto em inglês como provisório. (d) Traduza cada item que ele listar. (e) Adicione o README novo à lista files do package.json. (f) Se a escrita precisar de outras fontes ou de quebra de linha diferente (como o japonês), adicione regras para html[lang="<código>"] em website/app/transit.css. (g) Rode pnpm locales:check, pnpm run docs, pnpm --dir website check:i18n e pnpm --dir website build. O seletor de idioma do header passa a mostrar o idioma novo automaticamente.

**9. Edite os textos do site.** As strings da interface ficam em website/messages/<código>.json dentro de ui, com as mesmas chaves em todos os arquivos; a sintaxe ICU é verificada, então evite chaves sem escape e mantenha os placeholders idênticos. Adicione chaves novas primeiro no en.json, depois rode pnpm locales e traduza. pnpm --dir website check:i18n valida todos os catálogos. Os dados de frameworks da landing (linhas do painel, linhas do mapa, tabela de compatibilidade) ficam em website/lib/transit.ts e precisam corresponder a saídas reais do gerador.

**10. Rode o site.** Depois do pnpm build na raiz, rode pnpm --dir website install uma vez e pnpm --dir website dev (ou pnpm website). O site depende do pacote via link:.., então recompile o pacote e reinicie o servidor de desenvolvimento ao mudar src/. Troque de idioma com EN, PT, ES e JA no header. Antes de um pull request rode pnpm --dir website typecheck e pnpm --dir website build.

**11. Teste uma demo.** Cada pasta em examples/ é um app pequeno: cd examples/sveltekit (ou nuxt, vue, astro, react-router, tanstack-router, react), npm install, npm run dev. Crie uma página e veja o routes.generated.ts mudar. As demos de Next.js usam pnpm.

**12. Adicione um framework.** Escreva o adaptador em src/frameworks.ts (sources, extensions, skipDirectory, map) e ensine o detectFramework a reconhecer o pacote; adicione testes de convenção em tests/frameworks.test.mjs; crie uma demo em examples/ e inclua-a na matriz do workflow de demos; documente no docs/content.json em todos os idiomas; adicione a linha em website/lib/transit.ts somente depois que a demo compilar.

**13. Abra um pull request.** Mantenha a mudança focada, adicione testes de regressão, atualize o CHANGELOG.md na próxima versão, rode pnpm release:check, pnpm locales:check e pnpm run docs:check e nunca versione arquivos gerados (dist/, routes.generated.ts, .next/, saída de build das demos); o .gitignore já os exclui.

**14. Releases (mantenedores).** Aumente a version no package.json, mova a entrada do CHANGELOG para ela, rode pnpm release:check e publique uma release no GitHub com a tag named-routes-vX.Y.Z. O workflow de publicação valida a tag, roda o CI de novo e publica no npm com provenance via trusted publishing do npm (nenhum token do npm é armazenado). Aplica-se a Licença Apache 2.0; as fontes incluídas mantêm suas licenças OFL.

## Exemplo

```sh
git clone https://github.com/trbros/named-routes.git
cd named-routes
pnpm install
pnpm run check
```

## Tópicos relacionados

- [Site de documentação](topic-website.md)
- [Teste: demos por framework](topic-demos.md)
- [Versões e atualizações](topic-versioning.md)
- [check](topic-cli-check.md)

---

← Anterior: [Teste: demos por framework](topic-demos.md) · [Todos os tópicos](project.md) · Próximo: [Versões e atualizações](topic-versioning.md) →
