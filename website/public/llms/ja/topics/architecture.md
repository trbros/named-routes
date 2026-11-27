# 生成の仕組み

Topic: `architecture` · Named Routes v2.2.0

Node ジェネレーターはファイルとルート表を読み込みます。エンドポイント宣言は静的に解析し、ハンドラーを実行しません。ブラウザーランタイムは Node.js を import せず、ページ配信はフレームワークが担当します。

```sh
npx @triooo/named-routes list
```

Related topic IDs: discovery, generator-api, generated-source
