import Link from "next/link";
import { route } from "../src/routes.generated";

const links = [
  { label: "posts.$post", href: route("posts.$post", { post: 42 }) },
  { label: "user.profile", href: route("user.profile") },
];
export default function Home() {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.href}>
          {/* next/link adds basePath ("/demo") itself. */}
          <Link href={link.href}>{link.label}</Link> → <code>{link.href}</code>
        </li>
      ))}
    </ul>
  );
}