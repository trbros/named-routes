import { Link } from "react-router";
import { asset, route } from "../routes.generated";

const links = [
  { label: "users.$id", href: route("users.$id", { id: 42 }) },
  { label: "docs.$splat", href: route("docs.$splat", { splat: ["guide", "install"] }) },
  { label: "sobre (routes.ts)", href: route("sobre") },
];
export default function Home() {
  return (
    <ul>
      <li><img data-testid="public-asset" src={asset("named-routes-probe.svg")} data-versioned-src={asset("named-routes-probe.svg", { version: true })} alt="Named Routes asset" width={32} height={32} /></li>
      {links.map((link) => (
        <li key={link.href}>
          <Link to={link.href}>{link.label}</Link> → <code>{link.href}</code>
        </li>
      ))}
    </ul>
  );
}
