# このパッケージでできること

[ドキュメント](index.md) / [はじめに](getting-started.md)

[English](../en/topic-overview.md) · [Português](../pt/topic-overview.md) · [Español](../es/topic-overview.md) · [日本語](../ja/topic-overview.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="overview"></a>

Named Routes はフレームワークのルートから型付き URL ヘルパーを生成します。パスを組み立て直さず名前で指定できます。ルーターの置き換え、画面遷移、HTTP 通信は行いません。インストール後、フレームワークを選んでください。

## 例

```ts
// Before
const href = `/users/${42}`;

// After: a generated, typed name
route("users.$user", { user: 42 }); // /users/42
```

## 関連トピック

- [インストール](topic-installation.md)
- [フレームワークを選ぶ](topic-frameworks.md)
- [自動命名のルール](topic-naming.md)
- [固定名（任意）](topic-stable-names.md)
- [route()](topic-helper-route.md)
- [MCP のインストールと起動](topic-mcp-installation.md)

---

[全トピック](getting-started.md) · 次へ: [インストール](topic-installation.md) →
