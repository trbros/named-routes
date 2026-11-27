import { api, route } from "../../src/routes.generated";
export default function Page() {
  
  return (
    <main>
  <h1>Admin dashboard</h1>
  <p>API preview: <code>{api.admin.post().method} {api.admin.post().url}</code></p>
  <p>Manage students through a group of named routes.</p>
  <ul>
    <li><a href={route.url("admin.alunos.index")}>Browse students</a></li>
  </ul>
</main>
  );
}
