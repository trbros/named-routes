# ジェネレーターとツール API

# ジェネレーターのプログラム API

Topic: `generator-api` · Named Routes v2.2.0

discoverRoutes(options?) は何も書き込まずに root、framework、directories、routes、entries、ランタイムの defaults を返します。各エントリーには name、path、file、router、framework があり、必要に応じて variant と localized も付きます。明示的に追加したルートは file: null、router: explicit です。

generateRoutes(options?, { check?: boolean }?) はさらに output と changed を返します。check モードは古い出力を変更せずに拒否します。validateOptions(options) は未知のキーに対して INVALID_CONFIG を投げます。/generator と /config は Node のツールの中だけでインポートし、クライアントのコードでは使わないでください。withNamedRoutes は /next から、namedRoutes は /vite からインポートします。

Related topic IDs: generator-discover, generator-generate, generator-validate, configuration
---

# discoverRoutes()

Topic: `generator-discover` · Named Routes v2.2.0

Node ツール専用です。出力を書き込まずルートを検出します。

```ts
import { discoverRoutes } from "@triooo/named-routes/generator";
const result = await discoverRoutes({ root: ".", framework: "next" });
console.log(result.entries);
```

Related topic IDs: generator-api, discovery
---

# generateRoutes()

Topic: `generator-generate` · Named Routes v2.2.0

Node ツール専用です。生成モジュールを書き込みます。check: true なら変更せず鮮度を検査します。

```ts
import { generateRoutes } from "@triooo/named-routes/generator";
const result = await generateRoutes({ root: "." });
console.log(result.output, result.changed);
await generateRoutes({ root: "." }, { check: true });
```

Related topic IDs: generator-api, cli-generate, cli-check
---

# validateOptions()

Topic: `generator-validate` · Named Routes v2.2.0

Node ツールで設定を検証します。未知キーや不正な値には INVALID_CONFIG が発生します。

```ts
import { validateOptions } from "@triooo/named-routes/generator";
const options = validateOptions({ framework: "next", includeApi: true });
console.log(options.framework);
```

Related topic IDs: configuration, generator-api
