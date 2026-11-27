# ドキュメントサイト

Topic: `website` · Named Routes v2.2.0

このドキュメントは website/ にある Next.js アプリです。プロジェクトの公開サイトで、パッケージ自身を使って作られています。内部リンクはすべて route() を使い、プレイグラウンドと目的地のページは実際の App Router のルートで、英語・ポルトガル語・スペイン語・日本語のコンテンツは README を生成するのと同じ docs/content.json から来ています。

ランディングページでは、対応する各フレームワークを路線図の路線として、ジェネレーターの実際の出力を流す出発案内板、互換性の表、インストールの道のりとともに紹介しています。アニメーションは有限かユーザー操作によるもので、画面外では止まり、prefers-reduced-motion では無効になります。

Vercel にデプロイするには、Root Directory を website にしたプロジェクトを作り、"Include files outside the root directory" を有効のままにしてください。website/vercel.json がリポジトリをインストールし、パッケージをビルドしてからサイトをビルドします。環境変数は不要です。

```sh
# From the repository root:
pnpm install
pnpm build
pnpm --dir website install
pnpm --dir website dev
# http://localhost:3000
pnpm --dir website build
```
