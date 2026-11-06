import Link from "next/link";
import { route } from "../src/routes.generated";
export default function Home() {
  return (
    <main>
      <h1>Pages Router</h1>
      <Link href={route("users.$user", { user: 42 })}>User 42</Link>
      <Link href={route("user.profile")}>Profile</Link>
    </main>
  );
}
