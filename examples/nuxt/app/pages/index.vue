<script setup lang="ts">
import { asset, route } from "~/routes.generated";
const links = [
  { label: "users.$id", href: route("users.$id", { id: 42 }) },
  { label: "docs.$slug", href: route("docs.$slug", { slug: ["guide", "install"] }) },
  { label: "docs.$slug (empty)", href: route("docs.$slug") },
  { label: "sobre (definePageMeta path)", href: route("sobre") },
];
</script>
<template>
  <ul>
    <li><img data-testid="public-asset" :src="asset('named-routes-probe.svg')" :data-versioned-src="asset('named-routes-probe.svg', { version: true })" alt="Named Routes asset" width="32" height="32" /></li>
    <li v-for="link in links" :key="link.href">
      <NuxtLink :to="link.href">{{ link.label }}</NuxtLink> → <code>{{ link.href }}</code>
    </li>
  </ul>
</template>
