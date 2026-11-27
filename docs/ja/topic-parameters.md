# 必須パラメータとエンコード

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-parameters.md) · [Português](../pt/topic-parameters.md) · [Español](../es/topic-parameters.md) · [日本語](../ja/topic-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="parameters"></a>

[user] は空でない文字列または有限の数値です。値は単一セグメントとしてエンコードされます。リソースの存在確認は行いません。

## 例

```ts
route("users.$user", { user: "Ana Silva" }); // /users/Ana%20Silva
route("users.$user", { user: "a/b" }); // /users/a%2Fb
```

## 関連トピック

- [任意パラメータ](topic-optional-parameters.md)
- [キャッチオールパラメータ](topic-catch-all-parameters.md)
- [混合セグメント](topic-mixed-parameters.md)
- [route()](topic-helper-route.md)

---

← 前へ: [route.url() — 公開 URL](topic-public-url.md) · [全トピック](build-with-routes.md) · 次へ: [任意パラメータ](topic-optional-parameters.md) →
