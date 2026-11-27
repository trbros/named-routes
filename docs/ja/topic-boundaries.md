# リライトと境界

[ドキュメント](index.md) / [CLI、CI、トラブルシューティング](guides.md)

[English](../en/topic-boundaries.md) · [Português](../pt/topic-boundaries.md) · [Español](../es/topic-boundaries.md) · [日本語](../ja/topic-boundaries.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="boundaries"></a>

これは URL ビルダーであり、ルーター、ミドルウェア、認可システム、HTTP クライアントの代わりではありません。実行時にルートを作ったり、リソースの存在を確認したり、訪問者の言語を検出したり、バックエンドにリクエストしたりはしません。

リダイレクト、リライト、ミドルウェアによる言語検出は、引き続きアプリケーションの責任です。コードで宣言したパスに名前が付くのは、フレームワークがルート表を公開している場合だけです（「その他のフレームワーク」を参照）。必要な外部パターンやリライト後のパターンは extraRoutes で明示的に対応付け、言語や basePath を二重に付けないようにしてください。スキャナーはフレームワークの設定ファイルを読まないので、設定は withNamedRoutes かオプションで渡してください。

## 例

```ts
export default defineConfig({
  // A rewrite destination with no page file:
  extraRoutes: { "legacy.post": "/blog/[slug]" },
});
route("legacy.post", { slug: "hello" }); // /blog/hello
```

---

← 前へ: [エラーとトラブルシューティング](topic-errors.md) · [全トピック](guides.md)
