# ナビゲーション — Astro.redirect()

[ドキュメント](index.md) / [Astro](framework-astro.md)

[English](../en/topic-astro-programmatic.md) · [Português](../pt/topic-astro-programmatic.md) · [Español](../es/topic-astro-programmatic.md) · [日本語](../ja/topic-astro-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="astro-programmatic"></a>

SSR ページの frontmatter で公開 URL を Astro.redirect に渡します。静的出力ではリダイレクトの動作が異なります。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/users/42`。

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```astro
---
import { route } from "../routes.generated";
return Astro.redirect(route.url("users.$id", { params: { id: 42 } }));
---
```

## 関連トピック

- [リンクとナビゲーション](topic-astro-navigation.md)
- [ベースパスとデプロイ](topic-astro-deployment.md)
- [route.url() — 公開 URL](topic-public-url.md)

---

← 前へ: [リンクとナビゲーション](topic-astro-navigation.md) · [全トピック](framework-astro.md) · 次へ: [ベースパスとデプロイ](topic-astro-deployment.md) →
