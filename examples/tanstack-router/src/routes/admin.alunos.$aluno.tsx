import { createFileRoute } from "@tanstack/react-router";
import { route } from "../routes.generated";
export const Route = createFileRoute("/admin/alunos/$aluno")({ component: Page });
function Page() {
  const { aluno } = Route.useParams();
  return (
    <main>
  <h1>Student profile</h1>
  <p>Inspect a student selected through a typed dynamic route.</p>
  <p>Student ID: {aluno}</p>
  <ul>
    <li><a href={route.url("admin.alunos.index")}>Back to students</a></li>
    <li><a href={route.url("admin.index")}>Dashboard</a></li>
  </ul>
</main>
  );
}
