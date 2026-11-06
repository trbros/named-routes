<script setup lang="ts">
import { route } from "~/routes.generated";
const params = useRoute().params;
</script>
<template>
  <p>User <strong>{{ params.id }}</strong> — <NuxtLink :to="route('home')">home</NuxtLink></p>
</template>
