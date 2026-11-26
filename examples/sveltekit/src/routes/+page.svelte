<script lang="ts">
  import { asset, route } from "#lib/routes.generated";
  const links = [
    { label: "users.$id", href: route("users.$id", { id: 42 }) },
    { label: "docs.$slug", href: route("docs.$slug", { slug: ["guide", "install"] }) },
  ];
</script>

<main style="font-family: system-ui; max-width: 640px; margin: 48px auto">
  <h1>NamedRoutes · SvelteKit</h1>
  <ul>
    <li><img data-testid="public-asset" src={asset("named-routes-probe.svg")} data-versioned-src={asset("named-routes-probe.svg", { version: true })} alt="Named Routes asset" width="32" height="32" /></li>
    {#each links as link}
      <li><a href={link.href}>{link.label}</a> → <code>{link.href}</code></li>
    {/each}
  </ul>
</main>
