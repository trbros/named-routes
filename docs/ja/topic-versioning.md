# バージョンとアップグレード

[ドキュメント](index.md) / [プロジェクトとリリース](project.md)

[English](../en/topic-versioning.md) · [Português](../pt/topic-versioning.md) · [Español](../es/topic-versioning.md) · [日本語](../ja/topic-versioning.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="versioning"></a>

バージョン 2.x は、推論される名前、型付き URL 生成、フレームワークのアダプターとフレームワークによる検出、i18n、Next.js のラッパー、Nuxt モジュール、Vite プラグイン、CLI の公開契約を定めています。1.x には新機能は追加されません。

パッチリリースは、ドキュメント化された API を保ったままバグを修正します。マイナーリリースは、新しいフレームワークのアダプターのような互換性のある機能を追加します。互換性を壊す変更には新しいメジャーバージョンが必要です。アップグレードの前に changelog を確認してください。

アップグレードしたら、開発サーバーを再起動してマニフェストを生成し直し、アプリケーションの型チェックとナビゲーションのテストを実行してください。ページを移動しても公開ルート名を保ちたい場合は、明示的なエイリアスを使ってください。

## 例

```sh
npm install @triooo/named-routes@^2
npx @triooo/named-routes check
npx tsc --noEmit
```

---

← 前へ: [ステップごとのコントリビュート](topic-contributing.md) · [全トピック](project.md) · 次へ: [1.x からのアップグレード](topic-migration.md) →
