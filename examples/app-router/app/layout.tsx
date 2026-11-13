import type { ReactNode } from "react";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", maxWidth: 640, margin: "48px auto" }}>
        <h1>NamedRoutes · Next.js</h1>
        {children}
      </body>
    </html>
  );
}
