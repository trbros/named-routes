<script lang="ts">
  import { page } from "$app/state";
  import { route } from "#lib/routes.generated";
</script>

<p>User <strong>{page.params.id}</strong> — <a href={route("home")}>home</a></p>
