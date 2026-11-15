import assert from "node:assert/strict";
import test from "node:test";
import { createRoutes } from "../dist/index.js";

const manifest = {
	home: "/",
	users: "/users",
	"users.new": "/users/new",
	"users.$user": "/users/[user]",
	"users.$user.edit": "/users/[user]/edit",
	docs: "/docs/[[...slug]]",
	files: "/files/[...path]/edit",
	help: "/[[lang]]/help",
	version: "/v[major]-[minor]",
	café: "/café/[item]",
};
const route = createRoutes(manifest);
const pick = (found) =>
	found && { name: found.name, params: { ...found.params } };

test("static, dynamic, optional, catch-all and mixed segments", () => {
	assert.deepEqual(pick(route.match("/")), { name: "home", params: {} });
	assert.deepEqual(pick(route.match("/users/42")), {
		name: "users.$user",
		params: { user: "42" },
	});
	assert.deepEqual(pick(route.match("/users/42/edit")), {
		name: "users.$user.edit",
		params: { user: "42" },
	});
	assert.deepEqual(pick(route.match("/docs")), { name: "docs", params: {} });
	assert.deepEqual(pick(route.match("/docs/guide/install")), {
		name: "docs",
		params: { slug: ["guide", "install"] },
	});
	assert.deepEqual(pick(route.match("/files/a/b/edit")), {
		name: "files",
		params: { path: ["a", "b"] },
	});
	assert.equal(
		route.match("/files/edit"),
		null,
		"a required catch-all needs one segment",
	);
	assert.deepEqual(pick(route.match("/help")), { name: "help", params: {} });
	assert.deepEqual(pick(route.match("/pt/help")), {
		name: "help",
		params: { lang: "pt" },
	});
	assert.deepEqual(pick(route.match("/v1-2")), {
		name: "version",
		params: { major: "1", minor: "2" },
	});
	assert.equal(route.match("/nope/nope/nope"), null);
	assert.equal(route.match("/users/42/edit/more"), null);
});

test("static segments win over dynamic ones regardless of declaration order", () => {
	assert.equal(route.match("/users/new").name, "users.new");
	const reversed = createRoutes({
		dynamic: "/users/[id]",
		fixed: "/users/new",
		any: "/[...rest]",
	});
	assert.equal(reversed.match("/users/new").name, "fixed");
	assert.equal(reversed.match("/users/7").name, "dynamic");
	assert.equal(reversed.match("/other/thing").name, "any");
	// Identical shapes in a hand-written manifest: declaration order decides.
	const tie = createRoutes({ first: "/p/[a]", second: "/p/[b]" });
	assert.equal(tie.match("/p/1").name, "first");
});

test("decoding is safe: encoded slashes stay inside a parameter; malformed input is null", () => {
	assert.deepEqual(route.match("/users/a%2Fb").params, { user: "a/b" });
	assert.deepEqual(route.match("/users/Ana%20Silva").params, {
		user: "Ana Silva",
	});
	assert.deepEqual(pick(route.match("/caf%C3%A9/ch%C3%A1")), {
		name: "café",
		params: { item: "chá" },
	});
	assert.equal(route.match("/users/%E0%A4%A"), null);
	assert.equal(route.match("/users//edit"), null);
	assert.equal(
		route.match("users/42"),
		null,
		"relative paths are not URLs of this app",
	);
	assert.equal(
		route.match("//evil.example/users/42"),
		null,
		"protocol-relative URLs are foreign",
	);
	assert.equal(route.match("/\\evil.example/users"), null);
	assert.equal(
		route.match("https://evil.example/users/42"),
		null,
		"absolute URLs need a configured origin",
	);
	assert.throws(() => route.match(42), { code: "INVALID_URL" });
});

test("query, fragment, trailing slash and round trips with route()", () => {
	const found = route.match("/users/42/?tab=posts&tag=a&tag=b#bio%20top");
	assert.equal(found.name, "users.$user");
	assert.deepEqual({ ...found.query }, { tab: "posts", tag: ["a", "b"] });
	assert.equal(found.hash, "bio top");
	assert.ok(
		Object.isFrozen(found) &&
			Object.isFrozen(found.params) &&
			Object.isFrozen(found.query),
	);
	for (const [name, params] of [
		["users.$user", { user: "José & Ana/1" }],
		["docs", { slug: ["a b", "c?d"] }],
		["files", { path: ["x", "y"] }],
		["version", { major: 10, minor: 2 }],
	]) {
		const url = route(name, params, { query: { q: "1" }, hash: "h" });
		const back = route.match(url);
		assert.equal(back.name, name, url);
		assert.deepEqual(
			{ ...back.params },
			JSON.parse(
				JSON.stringify(params, (_, value) =>
					typeof value === "number" ? String(value) : value,
				),
			),
		);
	}
});

test("basePath and origin are explicit, as in route()", () => {
	const app = createRoutes(
		{ home: "/", post: "/posts/[id]" },
		{ basePath: "/docs", origin: "https://example.com", trailingSlash: true },
	);
	assert.equal(app.match("/posts/1/").name, "post");
	assert.equal(
		app.match("/docs/posts/1/"),
		null,
		"without basePath: true the prefix is part of the path",
	);
	assert.deepEqual(app.match("/docs/posts/1/", { basePath: true }).params, {
		id: "1",
	});
	assert.equal(app.match("/posts/1/", { basePath: true }), null);
	assert.equal(app.match("/docs", { basePath: true }).name, "home");
	assert.equal(
		app.match("https://example.com/docs/posts/1/?a=1", { basePath: true }).query
			.a,
		"1",
	);
	assert.equal(
		app.match("https://other.example/docs/posts/1/", { basePath: true }),
		null,
	);
	assert.equal(
		app.match(new URL("https://example.com/posts/2")).params.id,
		"2",
	);
});

test("i18n: locale prefixes, localized pathnames, unlocalized routes and domains", () => {
	const localized = createRoutes(
		{ home: "/", about: "/about", post: "/blog/[slug]", api: "/api/status" },
		{
			i18n: {
				locales: ["en", "pt", "en-US"],
				defaultLocale: "en",
				localePrefix: { mode: "as-needed", prefixes: { "en-US": "/us" } },
				pathnames: {
					"/about": { pt: "/sobre" },
					"/blog/[slug]": { pt: "/artigos/[slug]" },
				},
				domains: [{ domain: "exemplo.com.br", defaultLocale: "pt" }],
				unlocalized: ["api"],
			},
			origin: "https://example.com",
		},
	);
	const at = (url) => {
		const found = localized.match(url);
		return found && [found.name, found.locale, { ...found.params }];
	};
	assert.deepEqual(at("/pt/sobre"), ["about", "pt", {}]);
	assert.deepEqual(at("/pt/artigos/ola"), ["post", "pt", { slug: "ola" }]);
	assert.deepEqual(at("/us/about"), ["about", "en-US", {}]);
	assert.deepEqual(
		at("/about"),
		["about", "en", {}],
		"as-needed: unprefixed is the default locale",
	);
	assert.deepEqual(at("/pt"), ["home", "pt", {}]);
	assert.deepEqual(at("/api/status"), ["api", undefined, {}]);
	assert.equal(
		localized.match("/pt/api/status"),
		null,
		"unlocalized routes never take a prefix",
	);
	assert.deepEqual(
		at("https://exemplo.com.br/sobre"),
		["about", "pt", {}],
		"domain default locale",
	);
	for (const locale of ["en", "pt", "en-US"])
		assert.equal(
			localized.match(localized("post", { slug: "x" }, { locale })).name,
			"post",
			locale,
		);
	const always = createRoutes(
		{ about: "/about" },
		{ i18n: { locales: ["en", "pt"], defaultLocale: "en" } },
	);
	assert.deepEqual(
		[always.match("/en/about").locale, always.match("/about").locale],
		["en", undefined],
	);
});

test("is() and breadcrumbs() build on match()", () => {
	assert.equal(route.is("users.$user", "/users/42"), true);
	assert.equal(
		route.is("users.$user", "/users/new"),
		false,
		"the static route wins",
	);
	assert.equal(route.is("users", "/users/42/edit"), false);
	assert.equal(route.is("users", "/users/42/edit", { exact: false }), true);
	assert.throws(() => route.is("missing", "/"), { code: "UNKNOWN_ROUTE" });
	assert.deepEqual(
		route.breadcrumbs("/users/42/edit?tab=1").map((found) => found.name),
		["home", "users", "users.$user", "users.$user.edit"],
	);
	assert.deepEqual(route.breadcrumbs("/nope"), [route.match("/")]);
	const localized = createRoutes(
		{ home: "/", about: "/about", team: "/about/team" },
		{
			i18n: {
				locales: ["en", "pt"],
				defaultLocale: "en",
				pathnames: {
					"/about": { pt: "/sobre" },
					"/about/team": { pt: "/sobre/equipe" },
				},
			},
		},
	);
	assert.deepEqual(
		localized
			.breadcrumbs("/pt/sobre/equipe")
			.map((found) => [found.name, found.locale]),
		[
			["home", "pt"],
			["about", "pt"],
			["team", "pt"],
		],
	);
	assert.equal(localized.forLocale("pt").match("/pt/sobre").name, "about");
});
