# ナビゲーション — useNavigate()

[ドキュメント](index.md) / [React Router / Remix](framework-react-router.md)

[English](../en/topic-react-router-programmatic.md) · [Português](../pt/topic-react-router-programmatic.md) · [Español](../es/topic-react-router-programmatic.md) · [日本語](../ja/topic-react-router-programmatic.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="react-router-programmatic"></a>

コンポーネントやイベント内で使用します。Named Routes はパスを構築し、ネイティブ関数が遷移を実行します。

<a id="without-base"></a>
## ベースパスなし

ブラウザーの URL: `/users/42`。

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

<a id="with-base"></a>
## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```ts
import { useNavigate } from "react-router";
import { route } from "@/routes.generated";
const navigate = useNavigate();
navigate(route("users.$id", { id: 42 }));
```

## 関連トピック

- [リンクとナビゲーション](topic-react-router-navigation.md)
- [ベースパスとデプロイ](topic-react-router-deployment.md)
- [route.url() — 公開 URL](topic-public-url.md)

---

← 前へ: [リンクとナビゲーション](topic-react-router-navigation.md) · [全トピック](framework-react-router.md) · 次へ: [ベースパスとデプロイ](topic-react-router-deployment.md) →
