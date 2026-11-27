# ルートとアセットの監査

Topic: `audit` · Named Routes v2.2.0

利用プロジェクトで audit を実行すると、不明なルート・アセットのリテラル参照、大文字小文字の不一致、重複プレフィックス、ハードコードされたパスを検出します。ソースのみ走査し、生成物を除外してファイルを書き換えません。完全な構文解析ではなく保守的な字句監査のため、別名、複数行、動的 URL を見逃すことがあります。警告は確認してください。エラーは終了コード1、--strict は警告でも失敗、--json は機械可読診断を出力します。

```sh
npx @triooo/named-routes audit
npx @triooo/named-routes audit --json
npx @triooo/named-routes audit --strict
```
