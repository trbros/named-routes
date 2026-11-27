# Convenções de arquivos e descoberta

Topic: `react-router-conventions` · Named Routes v2.2.0

Crie `app/routes/users.$id.tsx` no seu projeto. No modo de nomes por caminho, o nome será `users.$id`. O framework continua responsável por renderizar a página.

**Convenções.** Pontos aninham (concerts.$city.tsx é /concerts/[city]); _index é o index; $param; ($lang) é opcional ([[lang]]); um $ isolado é um splat chamado splat ([[...splat]]); prefixos _auth são layouts sem caminho; concerts_ sai do aninhamento; escapes [.] mantêm caracteres; uma pasta com route.tsx é uma rota e pastas mais profundas são ignoradas. Um layout e seu _index compartilham a URL e se mesclam.

**Limites e verificação.** Sem @react-router/dev instalado, ou quando o comando falha, os arquivos de flat routes acima são varridos e a CLI diz por quê. Segmentos estáticos opcionais como (beta) não podem ser nomeados; o gerador para com um erro claro para que você exclua o arquivo. Verificado por testes de convenção e pelo examples/react-router, que compila e roda com React Router 8, incluindo uma rota declarada com route() em app/routes.ts.

```text
app/routes/users.$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
