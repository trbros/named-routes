# 固定名（任意）

[ドキュメント](index.md) / [URL と名前の構築](build-with-routes.md)

[English](../en/topic-stable-names.md) · [Português](../pt/topic-stable-names.md) · [Español](../es/topic-stable-names.md) · [日本語](../ja/topic-stable-names.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="stable-names"></a>

自動の名前は URL の構造に従います。リファクタリングで公開 URL が変わっても意味のある名前を保ちたい場合は、任意の names マップを更新してください。エイリアスを付けるパスはすべて実在する必要があります。リストにないルートは自動の名前のままです。名前の重複や綴りの誤りは、壊れたリンクを黙って作る代わりに生成を失敗させます。

独自の名前はそのパスの自動の名前を置き換えるもので、2 つ目のエイリアスが自動で追加されるわけではありません。posts.show のような Laravel 風の名前に便利ですが、通常の使い方では不要です。

## 例

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```

## 関連トピック

- [意味的なルート名とグループ](topic-semantic-names.md)
- [命名規則](topic-config-naming.md)
- [自動命名のルール](topic-naming.md)

---

← 前へ: [意味的なルート名とグループ](topic-semantic-names.md) · [全トピック](build-with-routes.md) · 次へ: [TypeScript と Next の typedRoutes](topic-typescript.md) →
