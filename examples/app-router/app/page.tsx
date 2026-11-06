import Link from "next/link";
import { route } from "../src/routes.generated";
export default function Home() {
  return (
    <main>
      <h1>App Router</h1>
      <Link href={route("posts.$post", { post: 42 })}>Post 42</Link>
      <Link href={route("user.profile")}>Profile</Link>
    </main>
  );
}
