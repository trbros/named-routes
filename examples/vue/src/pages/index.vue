<script setup lang="ts">
import { route } from "../routes.generated";
const links = [
  { label: "users.$id", href: route("users.$id", { id: 42 }) },
  { label: "docs.$path", href: route("docs.$path", { path: ["guide", "install"] }) },
];
</script>
<template>
  <ul>
    <li v-for="link in links" :key="link.href">
      <RouterLink :to="link.href">{{ link.label }}</RouterLink> → <code>{{ link.href }}</code>
    </li>
  </ul>
</template>
