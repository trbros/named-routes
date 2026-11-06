<script setup lang="ts">
import { useRoute } from "vue-router";
import { route } from "../../routes.generated";
const params = useRoute().params as { id?: string };
</script>
<template>
  <p>User <strong>{{ params.id }}</strong> — <RouterLink :to="route('home')">home</RouterLink></p>
</template>
