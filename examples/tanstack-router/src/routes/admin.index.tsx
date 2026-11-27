import { createFileRoute } from "@tanstack/react-router";
import { route } from "../routes.generated";
export const Route = createFileRoute("/admin/")({ component: Page });
function Page() {
  
  return (
    <main>
  <h1>Admin dashboard</h1>
  <p>Manage students through a group of named routes.</p>
  <ul>
    <li><a href={route.url("admin.alunos.index")}>Browse students</a></li>
  </ul>
</main>
  );
}
