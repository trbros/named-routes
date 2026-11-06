import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes, useParams } from "react-router";
import { route } from "./routes";

function Home() {
  const links = [
    { label: "users.show", href: route("users.show", { id: 42 }) },
    { label: "docs.page", href: route("docs.page", { path: ["guide", "install"] }) },
  ];
  return (
    <ul>
      {links.map((link) => (
        <li key={link.href}>
          <Link to={link.href}>{link.label}</Link> → <code>{link.href}</code>
        </li>
      ))}
    </ul>
  );
}
function User() {
  const { id } = useParams();
  return <p>User <strong>{id}</strong> — <Link to={route("home")}>home</Link></p>;
}
function Docs() {
  const params = useParams();
  return <p>Docs: <code>{params["*"]}</code> — <Link to={route("home")}>home</Link></p>;
}
createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <BrowserRouter>
      <main style={{ fontFamily: "system-ui", maxWidth: 640, margin: "48px auto" }}>
        <h1>NamedRoutes · React (manual routes)</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/docs/*" element={<Docs />} />
        </Routes>
      </main>
    </BrowserRouter>
  </StrictMode>,
);
