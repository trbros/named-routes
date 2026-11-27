# Erros e solução de problemas

Topic: `errors` · Named Routes v2.2.0

NamedRouteError estende Error e expõe um code estável. UNKNOWN_ROUTE indica nome ausente; MISSING_PARAMETER indica valor obrigatório omitido; UNKNOWN_PARAMETER indica chave extra que pertence à query ou foi digitada errado; INVALID_PARAMETER indica formato inválido ou segmento proibido; INVALID_LOCALE indica idioma passado sem i18n ou não configurado.

INVALID_PATTERN, INVALID_NAME e INVALID_MANIFEST identificam definições de rota malformadas. INVALID_OPTIONS, INVALID_QUERY e INVALID_HASH identificam opções inválidas. INVALID_BASE_PATH, INVALID_ORIGIN e INVALID_I18N rejeitam defaults de URL. MISSING_ORIGIN exige uma origin antes de pedir URLs absolutas. GENERATION_ERROR cobre conflitos de descoberta, rotas que não podem ser nomeadas e check desatualizado; INVALID_CONFIG cobre toda opção inválida: configuração ausente, malformada ou com erro de digitação, router, pageExtensions, discovery e output.

Não encontra routes.generated: confirme que a integração está rodando, execute generate e verifique output/aliases de import. basePath ou idioma duplicado: use URLs relativas com os links do framework e passe basePath/locale apenas para URLs simples. Nomes desatualizados: confirme que o watcher está ativo e veja os erros do terminal. Erro de tipo após mover uma página é esperado: atualize o nome inferido ou defina um nome estável.

A geração se recusa a sobrescrever um arquivo escrito manualmente. Escolha outro output em vez de adicionar a assinatura de gerado a um código não relacionado. Mantenha a saída gerada fora de arquivos roteáveis. A interpolação dinâmica não autoriza uma requisição; valide permissões e entradas no destino.

Desde a 1.1, todo NamedRouteError também tem details: { file, files, route, pattern, option, hint } com o que for conhecido, por exemplo os dois arquivos de um conflito de rota ou "Did you mean users.show?" para um nome, opção ou chave de names digitado errado. INVALID_QUERY indica que uma query falhou no schema ou que um mapa de schemas é inválido; INVALID_URL indica que match() recebeu algo que não é caminho nem URL. Desde a 2.0, valores inválidos de router, pageExtensions e output geram INVALID_CONFIG (GENERATION_ERROR na 1.x); as mensagens não mudaram.

Para erros 404 em arquivos estáticos, confira o caminho real da implantação e a pasta pública. `asset()` usa o prefixo configurado, não o output do bundler nem a requisição atual. `INVALID_ASSET_BASE`, `INVALID_ASSET` e `INVALID_OPTIONS` identificam prefixos, caminhos e opções inválidos.

```ts
import { NamedRouteError } from "@triooo/named-routes";
try {
  route("users.$user", { user: "" });
} catch (error) {
  if (error instanceof NamedRouteError) console.error(error.code);
  else throw error;
}
```
