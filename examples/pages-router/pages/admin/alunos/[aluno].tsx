import { route } from "../../../src/routes.generated";
import { useRouter } from "next/router";
export default function Page() {
  const { aluno } = useRouter().query;
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
