# Pages Router のレシピ

Topic: `pages-router` · Named Routes v2.2.0

同じ生成ヘルパーを使います。Pages Router のアプリでは、ルーターのフックは next/router から取得します。Link に専用のアダプターは不要です。移行中は両方のルーターのディレクトリをスキャンできますが、正規 URL が衝突すると生成は失敗します。

**ベースと i18n。** Next Link と next/router は設定済みの basePath と locale を使用します。これらには route() の内部パスを渡します。通常の公開 URL では basePath: true と必要に応じて locale を指定します。route.localize() は i18n 設定を必要とし、自動でリダイレクトを追加しません。

**公開アセット。** 生成モジュールから `asset` をインポートし、公開ディレクトリからの相対パス（例：`asset("images/logo.svg")`）を渡します。デフォルトではナビゲーションのベースを含みますが、ロケールは含めません。別のパスや CDN から配信する場合は `defaults.assetBase` を明示します。バンドラーで処理されたアセットには使用しないでください。公開アセットの項目を参照してください。

**型付きアセット。** named-routes.config の assets: { strict: true } を有効にすると公開ディレクトリ（SvelteKit は static/）のパスを推論します。型付きアセット、バージョン管理、監査を参照してください。

## ベースパスなし

ブラウザーの URL: `/user/profile`。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

## ベースパスあり

ブラウザーの URL: `/app/user/profile`。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";

export function ProfileLink() {
  return <Link href={route("user.profile")}>Profile</Link>;
}
```

Related topic IDs: nextjs-navigation, nextjs-deployment, nextjs-i18n
