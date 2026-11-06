import assert from "node:assert/strict";
import test from "node:test";
import { createRoutes, NamedRouteError } from "../dist/index.js";

test("Laravel-style names produce encoded URLs without touching the manifest", () => {
  const routes = {
    home: "/",
    "posts.show": "/posts/[post]",
    docs: "/docs/[...slug]",
    shop: "/shop/[[...path]]",
  };
  const route = createRoutes(routes);
  routes.home = "/changed";
  assert.equal(route("home"), "/");
  assert.equal(
    route("posts.show", { post: "a/b ?#" }),
    "/posts/a%2Fb%20%3F%23",
  );
  assert.equal(
    route(
      "posts.show",
      { post: 0 },
      {
        query: { q: "café", tag: ["a", "b"], draft: false, skip: null },
        hash: "overview & more",
      },
    ),
    "/posts/0?q=caf%C3%A9&tag=a&tag=b&draft=false#overview%20%26%20more",
  );
  assert.equal(
    route("docs", { slug: ["one", "two three"] }),
    "/docs/one/two%20three",
  );
  assert.equal(route("shop"), "/shop");
  assert.equal(route("shop", { path: [] }), "/shop");
  assert.equal(route("shop", { path: ["cart"] }), "/shop/cart");
  assert.equal(route.has("toString"), false);
  assert.deepEqual(route.names(), ["home", "posts.show", "docs", "shop"]);
  assert.equal(route.pattern("posts.show"), "/posts/[post]");
});

test("basePath, origin and trailingSlash remain request-independent", () => {
  const route = createRoutes(
    { home: "/", post: "/posts/[id]" },
    {
      basePath: "/workspace",
      trailingSlash: true,
      origin: "https://example.com",
    },
  );
  assert.equal(route("home"), "/");
  assert.equal(route("home", {}, { basePath: true }), "/workspace/");
  assert.equal(route("post", { id: 12 }), "/posts/12/");
  assert.equal(
    route("post", { id: 12 }, { basePath: true }),
    "/workspace/posts/12/",
  );
  assert.equal(
    route("post", { id: 12 }, { absolute: true, query: { page: 2 } }),
    "https://example.com/workspace/posts/12/?page=2",
  );
  assert.throws(
    () => createRoutes({ home: "/" })("home", {}, { absolute: true }),
    NamedRouteError,
  );
});

test("invalid names, parameters and traversal fail explicitly", () => {
  const route = createRoutes({
    post: "/posts/[id]",
    docs: "/docs/[...slug]",
    home: "/",
  });
  for (const call of [
    () => route("missing"),
    () => route("post"),
    () => route("post", { id: "" }),
    () => route("post", { id: NaN }),
    () => route("post", { id: ".." }),
    () => route("post", { id: "." }),
    () => route("docs", { slug: [] }),
    () => route("docs", { slug: "a/b" }),
    () => route("home", { extra: 1 }),
  ])
    assert.throws(call, NamedRouteError);
  for (const path of [
    "https://evil.test",
    "//evil.test",
    "/foo?x=1",
    "/a/../b",
    "/foo/[id]/[id]",
    "/foo/[a][b]",
    "/foo/[a]-[...b]",
    "/foo/[[a]",
  ])
    assert.throws(() => createRoutes({ bad: path }), NamedRouteError, path);
  assert.throws(
    () => createRoutes({ home: "/" }, { origin: "javascript:alert(1)" }),
    NamedRouteError,
  );
});

test("runtime validates options and supports own prototype-like names", () => {
  const route = createRoutes(JSON.parse('{"__proto__":"/special"}'));
  assert.equal(route("__proto__"), "/special");
  assert.throws(() => createRoutes({ home: "/" }, null), NamedRouteError);
  assert.throws(() => route("__proto__", {}, null), NamedRouteError);
  assert.throws(
    () => route("__proto__", {}, { query: "bad" }),
    NamedRouteError,
  );
  assert.throws(
    () => route("__proto__", {}, { query: { nested: { a: 1 } } }),
    NamedRouteError,
  );
  assert.throws(() => route("__proto__", {}, { hash: 12 }), NamedRouteError);
});

test("optional, mixed and mid-path catch-all segments used by other frameworks", () => {
  const route = createRoutes({
    optional: "/[[lang]]/about",
    mixed: "/docs/v[major]-[minor]",
    edit: "/files/[...path]/edit",
    rest: "/a/[[...rest]]/z",
  });
  assert.equal(route("optional"), "/about");
  assert.equal(route("optional", { lang: "pt" }), "/pt/about");
  assert.equal(route("mixed", { major: 2, minor: "1 b" }), "/docs/v2-1%20b");
  assert.throws(() => route("mixed", { major: 2 }), /Missing parameter minor/);
  assert.equal(route("edit", { path: ["a", "b"] }), "/files/a/b/edit");
  assert.equal(route("rest"), "/a/z");
  assert.equal(route("rest", { rest: ["b", "c"] }), "/a/b/c/z");
  assert.equal(route("optional", {}, { hash: "#top" }), "/about#top");
});
