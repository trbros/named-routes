# Exemplos com Pages Router

Topic: `pages-router` · Named Routes v2.2.0

Use o mesmo helper gerado. Em aplicações Pages Router, o hook do router vem de next/router. O Link não precisa de adapter. A descoberta pode examinar os dois diretórios durante uma migração, mas URLs canônicas conflitantes interrompem a geração.

**Prefixo e i18n.** Next Link e next/router usam basePath e locale da configuração. Mantenha route() interno para esses consumidores. Use basePath: true e, quando necessário, locale em URLs públicas comuns; route.localize() exige i18n configurado e não instala redirecionamentos automaticamente.

**Arquivos públicos.** Importe `asset` do módulo gerado e passe um caminho relativo à pasta pública, por exemplo `asset("images/logo.svg")`. Por padrão inclui o prefixo de navegação configurado, mas nunca o idioma. Defina `defaults.assetBase` explicitamente se os arquivos estiverem em outro caminho ou CDN. Não passe assets importados ou processados pelo bundler. Veja Arquivos públicos.

**Assets tipados.** Ative assets: { strict: true } em named-routes.config; caminhos públicos vêm da pasta pública local (static/ no SvelteKit). Veja Assets tipados, Versionamento e Auditoria.

## Sem base path

URL no navegador: `/user/profile`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

## Com base path

URL no navegador: `/app/user/profile`.

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

Related topic IDs: nextjs-navigation, nextjs-deployment, nextjs-i18n
