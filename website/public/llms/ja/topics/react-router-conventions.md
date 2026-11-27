# ファイル規則と検出

Topic: `react-router-conventions` · Named Routes v2.2.0

`app/routes/users.$id.tsx` を作成すると、パス命名モードで `users.$id` が生成されます。ページの描画はフレームワークが行います。

**規約。** ドットでネスト（concerts.$city.tsx は /concerts/[city]）。_index はインデックス。$param。($lang) はオプション（[[lang]]）。単独の $ は splat という名前の splat（[[...splat]]）。_auth のように _ で始まるものはパスなしレイアウト。concerts_ はネストを解除。[.] エスケープは文字をそのまま残す。route.tsx を含むフォルダーはひとつのルートで、それより深いフォルダーは無視されます。レイアウトとその _index は同じ URL を共有し、まとめられます。

**制限と検証。** @react-router/dev が入っていない場合やコマンドが失敗した場合は、上記の flat routes のファイルを走査し、CLI が理由を表示します。(beta) のような省略可能な静的セグメントには名前を付けられません。ジェネレーターは明確なエラーで止まるので、そのファイルを除外してください。規約テストと、React Router 8 でビルドして実行する examples/react-router（app/routes.ts の route() で宣言したルートを含む）で検証しています。

```text
app/routes/users.$id.tsx
  → users.$id
  → /users/[id]
```

Related topic IDs: naming, semantic-names, discovery
