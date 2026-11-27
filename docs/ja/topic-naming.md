# 自動命名のルール

[ドキュメント](index.md) / [はじめに](getting-started.md)

[English](../en/topic-naming.md) · [Português](../pt/topic-naming.md) · [Español](../es/topic-naming.md) · [日本語](../ja/topic-naming.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="naming"></a>

URL の静的セグメントはドットで連結されます。動的、オプション、catch-all、オプションの catch-all のパラメーターは $ の後にパラメーター名を付けます。v[major]-[minor] のような混在セグメントは v$major-$minor になります。ルートページは home です。ドル記号によって、動的パラメーターと文字どおりのセグメントを区別します。

フレームワークのファイル名（page.tsx、index、+page.svelte、_index、route.tsx）は名前のセグメントになりません。ルートグループ、並列スロット、パスなしレイアウトは省かれます。ページを作成・移動・削除すると推論される公開名も変わりますが、任意のエイリアスを使えば URL が変わっても名前を固定できます。

スタイルは naming で設定できます。separator（デフォルトは "."）、paramPrefix（デフォルトは "$"、空にもできる）、home（デフォルトは "home"）です。JavaScript や TypeScript の設定では、naming.transform(route) で任意の自動ルートに別の名前を返せます。

## 例

```text
App Router                           Pages Router                     Name
app/page.tsx                         pages/index.tsx                  home
app/user/page.tsx                    pages/user/index.tsx             user
app/user/profile/page.tsx            pages/user/profile.tsx           user.profile
app/users/[user]/page.tsx            pages/users/[user].tsx           users.$user
app/docs/[...slug]/page.tsx          pages/docs/[...slug].tsx          docs.$slug
app/shop/[[...path]]/page.tsx        pages/shop/[[...path]].tsx        shop.$path
```

---

← 前へ: [最初の名前付きルート (Next.js)](topic-quick-start.md) · [全トピック](getting-started.md) · 次へ: [生成マニフェストを読む](topic-generated-source.md) →
