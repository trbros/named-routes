<script lang="ts">
  import { page } from "$app/state";
  import { route } from "#lib/routes.generated";
</script>

<p>Docs: <code>{page.params.slug}</code> — <a href={route("home")}>home</a></p>
