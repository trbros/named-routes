# Guias · @triooo/named-routes

[← Voltar ao README](../../README.pt-BR.md) · [English](../en/guides.md) · [Português](../pt/guides.md) · [Español](../es/guides.md) · [日本語](../ja/guides.md)

<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->

- [Casos especiais de descoberta](#discovery)
- [Atualização automática em desenvolvimento](#development)
- [CLI e CI](#cli)
- [Diagnóstico: named-routes doctor](#doctor)
- [Erros e solução de problemas](#errors)
- [Rewrites e limites](#boundaries)

<a id="discovery"></a>

## Casos especiais de descoberta

Next.js: o scanner considera app e pages juntos. O diretório app na raiz tem prioridade sobre src/app, independentemente da mesma regra entre pages/src/pages. Os outros frameworks usam suas pastas padrão (Nuxt app/pages ou pages, Vue src/pages, SvelteKit src/routes, Astro src/pages, React Router app/routes, TanStack src/routes), a menos que routesDir seja definido. Symlinks de diretório, pastas ocultas e node_modules não são seguidos; arquivos .d.ts são ignorados.

App Router: por padrão, apenas arquivos page são incluídos. Grupos e slots não compõem URLs. Interceptações são resolvidas para caminhos canônicos e variantes equivalentes são consolidadas. Pastas privadas _ são ignoradas; %5F produz um underscore público. Arquivos layout, loading, default, error e de metadados são excluídos.

Pages Router: _app, _document e _error da raiz são excluídos; outras páginas com underscore continuam válidas. index é removido. API Routes, Route Handlers e endpoints dos outros frameworks são opcionais via includeApi ou --api. As URLs não modelam métodos HTTP, permissões ou validação de endpoints.

Formatos de URL conflitantes (por exemplo, [id] e [slug] no mesmo lugar) e colisões de nomes inferidos interrompem a geração. No Next.js, URLs canônicas duplicadas e conflitos de especificidade com catch-all opcional também falham, assim como no Next. Em routers com layouts aninhados (Nuxt, Vue, React Router, TanStack), um layout e seu index com a mesma URL são mesclados em uma única rota.

<a id="development"></a>

## Atualização automática em desenvolvimento

Next.js: o wrapper gera antes de o Next iniciar e depois mantém o módulo atualizado dentro do processo de desenvolvimento. Por padrão (watchMode: "auto"), ele reage a eventos de arquivo dos diretórios de rotas e da raiz do projeto, com debounce e execução serializada, mais uma varredura a cada 5 segundos para eventos que o sistema operacional perdeu. Ele percebe páginas criadas, removidas e renomeadas; o módulo só muda quando seu conteúdo muda. Nenhum hook de webpack ou Turbopack é alterado. Nunca escreve durante o next start (servidor de produção), então deploys somente leitura são seguros.

Frameworks Vite: o plugin gera no buildStart e reage aos eventos add/unlink do watcher do Vite, além de mudanças no arquivo de configuração do named-routes. Ele encontra a raiz do projeto subindo a partir da raiz do Vite até o package.json, então o srcDir do Nuxt funciona.

Os watchers não rodam em builds de produção e não mantêm o processo vivo sozinhos. Um erro de geração durante a edição preserva o último módulo válido e registra o erro. Mudanças em módulos importados pela configuração exigem reinício. watch: false desativa apenas as atualizações contínuas, não a geração inicial.

Onde eventos de arquivo não são confiáveis, o polling assume: caminhos do WSL em /mnt, WATCHPACK_POLLING ou CHOKIDAR_USEPOLLING definidos, NAMED_ROUTES_WATCH=poll ou quando o sistema operacional recusa watchers (por exemplo, EMFILE ou ENOSPC, informado uma vez). watchMode: "poll" restaura o comportamento da 1.0 (varredura completa a cada watchInterval). Em um benchmark reproduzível (pnpm bench:watch, Linux, Node 26) com 200 rotas, a CPU ociosa caiu de 36 para 6 ms por segundo e uma nova página chegou ao módulo em 90 ms em vez de 478 ms; com 2000 rotas, de 153 para 29 ms por segundo e 203 ms em vez de 582 ms.

<a id="cli"></a>

## CLI e CI

O binário se chama named-routes. generate (padrão) escreve o manifesto. list imprime as entradas descobertas em JSON. check compara sem escrever e sai com código 1 quando está desatualizado. watch gera inicialmente e mantém o módulo atualizado até SIGINT/SIGTERM (eventos de arquivo com varredura, ou polling com --watch-mode poll). init cria named-routes.config.mjs para o framework detectado e nunca sobrescreve uma configuração existente. doctor diagnostica o projeto sem escrever nada (veja Diagnóstico).

Flags: --root <diretório>, --config <arquivo>, --framework <nome>, --output <arquivo>, --routes-dir <pasta>, --router <auto|app|pages>, --api, --watch-interval <ms>, --watch-mode <auto|native|poll>, --json, --strict e --no-color (doctor), --version (-v), --help (-h). Execute os comandos no projeto consumidor com o pacote instalado localmente. Erros mostram o code e, quando conhecidos, o arquivo, a rota, a opção e uma correção.

Se você versiona o arquivo gerado, rode check antes do build. As integrações regeneram durante o build, então um check após esse build não detecta um arquivo versionado que já estava desatualizado. A geração é determinística, atômica e sem timestamps. Arquivos existentes sem a assinatura do gerador nunca são sobrescritos.

```sh
npx named-routes init
npx named-routes generate --root ./apps/web
npx named-routes list --framework sveltekit
npx named-routes generate --routes-dir app/pages --output app/utils/routes.ts
npx named-routes check
npx named-routes watch
npx named-routes --help
npx named-routes watch --watch-mode poll   # containers, network drives
npx named-routes doctor --json --strict    # CI
```

<a id="doctor"></a>

## Diagnóstico: named-routes doctor

npx named-routes doctor verifica as versões do Node.js e do TypeScript, o arquivo de configuração, o framework detectado, as rotas descobertas, conflitos e colisões de nomes, se o módulo gerado existe e está atualizado, a integração com Next.js ou Vite, typedRoutes sem hrefs tipados, i18n sem rotas traduzidas e declarações de rotas que a leitura de arquivos não enxerga (definePageMeta({ path }) do Nuxt e chamadas route() em um app/routes.ts do React Router).

É somente leitura: nunca escreve arquivos e nunca executa código da aplicação. As verificações de integração e de declarações são heurísticas de texto, e isso é indicado na saída. Opções passadas diretamente a um plugin são código, então o doctor avisa que não consegue vê-las; mova as opções compartilhadas para o named-routes.config.* ou passe flags como --output.

Cada diagnóstico é error, warning ou info, com um id estável e, quando conhecidos, o arquivo, a rota, a opção e uma correção. --json imprime um relatório para CI e --strict também falha com warnings; cores só são usadas em um TTY e nunca com NO_COLOR ou --no-color. O código de saída 0 indica nenhum erro; 1 indica erros, ou warnings com --strict.

```sh
npx named-routes doctor
npx named-routes doctor --json --strict   # CI

# warning  Next.js typedRoutes is enabled but hrefs is not "typed"; <Link> will reject route() results.
#          option: hrefs
#          fix:   Set hrefs: "typed" in withNamedRoutes() options or named-routes.config.
```

<a id="errors"></a>

## Erros e solução de problemas

NamedRouteError estende Error e expõe um code estável. UNKNOWN_ROUTE indica nome ausente; MISSING_PARAMETER indica valor obrigatório omitido; UNKNOWN_PARAMETER indica chave extra que pertence à query ou foi digitada errado; INVALID_PARAMETER indica formato inválido ou segmento proibido; INVALID_LOCALE indica idioma passado sem i18n ou não configurado.

INVALID_PATTERN, INVALID_NAME e INVALID_MANIFEST identificam definições de rota malformadas. INVALID_OPTIONS, INVALID_QUERY e INVALID_HASH identificam opções inválidas. INVALID_BASE_PATH, INVALID_ORIGIN e INVALID_I18N rejeitam defaults de URL. MISSING_ORIGIN exige uma origin antes de pedir URLs absolutas. GENERATION_ERROR cobre conflitos de descoberta, saída insegura e check desatualizado; INVALID_CONFIG cobre configuração ausente, malformada ou com erro de digitação.

Não encontra routes.generated: confirme que a integração está rodando, execute generate e verifique output/aliases de import. basePath ou idioma duplicado: use URLs relativas com os links do framework e passe basePath/locale apenas para URLs simples. Nomes desatualizados: confirme que o watcher está ativo e veja os erros do terminal. Erro de tipo após mover uma página é esperado: atualize o nome inferido ou defina um nome estável.

A geração se recusa a sobrescrever um arquivo escrito manualmente. Escolha outro output em vez de adicionar a assinatura de gerado a um código não relacionado. Mantenha a saída gerada fora de arquivos roteáveis. A interpolação dinâmica não autoriza uma requisição; valide permissões e entradas no destino.

Desde a 1.1, todo NamedRouteError também tem details: { file, files, route, pattern, option, hint } com o que for conhecido, por exemplo os dois arquivos de um conflito de rota ou "Did you mean users.show?" para um nome, opção ou chave de names digitado errado. INVALID_QUERY indica que uma query falhou no schema ou que um mapa de schemas é inválido; INVALID_URL indica que match() recebeu algo que não é caminho nem URL. Codes e mensagens não mudaram.

```ts
import { NamedRouteError } from "@triooo/named-routes";
try {
  route("users.$user", { user: "" });
} catch (error) {
  if (error instanceof NamedRouteError) console.error(error.code);
  else throw error;
}
```

<a id="boundaries"></a>

## Rewrites e limites

Este é um construtor de URLs, não um substituto para router, middleware, autorização ou cliente HTTP. Não cria rotas em runtime, não verifica a existência de recursos, não detecta o idioma do visitante e não faz requests de backend.

Redirects, rewrites, detecção de idioma por middleware e caminhos declarados no código dos componentes continuam sendo responsabilidade da aplicação. Mapeie explicitamente padrões externos ou reescritos com extraRoutes e evite aplicar locale ou basePath duas vezes. O scanner não lê arquivos de configuração do framework; use o withNamedRoutes ou as opções para repassar configurações.

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```

---

← Anterior: [Referência da API](api-reference.md) · [Voltar ao README](../../README.pt-BR.md) · Próximo: [Projeto](project.md) →
