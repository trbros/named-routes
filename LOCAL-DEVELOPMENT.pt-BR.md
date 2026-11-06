# Usar o pacote em outro projeto local

Requisitos: Node.js 20.19 ou superior, um projeto Next.js (ou Nuxt, Vue, SvelteKit, Astro, React Router, TanStack Router) e pnpm 12.16.1 para preparar o pacote. No projeto consumidor, use o gerenciador de pacotes que você já utiliza.

## 1. Gerar um arquivo instalável

Na pasta do pacote:

```sh
cd /caminho/para/next-named-routes
pnpm install --frozen-lockfile --ignore-scripts
pnpm build
npm pack
```

Na versão atual, isso gera `triooo-next-named-routes-1.0.0.tgz`. Use o nome informado pelo `npm pack` se a versão mudar. O arquivo contém o JavaScript compilado e as declarações TypeScript, sem depender de uma publicação no npm.

## 2. Instalar no projeto Next.js

Troque `/caminho/meu-projeto-next` pelo diretório do seu projeto:

```sh
cd /caminho/meu-projeto-next
npm install /caminho/para/next-named-routes/triooo-next-named-routes-1.0.0.tgz
```

Alternativas: `pnpm add /caminho/arquivo.tgz`, `yarn add /caminho/arquivo.tgz` ou `bun add /caminho/arquivo.tgz`. Não misture gerenciadores no mesmo projeto. No Windows, use o caminho equivalente, por exemplo `npm install "C:/caminho/para/next-named-routes/triooo-next-named-routes-1.0.0.tgz"`.

## 3. Conectar ao Next.js

No `next.config.ts` do consumidor:

```ts
import { withNamedRoutes } from '@triooo/next-named-routes/next';

export default withNamedRoutes({
  reactStrictMode: true,
});
```

Preserve as opções existentes. Se já usa um wrapper, componha com ele, por exemplo `withNamedRoutes(withNextIntl(nextConfig))`. Em `next.config.mjs`, a integração é igual, sem anotações TypeScript.

### Outros frameworks (Vite)

Em Nuxt, Vue, SvelteKit, Astro, React Router ou TanStack Router, use o plugin Vite em vez do wrapper:

```ts
// vite.config.ts (no Nuxt: vite.plugins no nuxt.config; no Astro: vite.plugins no astro.config)
import { namedRoutes } from '@triooo/next-named-routes/vite';
export default defineConfig({ plugins: [namedRoutes()] });
```

O framework é detectado pelo `package.json`. Para criar um arquivo de configuração: `npx named-routes init`.

## 4. Criar uma página e usar seu nome

App Router: crie `app/user/profile/page.tsx`:

```tsx
export default function Profile() {
  return <h1>Meu perfil</h1>;
}
```

Pages Router: crie `pages/user/profile.tsx` com o mesmo componente. Ambos geram o nome `user.profile` automaticamente.

Inicie o Next.js com seu comando habitual:

```sh
npm run dev
```

A integração gera `src/routes.generated.ts` na raiz do projeto e acompanha páginas criadas, movidas ou removidas durante o desenvolvimento. Não cadastre os nomes manualmente nem edite esse arquivo.

Em `app/page.tsx` ou `pages/index.tsx`, por exemplo:

```tsx
import Link from 'next/link';
import { route } from '../src/routes.generated';

export default function Home() {
  return <Link href={route('user.profile')}>Abrir perfil</Link>;
}
```

Ajuste o caminho do import à posição do arquivo. Se usa `src/app`, o import no seu `src/app/page.tsx` será `../routes.generated`. Para `app/users/[user]/page.tsx` ou `pages/users/[user].tsx`, use `route('users.$user', { user: 42 })`, que retorna `/users/42`.

## 5. Conferir e atualizar

```sh
npm ls @triooo/next-named-routes
npx next-named-routes list
npx next-named-routes check
npx tsc --noEmit
```

Após mudar o código do pacote, compile e gere outro tarball, reinstale esse arquivo no consumidor e reinicie o Next.js. Alterações no fonte do pacote não são copiadas automaticamente para uma instalação por tarball.

## Alternativa: dependência direta pela pasta

Depois de instalar as dependências e compilar o pacote, no consumidor:

```sh
npm install /caminho/para/next-named-routes
```

O npm pode criar um vínculo com a pasta local. Continue executando `pnpm build` na pasta do pacote quando alterar o fonte e reinicie o Next.js. Para verificar o comportamento de uma instalação distribuída, prefira o tarball: é o mesmo formato verificado pelos testes de instalação do pacote.

## Se algo não funcionar

- **Não encontra `dist/index.js`:** execute `pnpm build` no pacote e gere/reinstale o tarball.
- **Não encontra `routes.generated`:** confirme o wrapper no `next.config`, reinicie `next dev` ou execute `npx next-named-routes generate` na raiz do consumidor.
- **O tipo não aceita uma rota nova:** salve a página, aguarde a atualização do manifesto e reinicie o servidor TypeScript do editor se necessário.
- **Mudou a configuração do Next.js:** reinicie o Next.js.
