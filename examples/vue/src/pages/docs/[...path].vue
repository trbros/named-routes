<script setup lang="ts">
import { useRoute } from "vue-router";
import { route } from "../../routes.generated";
const params = useRoute().params as { path?: string | string[] };
</script>
<template>
  <p>Docs: <code>{{ params.path }}</code> — <RouterLink :to="route('home')">home</RouterLink></p>
</template>
