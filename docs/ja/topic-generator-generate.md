# generateRoutes()

[ドキュメント](index.md) / [ジェネレーターとツール API](generator.md)

[English](../en/topic-generator-generate.md) · [Português](../pt/topic-generator-generate.md) · [Español](../es/topic-generator-generate.md) · [日本語](../ja/topic-generator-generate.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-generate"></a>

Node ツール専用です。生成モジュールを書き込みます。check: true なら変更せず鮮度を検査します。

## 例

```ts
import { generateRoutes } from "@triooo/named-routes/generator";
const result = await generateRoutes({ root: "." });
console.log(result.output, result.changed);
await generateRoutes({ root: "." }, { check: true });
```

## 関連トピック

- [ジェネレーターのプログラム API](topic-generator-api.md)
- [generate](topic-cli-generate.md)
- [check](topic-cli-check.md)

---

← 前へ: [discoverRoutes()](topic-generator-discover.md) · [全トピック](generator.md) · 次へ: [validateOptions()](topic-generator-validate.md) →
