import { createFileRoute } from "@tanstack/react-router";
import { route } from "../routes.generated";

const links = [
  { label: "users.$id", href: route("users.$id", { id: 42 }) },
  { label: "docs.$_splat", href: route("docs.$_splat", { _splat: ["guide", "install"] }) },
];
export const Route = createFileRoute("/")({
  component: () => (
    <ul>
      {links.map((link) => (
        // Plain anchors: TanStack's typed <Link> expects its own route ids.
        <li key={link.href}>
          <a href={link.href}>{link.label}</a> → <code>{link.href}</code>
        </li>
      ))}
    </ul>
  ),
});
