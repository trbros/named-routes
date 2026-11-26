<script setup lang="ts">
import { asset, route } from "../routes.generated";
const links = [
  { label: "users.$id", href: route("users.$id", { id: 42 }) },
  { label: "docs.$path", href: route("docs.$path", { path: ["guide", "install"] }) },
  { label: "sobre (definePage path)", href: route("sobre") },
];
</script>
<template>
  <ul>
    <li><img data-testid="public-asset" :src="asset('named-routes-probe.svg')" :data-versioned-src="asset('named-routes-probe.svg', { version: true })" alt="Named Routes asset" width="32" height="32" /></li>
    <li v-for="link in links" :key="link.href">
      <RouterLink :to="link.href">{{ link.label }}</RouterLink> → <code>{{ link.href }}</code>
    </li>
  </ul>
</template>
