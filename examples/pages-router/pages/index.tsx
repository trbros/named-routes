import Link from "next/link";
import { asset, route } from "../src/routes.generated";
export default function Home() {
  return (
    <main>
      <h1>Pages Router</h1>
      <ul>
        <li><img data-testid="public-asset" src={asset("named-routes-probe.svg")} data-versioned-src={asset("named-routes-probe.svg", { version: true })} alt="Named Routes asset" width={32} height={32} /></li>
        <li><Link href={route("users.$user", { user: 42 })}>User 42</Link></li>
        <li><Link href={route("users.$user", { user: 42 })} locale="pt">User 42 (pt)</Link></li>
        <li><Link href={route("users.$user", { user: 7 }, { query: { tab: "posts" } })}>User 7 posts</Link></li>
        <li><Link href={route("user.profile")}>Profile</Link></li>
        <li><Link href={route("docs.$slug", { slug: ["guide", "install"] })}>Docs</Link></li>
      </ul>
    </main>
  );
}
