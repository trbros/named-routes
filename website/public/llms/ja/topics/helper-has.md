# route.has()

Topic: `helper-has` · Named Routes v2.2.0

`route.has(name)` はマニフェストを調べ、任意の文字列を有効なルート名に絞り込みます。サーバーが現在そのルートを配信しているかは確認しません。外部入力から選んだ名前を使う前に利用します。

```ts
import { createRoutes } from "@triooo/named-routes";
const urls = createRoutes({ home: "/", about: "/about" });
function patternFor(name: string) {
  return urls.has(name) ? urls.pattern(name) : null;
}
patternFor("about"); // /about
patternFor("missing"); // null
```

Related topic IDs: helper-names, helper-pattern
