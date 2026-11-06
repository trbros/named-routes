<script lang="ts">
  import { route } from "#lib/routes.generated";
  const links = [
    { label: "users.$id", href: route("users.$id", { id: 42 }) },
    { label: "docs.$slug", href: route("docs.$slug", { slug: ["guide", "install"] }) },
  ];
</script>

<main style="font-family: system-ui; max-width: 640px; margin: 48px auto">
  <h1>NamedRoutes · SvelteKit</h1>
  <ul>
    {#each links as link}
      <li><a href={link.href}>{link.label}</a> → <code>{link.href}</code></li>
    {/each}
  </ul>
</main>
