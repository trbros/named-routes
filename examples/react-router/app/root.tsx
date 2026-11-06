import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts } from "react-router";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body style={{ fontFamily: "system-ui", maxWidth: 640, margin: "48px auto" }}>
        <h1>NamedRoutes · React Router</h1>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  return <Outlet />;
}
