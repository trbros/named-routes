import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <main style={{ fontFamily: "system-ui", maxWidth: 640, margin: "48px auto" }}>
      <h1>NamedRoutes · TanStack Router</h1>
      <Outlet />
    </main>
  ),
});
