# ルートとアセットの監査

[ドキュメント](index.md) / [CLI、CI、トラブルシューティング](guides.md)

[English](../en/topic-audit.md) · [Português](../pt/topic-audit.md) · [Español](../es/topic-audit.md) · [日本語](../ja/topic-audit.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="audit"></a>

利用プロジェクトで audit を実行すると、不明なルート・アセットのリテラル参照、大文字小文字の不一致、重複プレフィックス、ハードコードされたパスを検出します。ソースのみ走査し、生成物を除外してファイルを書き換えません。完全な構文解析ではなく保守的な字句監査のため、別名、複数行、動的 URL を見逃すことがあります。警告は確認してください。エラーは終了コード1、--strict は警告でも失敗、--json は機械可読診断を出力します。

## 例

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```

---

← 前へ: [診断: named-routes doctor](topic-doctor.md) · [全トピック](guides.md) · 次へ: [migrate --to 2](topic-cli-migrate.md) →
