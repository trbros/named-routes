import { Workspace } from "../../../components/workspace";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Workspace section="explore">{children}</Workspace>;
}
