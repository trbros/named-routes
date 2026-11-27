# 例：実際のルートからリンクを作る

Topic: `mcp-workflow` · Named Routes v2.2.0

プロンプト例：「Named Routes の規約を読み、admin.alunos のルートを列挙して、学生編集用の Next.js リンクを作ってください。名前を推測せず生成マニフェストを変更しないでください。」get_agent_contract、list_routes、必要に応じて get_route を使用します。

取得したルートが admin.alunos.edit、パターンが /admin/alunos/[aluno]/edit と仮定します。組み込みルートではなく説明用の例です。名前やパラメータが異なれば実際のマニフェストを使います。

Next.js Link では route が内部 URL を返し、Next が base を付与します。公開 URL は route.url を使用します。base なしは /admin/alunos/42/edit、/app ありは /app/admin/alunos/42/edit です。利用側で型チェックしてください。

## base path なし

ドメイン直下では内部 Link と公開 URL は同じパスです。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
route.url("admin.alunos.edit", { params: { aluno: 42 } });
// /admin/alunos/42/edit
```

## base path あり

Next の basePath: "/app" を想定し、Link は内部 URL のままにします。route.url は共有リンクやアンカー用にプレフィックスを含めます。

```tsx
import Link from "next/link";
import { route } from "@/routes.generated";
<Link href={route("admin.alunos.edit", { aluno: 42 })}>Edit</Link>;
// Next Link adds /app
<a href={route.url("admin.alunos.edit", { params: { aluno: 42 } })}>Edit</a>;
// /app/admin/alunos/42/edit
```

Related topic IDs: mcp-tools, mcp-project, helper-route, base-path
