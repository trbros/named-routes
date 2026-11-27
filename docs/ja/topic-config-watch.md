# 監視と開発オプション

[ドキュメント](index.md) / [設定とランタイムリファレンス](api-reference.md)

[English](../en/topic-config-watch.md) · [Português](../pt/topic-config-watch.md) · [Español](../es/topic-config-watch.md) · [日本語](../ja/topic-config-watch.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="config-watch"></a>

開発中は統合が更新します。withNamedRoutes の watch、watchMode、watchInterval で調整できます。

## 例

```ts
import { withNamedRoutes } from "@triooo/named-routes/next";
export default withNamedRoutes({}, { watchMode: "poll", watchInterval: 750 });
```

## 関連トピック

- [開発中の自動更新](topic-development.md)
- [watch](topic-cli-watch.md)

---

← 前へ: [API 検出の有効化](topic-config-api.md) · [全トピック](api-reference.md)
