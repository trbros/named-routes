# Teste: demos por framework

Topic: `demos` · Named Routes v2.2.0

examples/ tem um app pequeno e executável para cada configuração suportada: app-router e pages-router (Next.js), nuxt, vue (Vue Router 5), sveltekit, astro, react-router (flat routes), tanstack-router e react (rotas declaradas manualmente com createRoutes). Cada um aponta por nome para uma página estática, uma página dinâmica de usuários ou posts e uma página catch-all de docs; os demos do Next.js também usam typedRoutes com hrefs tipados (App Router) e i18n com query strings (Pages Router). pnpm test:e2e instala o tarball empacotado em uma cópia de cada demo e verifica build, servidor de produção, navegação no navegador e descoberta de páginas em tempo real.

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
