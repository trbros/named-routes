# Convenções de arquivos e descoberta

[Documentação](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-conventions.md) · [Português](../pt/topic-react-router-conventions.md) · [Español](../es/topic-react-router-conventions.md) · [日本語](../ja/topic-react-router-conventions.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-conventions"></a>

Crie `app/routes/users.$id.tsx` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** Pontos aninham (concerts.$city.tsx é /concerts/[city]); _index é o index; $param; ($lang) é opcional ([[lang]]); um $ isolado é um splat chamado splat ([[...splat]]); prefixos _auth são layouts sem caminho; concerts_ sai do aninhamento; escapes [.] mantêm caracteres; uma pasta com route.tsx é uma rota e pastas mais profundas são ignoradas. Um layout e seu _index compartilham a URL e se mesclam.

**Limites e verificação.** Sem @react-router/dev instalado, ou quando o comando falha, os arquivos de flat routes acima são varridos e a CLI diz por quê. Segmentos estáticos opcionais como (beta) não podem ser nomeados; o gerador para com um erro claro para que você exclua o arquivo. Verificado por testes de convenção e pelo examples/react-router, que compila e roda com React Router 8, incluindo uma rota declarada com route() em app/routes.ts.

## Exemplo

```text
app/routes/users.$id.tsx
  → users.$id
  → /users/[id]
```

## Tópicos relacionados

- [Regras de nomes automáticos](topic-naming.md)
- [Nomes semânticos e grupos](topic-semantic-names.md)
- [Casos especiais de descoberta](topic-discovery.md)

---

← Anterior: [React Router / Remix: configuração](topic-react-router.md) · [Todos os tópicos](framework-react-router.md) · Próximo: [Links e navegação](topic-react-router-navigation.md) →
