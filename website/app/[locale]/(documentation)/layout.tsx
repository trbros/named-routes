import { Workspace } from "../../../components/workspace";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Workspace section="docs">{children}</Workspace>;
}
