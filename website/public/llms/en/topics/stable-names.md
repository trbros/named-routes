# Optional stable names

Topic: `stable-names` · Named Routes v2.2.0

Automatic names follow URL structure. If a refactor moves a public URL and you need a stable semantic name, update the optional names map. Every aliased path must exist. Unlisted routes keep automatic names. Duplicate names and typos fail generation instead of silently creating broken links.

A custom name replaces the automatic name for that path; it does not add a second alias automatically. This is useful for Laravel-style names such as posts.show, but it is not required for normal use.

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
