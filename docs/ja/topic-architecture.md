# 生成の仕組み

[ドキュメント](index.md) / [はじめに](getting-started.md)

[English](../en/topic-architecture.md) · [Português](../pt/topic-architecture.md) · [Español](../es/topic-architecture.md) · [日本語](../ja/topic-architecture.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="architecture"></a>

Node ジェネレーターはファイルとルート表を読み込みます。エンドポイント宣言は静的に解析し、ハンドラーを実行しません。ブラウザーランタイムは Node.js を import せず、ページ配信はフレームワークが担当します。

## 例

```sh
npx @triooo/named-routes list
```

## 関連トピック

- [検出のエッジケース](topic-discovery.md)
- [ジェネレーターのプログラム API](topic-generator-api.md)
- [生成マニフェストを読む](topic-generated-source.md)

---

← 前へ: [ほかの選択肢との比較](topic-comparison.md) · [全トピック](getting-started.md)
