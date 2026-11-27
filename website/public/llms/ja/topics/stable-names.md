# 固定名（任意）

Topic: `stable-names` · Named Routes v2.2.0

自動の名前は URL の構造に従います。リファクタリングで公開 URL が変わっても意味のある名前を保ちたい場合は、任意の names マップを更新してください。エイリアスを付けるパスはすべて実在する必要があります。リストにないルートは自動の名前のままです。名前の重複や綴りの誤りは、壊れたリンクを黙って作る代わりに生成を失敗させます。

独自の名前はそのパスの自動の名前を置き換えるもので、2 つ目のエイリアスが自動で追加されるわけではありません。posts.show のような Laravel 風の名前に便利ですが、通常の使い方では不要です。

```ts
export default {
  names: {
    "/posts": "posts.index",
    "/posts/[post]": "posts.show",
    "/posts/[post]/edit": "posts.edit",
  },
};
// After generation:
// route("posts.show", { post: 42 });
```

Related topic IDs: semantic-names, config-naming, naming
