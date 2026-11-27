#!/usr/bin/env python3
"""Render the same topic hierarchy for GitHub/npm and the docs website.
One topic = one Markdown file; group pages contain links, not duplicated code.
Legacy group anchors remain navigable through an index link to the new topic.
"""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--check', action='store_true')
args = parser.parse_args()

def read(name):
    return json.loads((ROOT / name).read_text(encoding='utf-8'))

sections = read('docs/content.json')
groups = read('docs/groups.json')
legacy = read('docs/legacy-groups.json')
locales = read('docs/locales.json')['locales']
version = read('package.json')['version']
by_id = {section['id']: section for section in sections}
owner = {}
paths = set()
for g in groups:
    if not re.fullmatch(r'[a-z0-9-]+\.md', g['page']) or g['page'] in paths:
        raise SystemExit(f'Invalid or duplicated group path: {g["page"]}')
    paths.add(g['page'])
    for sid in g['items']:
        if sid not in by_id or sid in owner:
            raise SystemExit(f'Unknown or repeated topic: {sid}')
        owner[sid] = g
if len(by_id)!=len(sections) or set(by_id)!=set(owner):
    raise SystemExit('Every topic must belong to exactly one group')
for sid,s in by_id.items():
    if not re.fullmatch(r'[a-z0-9-]+',sid) or 'topic-'+sid+'.md' in paths:
        raise SystemExit(f'Invalid topic ID: {sid}')
    if 'baseExamples' in s:
        examples=s['baseExamples']
        if [e['id'] for e in examples]!=['without-base','with-base'] or s['code']:
            raise SystemExit(f'Invalid deployment scenarios: {sid}')
        for example in examples:
            if not example['code'].strip() or not example['language'] or any(not example[field].get(l['code']) for field in ('title','description') for l in locales):
                raise SystemExit(f'Missing scenario content: {sid}')
    if any(x not in by_id for x in s.get('related', [])):
        raise SystemExit(f'Broken related links: {sid}')
    for lang in locales:
        code=lang['code']
        if not s['title'].get(code) or not s['paragraphs'].get(code) or len(s['paragraphs'][code])!=len(s['paragraphs']['en']):
            raise SystemExit(f'Missing or misaligned localization: {sid} ({code})')

GENERATED = '<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->'
COPY = {
    'en': {'choose':'Choose your framework','read':'Read the topic','guide':'Full documentation','related':'Related topics','example':'Example','old':'This topic now has its own page.','first':'First named route','topics':'Browse by topic','all':'All topics','setup':'Setup and framework guides'},
    'pt': {'choose':'Escolha seu framework','read':'Ler tópico','guide':'Documentação completa','related':'Tópicos relacionados','example':'Exemplo','old':'Este tópico agora possui uma página própria.','first':'Primeira rota nomeada','topics':'Navegue por assunto','all':'Todos os tópicos','setup':'Configuração e guias por framework'},
    'es': {'choose':'Elige tu framework','read':'Leer tema','guide':'Documentación completa','related':'Temas relacionados','example':'Ejemplo','old':'Este tema ahora tiene su propia página.','first':'Primera ruta con nombre','topics':'Explora por tema','all':'Todos los temas','setup':'Configuración y guías por framework'},
    'ja': {'choose':'フレームワークを選ぶ','read':'トピックを読む','guide':'全ドキュメント','related':'関連トピック','example':'例','old':'このトピックには専用ページがあります。','first':'最初の名前付きルート','topics':'トピック別に読む','all':'全トピック','setup':'フレームワーク別設定ガイド'},
}

def topic_file(sid): return f'topic-{sid}.md'
def path(code,file): return f'docs/{code}/{file}'
def switcher(file): return ' · '.join(f'[{l["name"]}](../{l["code"]}/{file})' for l in locales)
def body(s,code):
    out=[]
    for paragraph in s['paragraphs'][code]: out += [paragraph,'']
    for table in s.get('tables',[]):
        head=table['head'][code]
        out += ['**'+table['caption'][code]+'**','','| '+' | '.join(head)+' |','|'+' --- |'*len(head)]
        out += ['| '+' | '.join(row)+' |' for row in table['rows']]+['']
    for example in s.get('baseExamples', []):
        out += [f'<a id="{example["id"]}"></a>','## '+example['title'][code],'',example['description'][code],'','```'+example['language'],example['code'],'```','']
    if s['code']:
        out += ['## '+COPY[code]['example'],'','```'+s['language'],s['code'],'```','']
    return out

def index(lang):
    code=lang['code']; labels=lang['labels']
    out=['# '+labels['documentation'],'',f'`@triooo/named-routes` · **v{version}**','',f'[{labels["back"]}](../../{lang["readme"]}) · '+switcher('index.md'),'',GENERATED,'']
    for g in groups:
        out += ['## '+g['title'][code],'']
        out += [f'- [{by_id[sid]["title"][code]}]({topic_file(sid)})' for sid in g['items']]
        out += ['']
    return '\n'.join(out)

def topic(lang,sid):
    code=lang['code']; labels=lang['labels']; g=owner[sid]; s=by_id[sid]; items=g['items']; n=items.index(sid)
    out=['# '+s['title'][code],'',f'[{labels["documentation"]}](index.md) / [{g["title"][code]}]({g["page"]})','',switcher(topic_file(sid)),'',GENERATED,'',f'<a id="{sid}"></a>','']
    out+=body(s,code)
    related=list(dict.fromkeys(s.get('related',[])))
    if related:
        out += ['## '+COPY[code]['related'],'']+[f'- [{by_id[r]["title"][code]}]({topic_file(r)})' for r in related]+['']
    nav=[]
    if n:nav.append(f'← {labels["previous"]}: [{by_id[items[n-1]]["title"][code]}]({topic_file(items[n-1])})')
    nav.append(f'[{COPY[code]["all"]}]({g["page"]})')
    if n+1<len(items):nav.append(f'{labels["next"]}: [{by_id[items[n+1]]["title"][code]}]({topic_file(items[n+1])}) →')
    out+=['---','',' · '.join(nav),'']
    return '\n'.join(out)

def group_page(lang,g,old_items=()):
    code=lang['code']; labels=lang['labels']
    out=['# '+g['title'][code],'',f'[{labels["documentation"]}](index.md) · '+switcher(g['page']),'',GENERATED,'']
    # Old #topic anchors retain their destination, even when the topic moves to another group.
    ids=list(dict.fromkeys([*g['items'],*old_items]))
    for sid in ids:
        if sid not in by_id:continue
        out += [f'<a id="{sid}"></a>',f'- [{by_id[sid]["title"][code]}]({topic_file(sid)})','']
    return '\n'.join(out)

# BEGIN NAMED ROUTES README 2.2.0 TEMPLATE
def readme(lang):
    # UTF-8. Shared code samples and localized README text.
    LANGS={'en':'README.md','pt':'README.pt-BR.md','es':'README.es.md','ja':'README.ja.md'}
    CHANGES={'en':'CHANGELOG.md','pt':'CHANGELOG.pt-BR.md','es':'CHANGELOG.es.md','ja':'CHANGELOG.ja.md'}
    FRAMEWORKS=[('Next.js (App Router / Pages Router)','nextjs','`withNamedRoutes()`'),('Nuxt','nuxt','`@triooo/named-routes/nuxt`'),('Vue Router','vue','`namedRoutes()` (Vite)'),('SvelteKit','sveltekit','`namedRoutes()` (Vite)'),('Astro','astro','`@triooo/named-routes/astro`'),('React Router / Remix','react-router','`namedRoutes()` (Vite)'),('TanStack Router','tanstack-router','`namedRoutes()` (Vite)')]
    # Localized text: each pair of link labels and paths is explicit and stable.
    TEXT={
    'en':{
     'tag':'Type-safe routes, URLs and assets for seven frameworks — with an integrated MCP server for AI agents.',
     'intro':'Named Routes discovers routes from your framework and generates a typed manifest. Reference routes by name rather than hard-coded paths, build URLs and asset links, and let your framework handle rendering and navigation. The runtime does not replace your router.',
     'toc':['Documentation','Changelog','License'], 'high':'What’s new in v2.2.0',
     'new':['Explicit public URLs with `route.url(name, options)`; no positional placeholders.','Opt-in semantic route names, source-file comments in generated manifests, and typed HTTP endpoint descriptors when static method discovery is available.','Integrated read-only MCP, versioned LLM documentation, improved CLI packaging and bounded retries for transient Windows filesystem errors.','Reorganized framework guides, root/subpath examples, translated release notes and website SEO.'],
     'prev':'Already available since v2.1.0: native Astro integration, typed assets and CDN URLs, asset versioning, `route.localize()`, `route.withQuery()`, `route.canonical()`, `route.alternates()`, `route.withDefaults()` and CLI audit.',
     'install':'Installation','requirements':'Tooling requires Node.js 22.12+; exported types require TypeScript 5.4+. Choose your existing package manager. The commands below install the current published version; for an unpublished checkout, use a locally built tarball.',
     'start':'Quick start — Next.js','start1':'For example, create `src/app/users/[user]/page.tsx` in a Next.js App Router project. Configure the wrapper in `next.config.ts`.','start2':'Start the dev server or generate the module. With the default `src/routes.generated.ts` output and `@/` mapped to `src/`, use the generated helper in a component. The name below assumes default path-based naming.',
     'start3':'Do not edit generated files. Configure stable aliases or naming conventions instead. Other frameworks have their own setup and navigation guides.',
     'choose':'Choose your framework','frameworkcols':['Framework','Integration'],'manual':'Manual manifest / custom router','manualdesc':'No framework integration is required for a manually defined manifest.',
     'urls':'Public URLs and deployment paths','urlintro':'`route()` is intended for named route generation and native navigation; `route.url()` explicitly builds a public URL. These examples assume an existing Next.js generated route and its configured base.',
     'without':'Without base path','with':'With base path `/app`','urlnote':'In generated Astro, SvelteKit and manual projects, `route()` includes the configured navigation base by default in 2.2.0. Next.js, Nuxt, Vue Router, React Router and TanStack Router retain internal paths for their native routers. Use `route(name, params, { basePath: false })` when an internal path is required. Direct `createRoutes()` retains its existing default. Avoid double prefixes.',
     'features':'Explore the API','featurelabels':['Route generation and naming','Reverse routing and inspection','Typed queries and URL updates','Internationalization','Assets and CDN','SEO helpers','HTTP endpoints','Configuration and runtime reference','Generator and tooling','CLI and troubleshooting'],
     'endnote':'Endpoint descriptors contain a method and URL; they do not send requests or enforce server authorization. See framework-specific limitations before relying on generated `api` methods.',
     'mcp':'AI agents and MCP','mcpintro':'The MCP server is included in the same npm package, not a separate package. With optional dependencies installed, it runs locally over stdio. It can consult the documentation and read an existing static generated route manifest; it does not execute project configuration or edit files.',
     'mcpstart':'Verify the entry point locally. After v2.2.0 is published, the following client configuration can start the MCP server. Replace the root with your trusted project directory and merge the entry into your client’s existing configuration.',
     'mcproot':'Without `--root`, only documentation is available. Generate the manifest first for route inspection. Use `--manifest` for custom outputs (relative to the root). The server does not prove that the manifest is current or that a route is authorized or deployed. On Windows, see the direct Node launcher guide if npx shims fail.',
     'clients':'Client guides','clientlabels':['Installation','Local project','Claude Desktop / Code','Cursor','Codex','VS Code / Copilot','Windows','Tools','Example workflow','Security','Troubleshooting'],
     'prompt':'Example prompt: “Read the Named Routes contract, list the actual user routes and create a link using the correct named route and parameters. Do not invent route names or edit the generated manifest.”',
     'cli':'CLI','clinote':'The CLI runs from the application directory. Use the scoped package name with npx, or the installed binary with pnpm exec. See the CLI reference for configuration, watch and migration options.',
     'migration':'Upgrading from 2.1.0','migrationbody':'Review base-path behavior before upgrading, particularly if your Astro, SvelteKit or generated manual application already prefixes URLs. Remove duplicate prefixes or explicitly request internal paths. Semantic naming is opt-in. Regenerate your route module and run the consumer type checker.',
     'docs':'Documentation and project','docsbody':'The complete documentation has individual topics, framework guides, examples, and troubleshooting. The changelog preserves the published v2.1.0 separately from v2.2.0. Contributions and release validation are described in the project guide.',
     'links':['Full documentation','Project and releases','Local development (Portuguese)','Examples','AI agent contract','LLM index','Full LLM reference','Changelog','Apache-2.0 license']},
    'pt':{
     'tag':'Rotas, URLs e assets tipados para sete frameworks — com servidor MCP integrado para agentes de IA.',
     'intro':'O Named Routes descobre as rotas do seu framework e gera um manifesto tipado. Use nomes em vez de caminhos fixos, construa URLs e links de assets e mantenha a renderização e a navegação sob responsabilidade do framework. O runtime não substitui seu roteador.',
     'toc':['Documentação','Changelog','Licença'],'high':'Novidades da v2.2.0',
     'new':['URLs públicas explícitas com `route.url(name, options)`, sem argumentos posicionais de preenchimento.','Nomes semânticos opcionais, comentários com arquivos de origem nos manifestos e descritores HTTP tipados quando a descoberta estática de métodos está disponível.','MCP integrado e somente leitura, documentação versionada para LLMs, melhor empacotamento da CLI e novas tentativas limitadas para falhas transitórias de arquivos no Windows.','Guias reorganizados por framework, exemplos na raiz e em subdiretórios, changelogs traduzidos e SEO do website.'],
     'prev':'Já disponível desde a v2.1.0: integração nativa com Astro, assets tipados e CDN, versionamento de assets, `route.localize()`, `route.withQuery()`, `route.canonical()`, `route.alternates()`, `route.withDefaults()` e auditoria da CLI.',
     'install':'Instalação','requirements':'As ferramentas exigem Node.js 22.12+; os tipos exportados exigem TypeScript 5.4+. Escolha o gerenciador do seu projeto. Os comandos abaixo instalam a versão publicada atual; para um checkout ainda não publicado, utilize um tarball compilado localmente.',
     'start':'Primeiros passos — Next.js','start1':'Por exemplo, crie `src/app/users/[user]/page.tsx` em um projeto Next.js App Router. Configure o wrapper em `next.config.ts`.','start2':'Inicie o servidor de desenvolvimento ou gere o módulo. Com a saída padrão `src/routes.generated.ts` e `@/` apontando para `src/`, utilize o helper em um componente. O nome abaixo pressupõe a nomenclatura padrão baseada no caminho.',
     'start3':'Não edite os arquivos gerados. Configure aliases estáveis ou convenções de nomenclatura. Os demais frameworks possuem guias próprios de configuração e navegação.',
     'choose':'Escolha seu framework','frameworkcols':['Framework','Integração'],'manual':'Manifesto manual / roteador personalizado','manualdesc':'Um manifesto definido manualmente não exige integração com um framework.',
     'urls':'URLs públicas e base path','urlintro':'`route()` gera rotas nomeadas para navegação; `route.url()` constrói explicitamente uma URL pública. Os exemplos pressupõem uma rota Next.js gerada e a base configurada.',
     'without':'Sem base path','with':'Com base path `/app`','urlnote':'Nos projetos gerados para Astro, SvelteKit e modo manual, `route()` inclui a base de navegação configurada por padrão na 2.2.0. Next.js, Nuxt, Vue Router, React Router e TanStack Router mantêm caminhos internos para os roteadores nativos. Utilize `route(name, params, { basePath: false })` quando precisar de um caminho interno. O `createRoutes()` direto mantém seu comportamento padrão anterior. Evite duplicar prefixos.',
     'features':'Explore a API','featurelabels':['Geração de rotas e nomes','Reverse routing e inspeção','Queries tipadas e atualização de URLs','Internacionalização','Assets e CDN','Helpers de SEO','Endpoints HTTP','Configuração e referência do runtime','Gerador e ferramentas','CLI e solução de problemas'],
     'endnote':'Descritores de endpoints contêm método e URL; não enviam requisições nem validam a autorização no servidor. Consulte as limitações de cada framework antes de depender dos métodos gerados em `api`.',
     'mcp':'Agentes de IA e MCP','mcpintro':'O servidor MCP está incluído no mesmo pacote npm, sem instalação de outro pacote. Com as dependências opcionais instaladas, funciona localmente via stdio. Consulta a documentação e lê um manifesto estático já gerado, sem executar a configuração do projeto ou editar arquivos.',
     'mcpstart':'Verifique o executável localmente. Após a publicação da v2.2.0, a configuração abaixo poderá iniciar o servidor MCP. Substitua a raiz pelo diretório confiável do projeto e mescle a entrada à configuração existente do cliente.',
     'mcproot':'Sem `--root`, somente a documentação fica disponível. Gere o manifesto antes de consultar rotas. Utilize `--manifest` para saídas personalizadas (relativo à raiz). O servidor não comprova que o manifesto está atualizado nem que uma rota está autorizada ou publicada. No Windows, consulte o guia do launcher Node direto se os shims do npx falharem.',
     'clients':'Guias por cliente','clientlabels':['Instalação','Projeto local','Claude Desktop / Code','Cursor','Codex','VS Code / Copilot','Windows','Ferramentas','Exemplo de fluxo','Segurança','Solução de problemas'],
     'prompt':'Exemplo de prompt: “Leia o contrato do Named Routes, liste as rotas reais de usuários e crie um link com o nome e os parâmetros corretos. Não invente rotas nem edite o manifesto gerado.”',
     'cli':'CLI','clinote':'Execute a CLI no diretório da aplicação. Utilize o nome escopado com npx ou o binário instalado com pnpm exec. Consulte a referência para configuração, watch e migração.',
     'migration':'Atualizando da v2.1.0','migrationbody':'Revise o comportamento do base path antes de atualizar, principalmente se sua aplicação Astro, SvelteKit ou manual gerada já adiciona prefixos às URLs. Remova prefixos duplicados ou solicite explicitamente caminhos internos. Nomes semânticos são opcionais. Regenere as rotas e execute a verificação de tipos da aplicação.',
     'docs':'Documentação e projeto','docsbody':'A documentação completa oferece tópicos individuais, guias por framework, exemplos e solução de problemas. O changelog preserva a v2.1.0 publicada separadamente da v2.2.0. Consulte o guia do projeto para contribuições e validação de releases.',
     'links':['Documentação completa','Projeto e releases','Desenvolvimento local (português)','Exemplos','Contrato para agentes de IA','Índice LLM','Referência LLM completa','Changelog','Licença Apache-2.0']},
    'es':{
     'tag':'Rutas, URL y recursos tipados para siete frameworks — con servidor MCP integrado para agentes de IA.',
     'intro':'Named Routes descubre las rutas de tu framework y genera un manifiesto tipado. Usa nombres en lugar de rutas codificadas, construye URL y enlaces a recursos, y deja la navegación y el renderizado al framework. El runtime no reemplaza tu router.',
     'toc':['Documentación','Historial de cambios','Licencia'],'high':'Novedades de v2.2.0',
     'new':['URL públicas explícitas con `route.url(name, options)`, sin argumentos posicionales de relleno.','Nombres semánticos opcionales, comentarios de archivos de origen y descriptores HTTP tipados cuando es posible descubrir métodos estáticamente.','MCP integrado de solo lectura, documentación versionada para LLM, mejor empaquetado de CLI y reintentos limitados para errores transitorios de archivos en Windows.','Guías reorganizadas por framework, ejemplos de despliegue en raíz y subdirectorios, historial traducido y SEO del sitio.'],
     'prev':'Disponible desde v2.1.0: integración nativa de Astro, recursos tipados y CDN, versionado de recursos, `route.localize()`, `route.withQuery()`, `route.canonical()`, `route.alternates()`, `route.withDefaults()` y auditoría CLI.',
     'install':'Instalación','requirements':'Las herramientas requieren Node.js 22.12+ y los tipos exportados TypeScript 5.4+. Usa el gestor de tu proyecto. Estos comandos instalan la versión publicada actual; para un checkout sin publicar, usa un tarball compilado localmente.',
     'start':'Primeros pasos — Next.js','start1':'Por ejemplo, crea `src/app/users/[user]/page.tsx` en un proyecto Next.js App Router. Configura el wrapper en `next.config.ts`.','start2':'Inicia el servidor de desarrollo o genera el módulo. Con la salida predeterminada `src/routes.generated.ts` y `@/` apuntando a `src/`, usa el helper generado en un componente. El nombre presupone la convención predeterminada basada en rutas.',
     'start3':'No edites archivos generados. Configura alias estables o convenciones de nombres. Los demás frameworks tienen guías de configuración y navegación propias.',
     'choose':'Elige tu framework','frameworkcols':['Framework','Integración'],'manual':'Manifiesto manual / router personalizado','manualdesc':'Un manifiesto manual no necesita integración con un framework.',
     'urls':'URL públicas y base path','urlintro':'`route()` genera rutas con nombre para navegación; `route.url()` construye una URL pública explícita. Los ejemplos asumen una ruta generada de Next.js y la base configurada.',
     'without':'Sin base path','with':'Con base path `/app`','urlnote':'En proyectos generados para Astro, SvelteKit y manual, `route()` incluye por defecto la base configurada en 2.2.0. Next.js, Nuxt, Vue Router, React Router y TanStack Router mantienen rutas internas para sus routers nativos. Usa `route(name, params, { basePath: false })` si necesitas una ruta interna. `createRoutes()` directo conserva su comportamiento anterior. Evita duplicar prefijos.',
     'features':'Explora la API','featurelabels':['Generación de rutas y nombres','Routing inverso e inspección','Consultas tipadas y actualización de URL','Internacionalización','Recursos y CDN','Helpers de SEO','Endpoints HTTP','Configuración y referencia del runtime','Generador y herramientas','CLI y resolución de problemas'],
     'endnote':'Los descriptores de endpoints contienen método y URL; no envían solicitudes ni validan autorización del servidor. Consulta los límites de cada framework antes de depender de los métodos de `api`.',
     'mcp':'Agentes de IA y MCP','mcpintro':'El servidor MCP está incluido en el mismo paquete npm. Con dependencias opcionales instaladas, funciona localmente mediante stdio. Consulta documentación y lee un manifiesto estático ya generado sin ejecutar la configuración del proyecto ni editar archivos.',
     'mcpstart':'Verifica el ejecutable localmente. Tras publicar v2.2.0, esta configuración puede iniciar el servidor MCP. Sustituye la raíz por el directorio de confianza del proyecto y combina la entrada con la configuración existente del cliente.',
     'mcproot':'Sin `--root`, solo hay documentación. Genera el manifiesto antes de consultar rutas. Usa `--manifest` para salidas personalizadas (relativo a la raíz). El servidor no comprueba la vigencia del manifiesto ni que una ruta esté autorizada o desplegada. En Windows, consulta la guía del lanzador Node directo si fallan los shims de npx.',
     'clients':'Guías por cliente','clientlabels':['Instalación','Proyecto local','Claude Desktop / Code','Cursor','Codex','VS Code / Copilot','Windows','Herramientas','Ejemplo de flujo','Seguridad','Resolución de problemas'],
     'prompt':'Ejemplo de prompt: «Lee el contrato de Named Routes, enumera las rutas reales de usuarios y crea un enlace con el nombre y los parámetros correctos. No inventes rutas ni edites el manifiesto generado».',
     'cli':'CLI','clinote':'Ejecuta la CLI en el directorio de la aplicación. Usa el paquete con ámbito mediante npx o el binario instalado con pnpm exec. Consulta la referencia para configuración, watch y migración.',
     'migration':'Actualizar desde v2.1.0','migrationbody':'Revisa el comportamiento del base path, especialmente si tu aplicación Astro, SvelteKit o manual generada añade prefijos a las URL. Elimina duplicados o solicita rutas internas explícitamente. Los nombres semánticos son opcionales. Regenera las rutas y ejecuta el comprobador de tipos del proyecto.',
     'docs':'Documentación y proyecto','docsbody':'La documentación completa ofrece temas individuales, guías por framework, ejemplos y resolución de problemas. El historial conserva v2.1.0 publicada por separado de v2.2.0. Consulta la guía del proyecto para contribuir y validar releases.',
     'links':['Documentación completa','Proyecto y releases','Desarrollo local (portugués)','Ejemplos','Contrato para agentes de IA','Índice LLM','Referencia LLM completa','Historial de cambios','Licencia Apache-2.0']},
    'ja':{
     'tag':'7 つのフレームワークに対応する型安全なルート・URL・アセット。AI エージェント向け MCP サーバーを統合。',
     'intro':'Named Routes はフレームワークのルートを検出し、型付きマニフェストを生成します。固定パスの代わりに名前で参照して URL やアセットのリンクを構築し、描画とナビゲーションはフレームワークに任せます。ランタイムはルーターを置き換えません。',
     'toc':['ドキュメント','変更履歴','ライセンス'],'high':'v2.2.0 の新機能',
     'new':['`route.url(name, options)` による明示的な公開 URL 生成。不要な位置引数は不要です。','オプトインの意味的命名、生成マニフェストのソースファイルコメント、静的にメソッドを検出できる場合の型付き HTTP ディスクリプター。','読み取り専用 MCP の統合、バージョン付き LLM ドキュメント、CLI パッケージングの改善、Windows の一時的なファイルエラーに対する回数制限付き再試行。','フレームワーク別ガイド、ルートおよびサブパスの配置例、翻訳された変更履歴、サイトの SEO を改善。'],
     'prev':'v2.1.0 から利用可能：Astro ネイティブ連携、型付きアセットと CDN、アセットのバージョニング、`route.localize()`、`route.withQuery()`、`route.canonical()`、`route.alternates()`、`route.withDefaults()`、CLI 監査。',
     'install':'インストール','requirements':'ツールは Node.js 22.12 以降、公開型は TypeScript 5.4 以降が必要です。プロジェクトのパッケージマネージャーを使用してください。以下は公開済みの現行版をインストールします。未公開の checkout ではローカルでビルドした tarball を使用してください。',
     'start':'クイックスタート — Next.js','start1':'例として Next.js App Router プロジェクトに `src/app/users/[user]/page.tsx` を作成し、`next.config.ts` にラッパーを設定します。','start2':'開発サーバーを起動するかモジュールを生成します。既定の `src/routes.generated.ts` 出力と `src/` を指す `@/` エイリアスを前提に、コンポーネントで生成ヘルパーを使用します。以下の名前は既定のパスベース命名を前提としています。',
     'start3':'生成ファイルを直接編集しないでください。安定したエイリアスや命名規則を設定してください。他のフレームワークについては専用ガイドを参照してください。',
     'choose':'フレームワークを選択','frameworkcols':['フレームワーク','連携'],'manual':'手動マニフェスト / カスタムルーター','manualdesc':'手動定義のマニフェストにはフレームワーク連携が不要です。',
     'urls':'公開 URL と base path','urlintro':'`route()` は名前付きルートを生成し、`route.url()` は明示的に公開 URL を構築します。例では Next.js の生成済みルートと設定済みのベースを前提とします。',
     'without':'base path なし','with':'base path `/app` あり','urlnote':'2.2.0 では Astro、SvelteKit、手動モードの生成プロジェクトで `route()` が設定済みナビゲーションベースを既定で付加します。Next.js、Nuxt、Vue Router、React Router、TanStack Router はネイティブルーター用の内部パスを維持します。内部パスが必要なら `route(name, params, { basePath: false })` を使用してください。直接の `createRoutes()` は従来の既定動作を維持します。プレフィックスの重複を避けてください。',
     'features':'API を調べる','featurelabels':['ルート生成と命名','逆ルーティングと検査','型付きクエリと URL 更新','国際化','アセットと CDN','SEO ヘルパー','HTTP エンドポイント','設定とランタイムリファレンス','ジェネレーターとツール','CLI とトラブルシューティング'],
     'endnote':'エンドポイントのディスクリプターはメソッドと URL を含みますが、リクエスト送信やサーバー認可の検証は行いません。生成 `api` メソッドを利用する前にフレームワーク別の制限を確認してください。',
     'mcp':'AI エージェントと MCP','mcpintro':'MCP サーバーは同じ npm パッケージに含まれ、別パッケージは不要です。オプション依存関係をインストールするとローカルの stdio で動作します。ドキュメントの参照と生成済み静的マニフェストの読み取りが可能で、プロジェクト設定の実行やファイル編集は行いません。',
     'mcpstart':'ローカルの実行ファイルを確認してください。v2.2.0 の公開後は次のクライアント設定で MCP サーバーを起動できます。ルートを信頼できるプロジェクトディレクトリに置き換え、既存のクライアント設定に統合してください。',
     'mcproot':'`--root` がなければドキュメントのみ利用できます。ルートを調べる前にマニフェストを生成してください。カスタム出力には `--manifest`（ルートからの相対パス）を指定します。マニフェストの鮮度やルートの認可・デプロイ状態は検証しません。Windows で npx の shim が失敗する場合は Node 直接起動ガイドを参照してください。',
     'clients':'クライアント別ガイド','clientlabels':['インストール','ローカルプロジェクト','Claude Desktop / Code','Cursor','Codex','VS Code / Copilot','Windows','ツール','ワークフロー例','セキュリティ','トラブルシューティング'],
     'prompt':'プロンプト例：「Named Routes の規約を読み、実際のユーザールートを列挙し、正しいルート名とパラメーターでリンクを作成してください。名前を推測せず、生成マニフェストを編集しないでください。」',
     'cli':'CLI','clinote':'アプリケーションのディレクトリで CLI を実行します。npx ではスコープ付きパッケージ名、pnpm exec ではインストール済みバイナリを使用します。設定、watch、移行の詳細は CLI リファレンスを参照してください。',
     'migration':'v2.1.0 からのアップグレード','migrationbody':'更新前に base path の挙動を確認してください。特に Astro、SvelteKit、手動生成のアプリで URL にプレフィックスを付けていた場合は、重複を除去するか内部パスを明示的に要求してください。意味的命名はオプトインです。ルートモジュールを再生成し、利用側の型チェックを実行してください。',
     'docs':'ドキュメントとプロジェクト','docsbody':'全ドキュメントには個別トピック、フレームワーク別ガイド、例、トラブルシューティングがあります。変更履歴では公開済み v2.1.0 と v2.2.0 を分けて保持します。コントリビュートとリリース検証はプロジェクトガイドを参照してください。',
     'links':['全ドキュメント','プロジェクトとリリース','ローカル開発（ポルトガル語）','サンプル','AI エージェント規約','LLM インデックス','LLM 全リファレンス','変更履歴','Apache-2.0 ライセンス']}
    }
    FEATURE_PAGES=['build-with-routes.md','route-helpers.md','queries.md','internationalization.md','public-assets.md','seo.md','http-endpoints.md','api-reference.md','generator.md','guides.md']
    CLIENT_IDS=['mcp-installation','mcp-project','mcp-claude','mcp-cursor','mcp-codex','mcp-vscode','mcp-windows','mcp-tools','mcp-workflow','mcp-security','mcp-troubleshooting']

    def render_readme(code, version):
        d=TEXT[code]; base=f'docs/{code}/'; link=lambda label,target: f'[{label}]({target})'; out=[]
        def add(*lines): out.extend(lines); out.append('')
        def fence(lang,text): add('```'+lang,text,'```')
        add('# Named Routes'); add('**'+d['tag']+'**'); add(' · '.join(link(n,LANGS[l]) for l,n in [('en','English'),('pt','Português (Brasil)'),('es','Español'),('ja','日本語')]))
        add('<!-- Generated by scripts/sync-docs.py; run pnpm run docs. Do not edit directly. -->')
        add(f'`@triooo/named-routes` · **v{version}** · '+ ' · '.join(link(n,p) for n,p in zip(d['toc'],[base+'index.md',CHANGES[code],'LICENSE'])))
        add('<a id="overview"></a>',d['intro']); add('## '+d['high']); add(*('- '+x for x in d['new'])); add(d['prev']); add(link(d['toc'][1],CHANGES[code]))
        add('<a id="installation"></a>','## '+d['install']); add(d['requirements']); fence('sh','npm install @triooo/named-routes\n# or\npnpm add @triooo/named-routes'); add(link(d['install'],base+'topic-installation.md'))
        add('<a id="quick-start"></a>','## '+d['start']); add(d['start1']); fence('ts','import { withNamedRoutes } from "@triooo/named-routes/next";\n\nexport default withNamedRoutes({});'); add(d['start2']); fence('tsx','import Link from "next/link";\nimport { route } from "@/routes.generated";\n\nexport function UserLink() {\n  return <Link href={route("users.$user", { user: 42 })}>User 42</Link>;\n}'); add(d['start3']); add(link(d['start'],base+'topic-quick-start.md'))
        add('<a id="frameworks"></a>','## '+d['choose']); add('| '+' | '.join(d['frameworkcols'])+' |','| --- | --- |',*(f'| {link(name,base+"framework-"+fid+".md")} | {integration} |' for name,fid,integration in FRAMEWORKS),f'| {link(d["manual"],base+"framework-manual.md")} | `createRoutes()` |'); add(d['manualdesc']); add('<a id="naming"></a>',link(d['featurelabels'][0],base+'topic-naming.md'))
        add('## '+d['urls']); add(d['urlintro']); add('### '+d['without']); fence('ts','route("users.$user", { user: 42 }); // /users/42\nroute.url("users.$user", { params: { user: 42 } }); // /users/42'); add('### '+d['with']); fence('ts','route("users.$user", { user: 42 }); // /users/42 (Next Link adds /app)\nroute.url("users.$user", { params: { user: 42 } }); // /app/users/42'); add(d['urlnote']); add(link('basePath',base+'topic-base-path.md')+' · '+link('route.url()',base+'topic-public-url.md'))
        add('## '+d['features']); add(*(f'- {link(label,base+page)}' for label,page in zip(d['featurelabels'],FEATURE_PAGES))); add(d['endnote'])
        add('<a id="ai-agents"></a>','## '+d['mcp']); add(d['mcpintro']); fence('sh','pnpm exec named-routes mcp --help\npnpm exec named-routes-mcp --version'); add(d['mcpstart']); fence('json','{\n  "mcpServers": {\n    "named-routes": {\n      "command": "npx",\n      "args": ["-y", "@triooo/named-routes@2.2.0", "mcp", "--root", "C:/dev/my-app"]\n    }\n  }\n}'); add(d['mcproot']); add('### '+d['clients']); add(*(f'- {link(label,base+"topic-"+sid+".md")}' for label,sid in zip(d['clientlabels'],CLIENT_IDS))); add(d['prompt'])
        add('## '+d['cli']); add(d['clinote']); fence('sh','npx @triooo/named-routes list\npnpm exec named-routes generate\npnpm exec named-routes check\npnpm exec named-routes doctor\npnpm exec named-routes audit'); add(link(d['cli'],base+'topic-cli.md'))
        add('## '+d['migration']); add(d['migrationbody']); add(link(d['toc'][1],CHANGES[code]))
        add('<a id="documentation"></a>','## '+d['docs']); add(d['docsbody']); add(*(f'- {link(label,p)}' for label,p in zip(d['links'],[base+'index.md',base+'project.md','LOCAL-DEVELOPMENT.pt-BR.md','examples/','llms-agent.md','llms.txt','llms-full.txt',CHANGES[code],'LICENSE']))); return '\n'.join(out)
    return render_readme(lang["code"], version)
# END NAMED ROUTES README 2.2.0 TEMPLATE

expected={}
for lang in locales:
    code=lang['code']; expected[lang['readme']]=readme(lang)
    expected[path(code,'index.md')]=index(lang)
    for sid in by_id:expected[path(code,topic_file(sid))]=topic(lang,sid)
    old_by_page={g['page']:g for g in legacy}
    for g in groups:
        old=old_by_page.pop(g['page'],{})
        expected[path(code,g['page'])]=group_page(lang,g,old.get('items',[]))
    for g in old_by_page.values():expected[path(code,g['page'])]=group_page(lang,g)

# Validate every relative Markdown link emitted by this script (ignore links inside code and existing prose).
for name,content in expected.items():
    if not name.endswith('.md'):continue
    in_fence=False
    for line in content.splitlines():
        if line.startswith('```'):in_fence=not in_fence;continue
        if in_fence:continue
        for href in re.findall(r'\]\(([^)]+\.md)(?:#[^)]+)?\)',line):
            if '://' in href or href.startswith('#'):continue
            target=(ROOT/Path(name).parent/href).resolve()
            if not target.is_relative_to(ROOT):raise SystemExit(f'Link outside repository: {name}: {href}')
            if target.relative_to(ROOT).as_posix() not in expected and not target.exists():raise SystemExit(f'Broken Markdown link: {name}: {href}')

bad=[]
for name,content in expected.items():
    f=ROOT/name
    if args.check:
        if not f.is_file() or f.read_text(encoding='utf-8')!=content:bad.append(name)
    else:
        f.parent.mkdir(parents=True,exist_ok=True)
        f.write_text(content,encoding='utf-8',newline='\n')
if bad:
    raise SystemExit('Outdated documentation:\n'+'\n'.join(bad)+'\nRun pnpm run docs and commit the generated files.')
print(f'{"Verified" if args.check else "Generated"} {len(expected)} Markdown files; {len(sections)} individual topics, {len(groups)} groups, {len(locales)} languages.')

# Keep the AI mirrors and integrated MCP catalog synchronized with every docs run.
import subprocess
import sys
subprocess.run([sys.executable, str(ROOT / "scripts/sync-llms.py"), *(["--check"] if args.check else [])], check=True)
