<script setup lang="ts">
import { route } from "~/routes.generated";
const links = [
  { label: "users.$id", href: route("users.$id", { id: 42 }) },
  { label: "docs.$slug", href: route("docs.$slug", { slug: ["guide", "install"] }) },
  { label: "docs.$slug (empty)", href: route("docs.$slug") },
];
</script>
<template>
  <ul>
    <li v-for="link in links" :key="link.href">
      <NuxtLink :to="link.href">{{ link.label }}</NuxtLink> → <code>{{ link.href }}</code>
    </li>
  </ul>
</template>
