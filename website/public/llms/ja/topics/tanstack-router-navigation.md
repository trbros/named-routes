# リンクとナビゲーション

Topic: `tanstack-router-navigation` · Named Routes v2.2.0

遷移元のコンポーネントで生成ヘルパーを import します。ファイル規則のページが存在し、パス命名モードを使用する前提です。import パスを調整してください。

**使いどころ。** TanStack Router は自前の <Link to> をルート ID で型付けしています。route() は普通の文字列が必要な場面で使ってください。<a href>、ほかのアプリへのリダイレクト、メール、サイトマップ、アナリティクス、言語プレフィックス付きの URL、モノレポでほかのフレームワークと共有する名前などです。

## ベースパスなし

ブラウザーの URL: `/users/42`。

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

## ベースパスあり

ブラウザーの URL: `/app/users/42`。

```tsx
import { route } from "../routes.generated";

<a href={route.url("users.$id", { params: { id: 42 } })}>Ana</a>;
```

Related topic IDs: helper-route, parameters, query-hash, public-url, tanstack-router-programmatic
