import { Link } from "react-router";
import { route } from "../routes.generated";

const links = [
  { label: "users.$id", href: route("users.$id", { id: 42 }) },
  { label: "docs.$splat", href: route("docs.$splat", { splat: ["guide", "install"] }) },
  { label: "sobre (routes.ts)", href: route("sobre") },
];
export default function Home() {
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
