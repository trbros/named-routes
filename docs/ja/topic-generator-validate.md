# validateOptions()

[ドキュメント](index.md) / [ジェネレーターとツール API](generator.md)

[English](../en/topic-generator-validate.md) · [Português](../pt/topic-generator-validate.md) · [Español](../es/topic-generator-validate.md) · [日本語](../ja/topic-generator-validate.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-validate"></a>

Node ツールで設定を検証します。未知キーや不正な値には INVALID_CONFIG が発生します。

## 例

```ts
import { validateOptions } from "@triooo/named-routes/generator";
const options = validateOptions({ framework: "next", includeApi: true });
console.log(options.framework);
```

## 関連トピック

- [ジェネレーターの設定](topic-configuration.md)
- [ジェネレーターのプログラム API](topic-generator-api.md)

---

← 前へ: [generateRoutes()](topic-generator-generate.md) · [全トピック](generator.md)
