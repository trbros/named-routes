<script setup lang="ts">
import { route } from "../../../routes.generated";
import { useRoute } from "vue-router";
const aluno = (useRoute().params as { aluno?: string }).aluno;
</script>
<template>
<main>
  <h1>Student profile</h1>
  <p>Inspect a student selected through a typed dynamic route.</p>
  <p>Student ID: {{ aluno }}</p>
  <ul>
    <li><a :href="route.url('admin.alunos.index')">Back to students</a></li>
    <li><a :href="route.url('admin.index')">Dashboard</a></li>
  </ul>
</main>
</template>
