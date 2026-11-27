import { route } from "../routes.generated";
export default function Page() {
  
  return (
    <main>
  <h1>New student</h1>
  <p>Preview a new student without saving personal data. The form submits a GET to the directory; no database is connected.</p>
  <form method="get" action={route.url("admin.alunos.index")}>
    <label>Student name <input name="draft" required /></label>
    <button type="submit">Preview in directory</button>
  </form>
  <ul>
    <li><a href={route.url("admin.alunos.index")}>Back to students</a></li>
    <li><a href={route.url("admin.index")}>Dashboard</a></li>
  </ul>
</main>
  );
}
