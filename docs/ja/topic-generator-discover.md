# discoverRoutes()

[ドキュメント](index.md) / [ジェネレーターとツール API](generator.md)

[English](../en/topic-generator-discover.md) · [Português](../pt/topic-generator-discover.md) · [Español](../es/topic-generator-discover.md) · [日本語](../ja/topic-generator-discover.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-discover"></a>

Node ツール専用です。出力を書き込まずルートを検出します。

## 例

```ts
import { discoverRoutes } from "@triooo/named-routes/generator";
const result = await discoverRoutes({ root: ".", framework: "next" });
console.log(result.entries);
```

## 関連トピック

- [ジェネレーターのプログラム API](topic-generator-api.md)
- [検出のエッジケース](topic-discovery.md)

---

← 前へ: [ジェネレーターのプログラム API](topic-generator-api.md) · [全トピック](generator.md) · 次へ: [generateRoutes()](topic-generator-generate.md) →
