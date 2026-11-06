# Projeto · @triooo/next-named-routes

[← Voltar ao README](../../README.pt-BR.md) · [English](../en/project.md) · [Português](../pt/project.md) · [Español](../es/project.md) · [日本語](../ja/project.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Site de documentação](#website)
- [Teste: demos por framework](#demos)
- [Contribua passo a passo](#contributing)
- [Versões e atualizações](#versioning)

<a id="website"></a>

## Site de documentação

Esta documentação é um app Next.js em website/. É o site público do projeto, construído com o próprio pacote: todos os links internos usam route(), o playground e as páginas de destino são rotas reais do App Router, e o conteúdo em inglês, português, espanhol e japonês vem do mesmo docs/content.json que gera os READMEs.

A landing page mostra cada framework suportado como uma linha de um mapa de metrô, um painel de partidas alimentado com saídas reais do gerador, uma tabela de compatibilidade e uma jornada de instalação. As animações são finitas ou acionadas pelo usuário, pausam fora da tela e são desativadas por prefers-reduced-motion.

Para publicar na Vercel, crie um projeto com Root Directory em website e mantenha "Include files outside the root directory" ativado. O website/vercel.json instala o repositório, compila o pacote e depois compila o site. Nenhuma variável de ambiente é necessária.

```sh
# From the repository root:
pnpm install
pnpm build
pnpm --dir website install
pnpm --dir website dev
# http://localhost:3000
pnpm --dir website build
```

<a id="demos"></a>

## Teste: demos por framework

examples/ tem um app pequeno e executável para cada configuração suportada: app-router e pages-router (Next.js), nuxt, vue (unplugin-vue-router), sveltekit, astro, react-router (flat routes), tanstack-router e react (rotas declaradas manualmente com createRoutes). Cada um aponta por nome para uma página estática, uma página dinâmica de usuários e uma página catch-all de docs.

As demos dependem do pacote via file:../.., então compile o pacote uma vez na raiz do repositório e depois instale e rode qualquer demo com npm. O módulo gerado aparece no primeiro dev ou build e muda conforme você cria páginas. Cada demo é compilada com o framework real.

```sh
# Repository root, once:
pnpm install && pnpm build

# Any demo:
cd examples/nuxt        # or vue, sveltekit, astro, react-router, tanstack-router, react
npm install
npm run dev
# create a page and watch routes.generated.ts update
```

<a id="contributing"></a>

## Contribua passo a passo

**1. Pré-requisitos.** Instale Node.js 20.19 ou superior (22.18+ se quiser carregar arquivos named-routes.config.ts), Git e Python 3 (usado apenas para gerar os READMEs). Ative o pnpm 12.16.1, a versão fixada no package.json: corepack enable ou npm install --global pnpm@12.16.1.

**2. Clone e compile.** Clone o repositório, rode pnpm install na raiz e depois pnpm build. O build limpa o dist/ e compila src/*.ts para JavaScript ESM, declarações e source maps. Rode pnpm build de novo a cada mudança em src/: o site e as demos usam o dist/, não os fontes TypeScript.

**3. Conheça a estrutura.** src/index.ts é o runtime que roda no navegador (createRoutes, i18n, padrões); src/frameworks.ts tem os adaptadores de convenção de arquivos; src/generator.ts descobre, valida e escreve o módulo; src/config.ts carrega named-routes.config.*; src/next.ts e src/vite.ts são as integrações; src/cli.ts é o binário named-routes. tests/ tem a suíte Node e os smoke tests. docs/locales.json lista os idiomas, docs/content.json guarda a documentação multilíngue e website/messages/<código>.json os textos da interface. website/ é este site, examples/ tem uma demo por framework e scripts/ tem os utilitários de release, documentação e idiomas.

**4. Teste enquanto desenvolve.** pnpm check compila e roda todos os testes Node mais os contratos TypeScript positivos e negativos; é o que o CI executa no Node 20, 22, 24 e 26. pnpm test:next inicia servidores reais do Next.js (instale antes examples/app-router com pnpm --dir examples/app-router install). pnpm test:vite inicia um servidor Vite real. pnpm test:package empacota o tarball e o instala em um projeto limpo. pnpm release:check roda todos eles.

**5. Edite a documentação.** docs/content.json é a fonte única do site e de todos os READMEs. Cada seção tem id, title.<código>, paragraphs.<código> (uma lista de parágrafos por idioma), code e language; os códigos são en, pt, es e ja. O inglês é o idioma de origem: escreva primeiro o texto em inglês e mantenha o mesmo número de parágrafos em todos os idiomas. **texto** vira negrito no site e no README. Uma seção nova também precisa entrar em um grupo de docs/groups.json (a barra lateral do site e as páginas de tópicos do README), senão o pnpm docs falha. A página dela é /docs/<id>.

**6. Traduza e sincronize os idiomas.** Rode pnpm locales (node scripts/sync-locales.mjs) depois de mudar textos em inglês. Ele compara cada idioma com o inglês em docs/content.json e website/messages/*.json, preenche o que faltar com o texto em inglês para o site continuar funcionando, remove chaves da interface que não existem mais no inglês, reordena as chaves conforme o en.json e imprime a lista "Needs translation". Traduza cada item listado no seu idioma e depois rode pnpm locales:check (node scripts/sync-locales.mjs --check): ele não altera nada e falha quando faltam títulos ou parágrafos, quando o número de parágrafos é diferente, quando os marcadores **negrito** estão desbalanceados, quando faltam ou sobram chaves da interface, quando placeholders ICU como {count} diferem, quando as chaves estão fora de ordem ou quando um idioma não está em website/lib/locales.ts. O CI roda esse check. node scripts/sync-locales.mjs --untranslated também lista textos que ainda estão iguais ao inglês, útil para revisar um idioma antes de uma release.

**7. Sincronize os READMEs.** Rode pnpm docs (python3 scripts/sync-docs.py) para gerar README.md, README.pt-BR.md, README.es.md e README.ja.md (o essencial e um índice) e as páginas de tópicos em docs/<código>/*.md (uma por grupo de docs/groups.json) a partir de docs/content.json, docs/groups.json e docs/locales.json e versione todos eles. pnpm docs:check falha quando qualquer um desses arquivos está desatualizado; o CI roda esse check, então nunca os edite à mão. A ordem usual é: editar o inglês, pnpm locales, traduzir, pnpm locales:check, pnpm docs.

**8. Adicione um idioma novo.** (a) Adicione uma entrada em docs/locales.json com code, name, htmlLang, readme (por exemplo README.fr.md) e os rótulos do README contents, references, localGuide, documentation, back, previous e next. (b) Adicione o código à união Locale em website/lib/locales.ts e um título para ele em cada grupo de docs/groups.json. (c) Rode pnpm locales: ele cria website/messages/<código>.json e preenche docs/content.json com o texto em inglês como provisório. (d) Traduza cada item que ele listar. (e) Adicione o README novo à lista files do package.json. (f) Se a escrita precisar de outras fontes ou de quebra de linha diferente (como o japonês), adicione regras para html[lang="<código>"] em website/app/transit.css. (g) Rode pnpm locales:check, pnpm docs, pnpm --dir website check:i18n e pnpm --dir website build. O seletor de idioma do header passa a mostrar o idioma novo automaticamente.

**9. Edite os textos do site.** As strings da interface ficam em website/messages/<código>.json dentro de ui, com as mesmas chaves em todos os arquivos; a sintaxe ICU é verificada, então evite chaves sem escape e mantenha os placeholders idênticos. Adicione chaves novas primeiro no en.json, depois rode pnpm locales e traduza. pnpm --dir website check:i18n valida todos os catálogos. Os dados de frameworks da landing (linhas do painel, linhas do mapa, tabela de compatibilidade) ficam em website/lib/transit.ts e precisam corresponder a saídas reais do gerador.

**10. Rode o site.** Depois do pnpm build na raiz, rode pnpm --dir website install uma vez e pnpm --dir website dev (ou pnpm website). O site depende do pacote via link:.., então recompile o pacote e reinicie o servidor de desenvolvimento ao mudar src/. Troque de idioma com EN, PT, ES e JA no header. Antes de um pull request rode pnpm --dir website typecheck e pnpm --dir website build.

**11. Teste uma demo.** Cada pasta em examples/ é um app pequeno: cd examples/sveltekit (ou nuxt, vue, astro, react-router, tanstack-router, react), npm install, npm run dev. Crie uma página e veja o routes.generated.ts mudar. As demos de Next.js usam pnpm.

**12. Adicione um framework.** Escreva o adaptador em src/frameworks.ts (sources, extensions, skipDirectory, map) e ensine o detectFramework a reconhecer o pacote; adicione testes de convenção em tests/frameworks.test.mjs; crie uma demo em examples/ e inclua-a na matriz do workflow de demos; documente no docs/content.json em todos os idiomas; adicione a linha em website/lib/transit.ts somente depois que a demo compilar.

**13. Abra um pull request.** Mantenha a mudança focada, adicione testes de regressão, atualize o CHANGELOG.md na próxima versão, rode pnpm release:check, pnpm locales:check e pnpm docs:check e nunca versione arquivos gerados (dist/, routes.generated.ts, .next/, saída de build das demos); o .gitignore já os exclui.

**14. Releases (mantenedores).** Aumente a version no package.json, mova a entrada do CHANGELOG para ela, rode pnpm release:check e publique uma release no GitHub com a tag next-named-routes-vX.Y.Z. O workflow de publicação valida a tag, roda o CI de novo e publica no npm com provenance via trusted publishing do npm (nenhum token do npm é armazenado). Aplica-se a Licença Apache 2.0; as fontes incluídas mantêm suas licenças OFL.

```sh
# 1-2. Prepare the repository
corepack enable                  # or: npm i -g pnpm@12.16.1
git clone <repository-url> next-named-routes && cd next-named-routes
pnpm install
pnpm build

# 4. Test
pnpm check                       # build + Node tests + TypeScript contracts
pnpm --dir examples/app-router install && pnpm test:next
pnpm test:vite
pnpm test:package
pnpm release:check               # everything above

# 5-7. Documentation in every language
$EDITOR docs/content.json        # English first
pnpm locales                     # fill gaps, list what needs translation
$EDITOR docs/content.json website/messages/*.json   # translate pt, es, ja
pnpm locales:check               # what CI runs
node scripts/sync-locales.mjs --untranslated
pnpm docs                        # README.*.md and docs/<code>/*.md
pnpm docs:check

# 8. A new language (example: fr)
$EDITOR docs/locales.json docs/groups.json website/lib/locales.ts
pnpm locales && pnpm locales:check && pnpm docs

# 10. Website
pnpm --dir website install
pnpm --dir website dev           # http://localhost:3000
pnpm --dir website check:i18n
pnpm --dir website typecheck && pnpm --dir website build

# 11. A demo
cd examples/nuxt && npm install && npm run dev
```

<a id="versioning"></a>

## Versões e atualizações

A versão 1.x define o contrato público para nomes inferidos, geração tipada de URLs, adaptadores de framework, i18n, o wrapper do Next.js, o plugin Vite e a CLI.

Versões patch preservam a API documentada enquanto corrigem bugs. Versões minor adicionam funcionalidades compatíveis, como novos adaptadores de framework. Mudanças incompatíveis exigem uma nova versão major. Consulte o changelog antes de atualizar.

Depois de atualizar, reinicie o servidor de desenvolvimento para regenerar o manifesto e execute o type check e os testes de navegação da aplicação. Se mover uma página e precisar preservar o nome público da rota, use um alias explícito.

```sh
npm install @triooo/next-named-routes@^1
npx named-routes check
npx tsc --noEmit
```

---

← Anterior: [Guias](guides.md) · [Voltar ao README](../../README.pt-BR.md)
