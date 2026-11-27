import type { Metadata } from "next";
// Arbitrary demo parameters must not be indexed. Playground overrides this at its page.
export const metadata: Metadata = { robots: { index: false, follow: true } };
import { Workspace } from "../../../components/workspace";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Workspace section="explore">{children}</Workspace>;
}
