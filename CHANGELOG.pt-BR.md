# Histórico de alterações

## 2.2.0 - 2026-11-26

Esta versão torna a geração de URLs nomeadas mais explícita, melhora os caminhos de deploy conforme o framework e a descoberta de endpoints, amplia a documentação e integra agentes de IA ao pacote principal. Também reforça a execução da CLI e a substituição atômica de arquivos no Windows.

### Adicionado

- `route.url(name, { params, query, ... })`: gera URLs públicas com a base configurada por padrão, usando um objeto de opções explícito em vez de argumentos posicionais vazios. Os nomes e parâmetros continuam tipados.
- Nomenclatura semântica opcional com `naming.style: "semantic"`, incluindo as convenções `index` e `show`. Os mapeamentos explícitos `names` continuam disponíveis para aliases estáveis específicos da aplicação.
- Descritores HTTP tipados via `route.endpoint(name, method)` e exportação gerada `api` quando `includeApi` está habilitado e os métodos podem ser identificados estaticamente. Os descritores contêm método e URL; não executam handlers nem enviam requisições. A descoberta de métodos depende do framework.
- `llms.txt`, `llms-full.txt`, convenções para agentes e referências Markdown versionadas por framework e tópico, sincronizadas com a documentação em inglês, português, espanhol e japonês.
- Servidor Model Context Protocol (MCP) somente leitura distribuído diretamente em `@triooo/named-routes`, disponível via `named-routes mcp` e `named-routes-mcp`. Não é necessário outro pacote npm. Usa stdio e dependências opcionais, mantendo o MCP fora do runtime do navegador.
- Seis ferramentas MCP: `get_agent_contract`, `search_docs`, `get_topic`, `get_framework_guide`, `list_routes` e `get_route`. Agentes podem consultar a documentação versionada e inspecionar um manifesto já gerado sem executar código da aplicação ou modificar arquivos.

### Alterado

- Helpers gerados passam a incluir automaticamente a base de navegação configurada em Astro, SvelteKit e manifestos manuais gerados. Next.js, Nuxt, Vue Router, React Router e TanStack Router mantêm caminhos internos por padrão para a navegação realizada pelos roteadores nativos.
- `route.url()` oferece a alternativa de caminho público entre frameworks. `basePath: true` ou `basePath: false` explícitos continuam controlando a inclusão da base em `route()`; `createRoutes()` direto mantém seu comportamento padrão anterior.
- Manifestos gerados incluem comentários com caminhos relativos dos arquivos de origem e usam chaves literais de string comuns quando seguro, em vez de chaves computadas desnecessárias. A chave `__proto__` continua protegida pela sintaxe computada.
- Substituição do entry point compilado da CLI no mapeamento npm `bin` por um launcher estável que resolve a implementação relativamente à própria localização, independentemente do diretório atual.
- Exemplos dos frameworks ampliados para além de páginas estáticas, com navegação entre páginas, parâmetros dinâmicos e exemplos específicos de endpoints quando suportados.

### Corrigido

- Exposição explícita do helper `asset` em `TypedNamedRoutes`, evitando erros de propriedade ausente nos módulos TypeScript gerados.
- Melhoria do empacotamento da CLI e da resolução do executável em chamadas npm com escopo, incluindo `npx @triooo/named-routes`, com diagnóstico explícito de arquivos compilados ausentes.
- Novas tentativas para erros transitórios `EPERM`, `EACCES` e `EBUSY` durante a substituição atômica dos manifestos e snapshots de frameworks. O backoff progressivo limitado preserva o último arquivo válido e propaga falhas persistentes ou não transitórias. Trata a falha observada no Windows durante a remoção de rotas em tempo real no TanStack Router.

### Documentação

- Documentação reorganizada em tópicos navegáveis individualmente, guias por framework, referências de API específicas, opções de configuração, comandos CLI e receitas práticas. Os IDs e âncoras Markdown anteriores são preservados.
- Exemplos separados para deploy na raiz do domínio e sob `base` ou `basePath`, explicando quando o roteador nativo aplica o prefixo e quando é necessária uma URL pública.
- Atualização dos quatro READMEs e das páginas Markdown geradas; navegação entre tópicos relacionados, busca aprimorada e componentes Accordion e Button do shadcn/ui no índice de tópicos.
- Guias MCP dedicados a instalação, configuração de projeto local, Claude Desktop e Claude Code, Cursor, Codex, VS Code e GitHub Copilot, launcher no Windows, referência de ferramentas, fluxos de exemplo, limites de segurança e diagnóstico com MCP Inspector.
- Catálogo MCP, referências para agentes de IA, documentação do site e READMEs sincronizados a partir da fonte compartilhada.
- Adiciona changelogs totalmente localizados em inglês, português, espanhol e japonês, incluindo a página de releases e o seletor de versões da documentação no idioma ativo.

### Website e SEO

- Geração de `sitemap.xml` a partir do catálogo de documentação e idiomas suportados, além de `robots.txt` com descoberta do sitemap.
- Títulos e descrições localizados, URLs canônicas, alternates `hreflang` recíprocos com `x-default`, metadados Open Graph e Twitter Card e dados estruturados de software e breadcrumbs.
- Centralização da origem pública e base de deploy para URLs SEO consistentes. Suporte à verificação do Google Search Console e exclusão de previews, páginas de demonstração parametrizadas e espelhos de documentação legíveis por máquinas da indexação como conteúdo duplicado.

### Testes e ferramentas de release

- Ampliação da cobertura de regressão e contratos TypeScript para URLs públicas, bases por framework, nomes semânticos, descritores gerados de endpoints e assets tipados.
- Ampliação dos testes de empacotamento para launchers estáveis, execução npm com escopo e entry points MCP integrados; testes de catálogo, parsing de manifestos e protocolo MCP.
- Testes de regressão de tentativas limitadas para erros transitórios de filesystem, falhas persistentes e preservação do arquivo gerado anterior.
- Verificação de exemplos da documentação e validação SEO de URLs do sitemap, metadados canônicos, alternates por idioma e caminhos de deploy.
- Gera os arquivos Markdown traduzidos do changelog e um catálogo estático do website a partir do changelog em inglês e das traduções por entrada; o CI rejeita traduções ausentes ou desatualizadas.

### Notas de atualização

- Projetos Astro, SvelteKit e manuais gerados que antes prefixavam o resultado de `route()` devem remover o prefixo adicional ou solicitar explicitamente um caminho interno com `{ basePath: false }` no terceiro argumento. Use `route.url()` para URLs públicas em vez de concatenar a base manualmente.
- Nomes semânticos continuam opcionais; os nomes automáticos existentes não mudam, exceto se o novo estilo ou aliases explícitos forem configurados.
- Após atualizar, regenere o módulo de rotas com `pnpm exec named-routes generate` ou reinicie a integração do framework. Não edite manualmente o manifesto gerado.
- O MCP está incluído no pacote principal. Use `npx @triooo/named-routes mcp` em vez de instalar outro pacote MCP. Instale as dependências opcionais se o suporte MCP tiver sido omitido.

## 2.1.0 - 2026-11-26

Documentação de helpers de rotas e assets públicos dividida em páginas multilíngues específicas, com exemplos focados em cada API existente e configuração independente de CDN.

### Adicionado

- `@triooo/named-routes/astro`: integração nativa que herda o `base` final do Astro independentemente da base de assets do Vite.
- `namedRoutes({ routerBase })` aceita um prefixo ou getter para SvelteKit, Vue Router, React Router/Remix e TanStack Router; `inheritViteBase` permite usar a base do Vite quando também for a de navegação.
- `route.localize(url, locale?, options?)` resolve aliases traduzidos entre idiomas mesmo sem prefixo de locale, preserva parâmetros decodificados e query/fragmento originais, suporta prefixos personalizados, bases e domínios configurados e retorna `null` para rotas ambíguas ou não localizadas. `route.match()` mantém a semântica anterior.
- `--base-path` para geração independente, watch, check, list e doctor; integrações armazenam a última base pública efetiva bem-sucedida em `.named-routes/` para que a regeneração pela CLI não a descarte.
- Descoberta opcional de assets públicos, tipos estritos de caminhos gerados, asset.has(), asset.paths() e asset.info().
- Hash de conteúdo de assets e URLs para invalidação de cache com asset(path, { version: true }); alterações observadas de assets regeneram os manifestos.
- route.withQuery() para alterações de query, valores repetidos e validação opcional por schema nomeado.
- route.canonical(), route.alternates() e contextos isolados route.withDefaults() para SEO, SSR e URLs multi-tenant.
- Comando CLI audit somente leitura com diagnóstico de rotas e assets, saída JSON e modo estrito para CI.
- Documentação multilíngue de helpers avançados, playground de URLs com runtime real, testes unitários/de tipos/do gerador e verificações E2E de versionamento de assets em produção.
- `asset()` / `route.asset()` e `defaults.assetBase` independente para caminhos públicos e CDN; tipos de assets exportados e exports gerados personalizáveis. Verificações de arquivos públicos no navegador nos nove exemplos, regressões para route/localize/match/parseQuery e guias multilíngues de assets.

### Corrigido

- Nuxt herda `app.baseURL`; Next.js mantém a inclusão automática de `basePath` existente e sincroniza o snapshot da CLI quando a base muda ou é removida.
- Vite ignora escritas atômicas do módulo e snapshots de base, evitando execuções redundantes do watcher. Nomes canônicos independem dos prefixos de deploy; links dos frameworks não recebem prefixo duplicado.
- Builds validam shebang e permissão executável da CLI; testes do pacote exercitam a resolução npm com e sem instalação local. A documentação usa `npx @triooo/named-routes` para evitar o pacote sem escopo não relacionado.
- Testes de regressão cobrem hooks dos frameworks, overrides de base e resolução de caminhos traduzidos, incluindo ambiguidade, preservação de query/fragmento e segmentos dinâmicos.
- Prevenção de leituras simultâneas da árvore de rotas durante a geração do TanStack Router, aguardando a atualização dos artefatos do framework.
- O watcher do Vite ignora arquivos temporários do gerador TanStack, reduzindo regenerações desnecessárias e contenção de filesystem no Windows.
- Verificação E2E de assets estáticos aprimorada em todos os frameworks suportados, incluindo decodificação de imagem, dimensões intrínsecas, status HTTP, tipo MIME e conteúdo SVG.
- Correção das respostas de arquivos estáticos no servidor de testes E2E com cabeçalhos Content-Length explícitos, suporte a HEAD e melhor tratamento de erros de streaming.
- Correção do narrowing por fluxo de controle TypeScript ao validar defaults de rotas, manifestos de assets, configuração i18n e extensões de schemas de query.
- Opções fortemente tipadas preservadas em canonical(), alternates(), withQuery() e withDefaults(), sem remover validação em runtime.
- Correção da posição da supressão Biome na validação de query de URL.
- Correção da resolução do compilador TypeScript nos testes de manifestos de assets, usando o manifesto do pacote em vez de um subpath restrito.
- Melhoria dos diagnósticos de typecheck de assets gerados em TypeScript e JavaScript.
- Melhoria da limpeza de fixtures temporárias e do tratamento de erros de subprocessos no Windows.
- Expectativas dos testes browser-safety atualizadas para incluir os novos módulos de assets e utilitários de URL seguros para navegador, mantendo o isolamento estrito das dependências do runtime.

### Documentação

- Guias de frameworks e exemplos do site atualizados para integração nativa Astro, bases de deploy, overrides CLI e URLs localizadas.

## 2.0.0 - 2026-11-25

Mudanças incompatíveis apenas onde compensam, cada uma com migração: execute `npx named-routes doctor --v2` para identificar o que se aplica e `npx named-routes migrate --to 2 --write` para fixar o comportamento 1.x quando o módulo gerado mudaria. Inclui também as correções previstas para 1.1.1, não lançada separadamente.

### Mudanças incompatíveis

- Node.js 22.12+ obrigatório (Node.js 20 está em fim de vida desde abril de 2026): `require()` de módulos ES e observação recursiva nativa em todas as plataformas. CI testa 22.12, 22, 24 e 26.
- TypeScript 5.4+ obrigatório para os tipos exportados (também o mínimo de Zod 4 e Valibot 1). CI testa 5.4, 5.9, 6 e 7.
- `hrefs: "typed"` é o padrão em módulos gerados e em `createRoutes()`: `route()` retorna tipos template literal como `` `/users/${string}` `` que `typedRoutes` do Next.js aceita sem casts. Uma variável que guarda `route()` e recebe outra string deixa de compilar; anote como `string` ou configure `hrefs: "string"` (o módulo serializa `"hrefs": "string"`). `withNamedRoutes()` e `doctor` agora avisam quando `typedRoutes` encontra `hrefs: "string"`.
- Descoberta pelo framework é o padrão (`discovery: "framework"`): quando ele publica a tabela final, os nomes vêm dela, incluindo caminhos declarados em código. Nuxt: o novo módulo `@triooo/named-routes/nuxt` lê `pages:resolved` (`definePageMeta({ path, alias })`, páginas de outros módulos; aliases têm nomes próprios) e grava `.nuxt/named-routes/pages.json` para a CLI. Vue Router 5: gera `typed-router.d.ts` (`definePage({ path })`). React Router: `react-router routes --json` (`route()`, `index()`, `layout()`, `prefix()` em `app/routes.ts`). TanStack Router: `routeTree.gen.ts`. Até existir a tabela, os arquivos são escaneados e a CLI explica o motivo. `discovery: "files"` mantém o scanner 1.x; Next.js, SvelteKit e Astro não mudam.
- Um código por classe de erro: valores inválidos de `router`, `pageExtensions` e `output` (incluindo saída dentro de uma pasta de rotas) lançam `INVALID_CONFIG` em vez de `GENERATION_ERROR`. Mensagens inalteradas.
- `typesVersions` foi removido; os tipos são publicados apenas por `exports`, portanto `moduleResolution` deve ser `bundler`, `node16` ou `nodenext`.
- Módulos gerados que importam schemas de query apenas como tipos (sem `validateQuery`) usam `TypeOnlyQueries<typeof schemas>`, portanto `route.parseQuery()` é tipado como retornando a query bruta, conforme seu comportamento real.

### Adicionado

- `route.parseQuery(name, input)`: lê a query de uma URL (URL, string de query, `URLSearchParams` ou `route.match().query`) com o schema da rota quando presente em runtime, retornando `{ ok: true, value }` com o tipo de saída do schema ou `{ ok: false, issues }`. Para chaves que o schema rejeita como strings, números e `true`/`false` escritos por `route()` são reconvertidos e valores únicos tornam-se arrays. Sem schema em runtime, retorna a query bruta. Novos tipos `QueryOutput`, `QueryParseResult`, `QueryParseInput`, `TypeOnlyQuery` e `TypeOnlyQueries`.
- `named-routes doctor` informa a origem das rotas (tabela do framework ou arquivos e motivo), rotas exclusivas de cada visão e se Nuxt usa o módulo. `doctor --v2` lista mudanças para 1.x: hrefs tipados, rotas alteradas pela descoberta do framework, `moduleResolution` incapaz de ler `exports` e código que compara `GENERATION_ERROR` (verificação textual).
- `named-routes migrate --to 2` (simulação; `--write` aplica): fixa `hrefs: "string"` e, quando as rotas diferem, `discovery: "files"` na configuração (cria `named-routes.config.mjs` se ausente). Não edita configurações de frameworks nem código da aplicação.
- O plugin Vite regenera quando o framework reescreve sua tabela e novamente antes da primeira leitura do módulo no build, após `buildStart` de todos os plugins. `named-routes watch` também observa o artefato do framework. O resumo da CLI indica a origem: `(5 routes, nuxt, from .nuxt/named-routes/pages.json)`.
- Exemplos: Nuxt usa o módulo com página `definePageMeta({ path, alias })`, Vue uma página `definePage({ path })` e React Router uma `route()` em `app/routes.ts`; o E2E navega em cada uma no navegador real.
- `pnpm test:package` verifica o tarball com [attw](https://github.com/arethetypeswrong/arethetypeswrong.github.io) (resolução node16 e bundler) e [publint](https://publint.dev) (estrito).
- `pnpm test:types` (e portanto `pnpm check` e CI) verifica os exemplos TypeScript da documentação com um módulo gerado contendo todos os nomes usados, com `hrefs: "string"` e `"typed"`; linhas documentadas como erro de tipo devem falhar.
- Documentação: guia de atualização da 1.x nos quatro idiomas, e cada página de framework descreve a origem das rotas.

### Corrigido

- Arquivos de configuração só são reimportados quando o conteúdo muda (hash em vez da data de modificação). Salvar ou tocar `named-routes.config.*` sem alterações durante `watch`, `next dev` ou Vite não deixa outra instância em memória. Node.js não descarrega módulos ES, então cada versão distinta da configuração permanece carregada até reiniciar o processo; isso foi documentado.
- Href tipado: chamar rota com chaves obrigatórias na query sem `options.query` informa `Argument of type '"search"' is not assignable to parameter of type '"search" & QueryIsRequired<"search">'` em vez de `Expected 3 arguments, but got 1`.
- `pnpm test:package` não falha mais entre releases: `npm publish --dry-run` recusa uma versão já no npm após empacotar e normalizar `package.json`, que é o que o teste verifica.

## 1.1.0 - 2026-11-14

Compatível com 1.0: novos comportamentos são opcionais ou aditivos, e códigos e mensagens de erro permanecem iguais.

### Adicionado

- `hrefs: "typed"` (configuração, `withNamedRoutes()`, plugin Vite ou `createRoutes`): `route()` retorna tipos template literal como `` `/users/${string}` `` aceitos por `typedRoutes` do Next.js em `<Link>`, `router.push()`, `replace()` e `prefetch()` sem casts. Apenas tipos; URLs idênticas. Novos tipos `RouteHref`, `RouteHrefWithSuffix` e `TypedNamedRoutes`. `withNamedRoutes()` emite dica quando `typedRoutes` é habilitado sem essa opção.
- Query tipada por rota: `defineQuery({...})` com validadores Standard Schema (Zod 3.24+, Valibot 1+, ArkType…) ou `defineQuery.type<T>()`, configurada com `query`. Chaves desconhecidas e valores incompatíveis são erros de tipo; chaves obrigatórias tornam a query obrigatória. Importação apenas como tipos por padrão; `validateQuery: true` inclui os schemas e lança `INVALID_QUERY` para valores inválidos. Nenhuma biblioteca de schemas é dependência.
- Reverse routing: `route.match(url)`, `route.is(name, url, { exact })` e `route.breadcrumbs(url)`, com precedência determinística (estático antes de dinâmico, depois ordem de declaração), decodificação segura, `basePath`, barra final, prefixos de locale, caminhos localizados e domínios i18n. URLs sem correspondência ou malformadas retornam `null`; entrada não string lança `INVALID_URL`.
- `named-routes doctor`: diagnósticos somente leitura de versões Node.js/TypeScript, configuração, framework, rotas, conflitos, saída desatualizada, integração Next.js/Vite, typedRoutes sem hrefs tipados, i18n e rotas declaradas em código invisíveis ao scanner. `--json`, `--strict` e `--no-color`; código de saída 1 em erros.
- `NamedRouteError.details` (`file`, `files`, `route`, `pattern`, `option`, `hint`) com sugestões de nomes, opções e chaves `names`. A CLI as imprime.
- Modos do watcher: `watchMode` (`auto`, `native`, `poll`) para `withNamedRoutes()` e `--watch-mode` para `named-routes watch`.
- E2E em frameworks reais (`pnpm test:e2e`): cada exemplo instala o tarball, verifica tipos, compila, serve o build de produção e navega no Chromium pelos links gerados; uma página é criada, renomeada e removida durante o dev server. CI roda todos no Linux, e Next.js App Router e Vue no Windows e macOS, condicionando a publicação.
- Teste real do contrato Next.js `typedRoutes` (`next typegen` + `tsc`), `next build` + `next start` no smoke test Next.js, teste browser-safety do runtime, matriz de contratos TypeScript 5.0/5.4/5.9/6/7, lint/formatação Biome (`pnpm lint`, `pnpm format`) e benchmark do watcher (`pnpm bench:watch`).
- Website: playground mostra `route.match()` e `route.breadcrumbs()` nas rotas do próprio site; documentação de hrefs tipados, query tipada, reverse routing e doctor em inglês, português, espanhol e japonês.

### Alterado

- Next.js dev e `named-routes watch` reagem a eventos de arquivos (debounce e serialização) com rescan de reconciliação de 5 s em vez de varredura a cada 750 ms. Polling automático em discos Windows no WSL, com `WATCHPACK_POLLING`/`CHOKIDAR_USEPOLLING`/`NAMED_ROUTES_WATCH=poll`, ou quando o sistema recusa watchers. Medições `pnpm bench:watch` (Linux, Node 26, mediana de 3): 200 rotas, CPU ociosa 36 → 6 ms/s e adição → módulo 478 → 90 ms; 2000 rotas, 153 → 29 ms/s e 582 → 203 ms. `watchMode: "poll"` restaura o comportamento 1.0.
- Exemplos: Next.js App Router usa `typedRoutes` com hrefs tipados e link com query; Pages Router usa i18n, link em `pt` e link com query; ambos têm página docs catch-all. Vue usa Vue Router 5 (`vue-router/vite`) com layout `_parent.vue`. Lockfiles novamente sincronizados com package.json.
- CI: testes de pacote em Windows e macOS, contratos em várias versões TypeScript e workflow E2E (substitui demos apenas com build); Dependabot também atualiza ferramentas npm, exemplos e site.

### Corrigido

- Vue Router 5 file-based: `_parent.vue` é um pai não navegável e não gera mais rota fantasma como `users._parent`.
- O watcher ignora o arquivo temporário da escrita atômica do módulo gerado, evitando regeneração extra.
- Módulos do antigo pacote `@triooo/next-named-routes` são reconhecidos como gerados e substituídos em vez de falhar com "Refusing to overwrite".
- Ajuda da CLI e documentação não descrevem mais `named-routes` como alias de si mesmo; React Router 8 e Vue Router 5 são nomeados nas demos correspondentes; SPEC marca 1.0.0 como publicada.

## 1.0.0

- Contrato v1 estável para nomes automáticos, geração de URLs, parâmetros tipados, comandos CLI, wrapper de config Next e plugin Vite.
- Adapters: Next.js (App Router e Pages Router), Nuxt (páginas e rotas Nitro), Vue Router file-based, SvelteKit, Astro, React Router / Remix flat routes e TanStack Router, além de modo `manual` para rotas declaradas em código. Framework detectado pelo package.json.
- `@triooo/named-routes/vite`: `namedRoutes()` gera ao iniciar/compilar e acompanha adição/remoção de arquivos via watcher Vite.
- i18n desde v1: opção `locale`, `forLocale()`, `locales()`, `localePrefix` (always, as-needed, never, prefixos personalizados), `pathnames` localizados, `domains`, remoção automática de pastas `[locale]`/`[lang]`, pastas físicas de idiomas, endpoints não localizados e `RouteLocale` tipado. Opções espelham `defineRouting()` do next-intl; `i18n` do Pages Router Next.js herdado automaticamente.
- Novos padrões: parâmetros únicos opcionais `[[id]]`, segmentos mistos como `v[major]-[minor]` e catch-all antes de segmentos estáticos.
- Configuração: `named-routes.config.ts/.mts/.mjs/.js/.cjs/.json`, `defineConfig`, `routesDir`, `appDir`/`pagesDir`, globs `exclude`, `naming` (separador, prefixo de parâmetro, nome home, transform), `importSource`, `exportNames` e saídas `.ts/.mts/.js/.mjs`. Opções desconhecidas lançam `INVALID_CONFIG`.
- Binário CLI `named-routes` (alias `named-routes`) com `init`, `--framework`, `--routes-dir`, `--watch-interval` e `--version`.
- Segurança: `next start` nunca escreve o manifesto (deploy somente leitura); apenas `basePath`, `trailingSlash`, `origin` e i18n públicos são serializados; temporários criados exclusivamente; `importSource` e nomes de exports validados antes de escrever código.
- Verificação de releases instala o tarball real num consumidor limpo e verifica runtime, CLI, exports, packlist e contratos TypeScript; smoke tests reais Next.js e Vite em CI.
- Documentação e website em inglês, português, espanhol e japonês (`docs/locales.json`), com `scripts/sync-locales.mjs` (`pnpm locales`, `pnpm locales:check`) mantendo idiomas sincronizados em CI e um README por idioma.
- Página de comparação com pacotes alternativos e roteamento tipado nativo, baseada nas respectivas documentações publicadas e dados npm.
- Site de documentação (`website/`, publicável na Vercel) redesenhado com metáfora de transporte: painel de partidas, mapa interativo, tabela de compatibilidade transparente e páginas animadas; novo logo N de linha de rota. Demos executáveis para todos os frameworks suportados em `examples/`.
