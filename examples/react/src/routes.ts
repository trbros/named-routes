import { createRoutes } from "@triooo/named-routes";

// Manual manifest: one place for names, typed everywhere.
// <Route path="/users/:id"> becomes "/users/[id]"; "/docs/*" becomes "/docs/[[...path]]".
export const patterns = {
	home: "/",
	"users.show": "/users/[id]",
	"docs.page": "/docs/[[...path]]",
} as const;
export const route = createRoutes(patterns);
