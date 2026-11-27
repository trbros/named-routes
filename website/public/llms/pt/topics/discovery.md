# Casos especiais de descoberta

Topic: `discovery` · Named Routes v2.2.0

Next.js: o scanner considera app e pages juntos. O diretório app na raiz tem prioridade sobre src/app, independentemente da mesma regra entre pages/src/pages. Os outros frameworks usam suas pastas padrão (Nuxt app/pages ou pages, Vue src/pages, SvelteKit src/routes, Astro src/pages, React Router app/routes, TanStack src/routes), a menos que routesDir seja definido. Symlinks de diretório, pastas ocultas e node_modules não são seguidos; arquivos .d.ts são ignorados.

App Router: por padrão, apenas arquivos page são incluídos. Grupos e slots não compõem URLs. Interceptações são resolvidas para caminhos canônicos e variantes equivalentes são consolidadas. Pastas privadas _ são ignoradas; %5F produz um underscore público. Arquivos layout, loading, default, error e de metadados são excluídos.

Pages Router: _app, _document e _error da raiz são excluídos; outras páginas com underscore continuam válidas. index é removido. API Routes, Route Handlers e endpoints dos outros frameworks são opcionais via includeApi ou --api. As URLs não modelam métodos HTTP, permissões ou validação de endpoints.

Formatos de URL conflitantes (por exemplo, [id] e [slug] no mesmo lugar) e colisões de nomes inferidos interrompem a geração. No Next.js, URLs canônicas duplicadas e conflitos de especificidade com catch-all opcional também falham, assim como no Next. Em routers com layouts aninhados (Nuxt, Vue, React Router, TanStack), um layout e seu index com a mesma URL são mesclados em uma única rota.

Com a descoberta pelo framework, a tabela do framework substitui a varredura de páginas; endpoints (includeApi) continuam sendo lidos das pastas, exclude continua valendo para os arquivos informados e aliases (alias do Nuxt) ganham nomes próprios. named-routes doctor lista cada rota que existe em só uma das duas visões, para você ver o que definePageMeta, definePage ou routes.ts mudaram.
