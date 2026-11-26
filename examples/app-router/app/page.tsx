import Link from "next/link";
import { asset, route } from "../src/routes.generated";

const links = [
  { label: "posts.$post", href: route("posts.$post", { post: 42 }) },
  { label: "posts.$post + query", href: route("posts.$post", { post: 7 }, { query: { tab: "comments" } }) },
  { label: "user.profile", href: route("user.profile") },
  { label: "docs.$slug", href: route("docs.$slug", { slug: ["guide", "install"] }) },
];
export default function Home() {
  return (
    <ul>
      <li><img data-testid="public-asset" src={asset("named-routes-probe.svg")} data-versioned-src={asset("named-routes-probe.svg", { version: true })} alt="Named Routes asset" width={32} height={32} /></li>
      {links.map((link) => (
        <li key={link.href}>
          {/* next/link adds basePath ("/demo") itself; typedRoutes accepts the typed href. */}
          <Link href={link.href}>{link.label}</Link> → <code>{link.href}</code>
        </li>
      ))}
    </ul>
  );
}
