# 任意パラメータ

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-optional-parameters.md) · [Português](../pt/topic-optional-parameters.md) · [Español](../es/topic-optional-parameters.md) · [日本語](../ja/topic-optional-parameters.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="optional-parameters"></a>

[[id]] は任意の単一パラメータです。値を省略するとセグメントも省略されます。フレームワークごとの規則を確認してください。

## 例

```ts
import { createRoutes } from "@triooo/named-routes";
const route = createRoutes({ profile: "/users/[[id]]" });
route("profile"); // /users
route("profile", { id: 42 }); // /users/42
```

## 関連トピック

- [必須パラメータとエンコード](topic-parameters.md)
- [キャッチオールパラメータ](topic-catch-all-parameters.md)
- [自動命名のルール](topic-naming.md)

---

← 前へ: [必須パラメータとエンコード](topic-parameters.md) · [全トピック](build-with-routes.md) · 次へ: [キャッチオールパラメータ](topic-catch-all-parameters.md) →
