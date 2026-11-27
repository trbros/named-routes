<script setup lang="ts">
import { route } from "../../routes.generated";
</script>
<template>
<main>
  <h1>Admin dashboard</h1>
  <p>Manage students through a group of named routes.</p>
  <ul>
    <li><a :href="route.url('admin.alunos.index')">Browse students</a></li>
  </ul>
</main>
</template>
