<script setup lang="ts">
import { route } from "~/routes.generated";
const params = useRoute().params;
</script>
<template>
  <p>Docs: <code>{{ params.slug }}</code> — <NuxtLink :to="route('home')">home</NuxtLink></p>
</template>
