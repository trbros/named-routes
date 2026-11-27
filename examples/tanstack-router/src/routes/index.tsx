import { createFileRoute } from "@tanstack/react-router";
import { asset, route } from "../routes.generated";

const links = [
  { label: "Admin dashboard", href: route("admin.index") },
  { label: "users.$id", href: route("users.$id", { id: 42 }) },
  { label: "docs.$_splat", href: route("docs.$_splat", { _splat: ["guide", "install"] }) },
];
export const Route = createFileRoute("/")({
  component: () => (
    <ul>
      <li><img data-testid="public-asset" src={asset("named-routes-probe.svg")} data-versioned-src={asset("named-routes-probe.svg", { version: true })} alt="Named Routes asset" width={32} height={32} /></li>
      {links.map((link) => (
        // Plain anchors: TanStack's typed <Link> expects its own route ids.
        <li key={link.href}>
          <a href={link.href}>{link.label}</a> → <code>{link.href}</code>
        </li>
      ))}
    </ul>
  ),
});
