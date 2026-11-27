# Automatic naming rules

Topic: `naming` · Named Routes v2.2.0

Static URL segments are joined with dots. Dynamic, optional, catch-all and optional catch-all parameters use $ followed by the parameter name; mixed segments such as v[major]-[minor] become v$major-$minor. The root page is home. The dollar sign distinguishes a dynamic parameter from a literal segment.

Framework file names (page.tsx, index, +page.svelte, _index, route.tsx) do not become name segments. Route groups, parallel slots and pathless layouts are omitted. Creating, moving or deleting a page changes the inferred public name; optional aliases can keep a stable name when URLs move.

The style is configurable with naming: separator (default "."), paramPrefix (default "$", may be empty) and home (default "home"). In a JavaScript or TypeScript config, naming.transform(route) can return a different name for any automatic route.

```text
App Router                           Pages Router                     Name
app/page.tsx                         pages/index.tsx                  home
app/user/page.tsx                    pages/user/index.tsx             user
app/user/profile/page.tsx            pages/user/profile.tsx           user.profile
app/users/[user]/page.tsx            pages/users/[user].tsx           users.$user
app/docs/[...slug]/page.tsx          pages/docs/[...slug].tsx          docs.$slug
app/shop/[[...path]]/page.tsx        pages/shop/[[...path]].tsx        shop.$path
```
