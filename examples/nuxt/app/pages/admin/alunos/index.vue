<script setup lang="ts">
import { route } from "../../../routes.generated";
</script>
<template>
<main>
  <h1>Students directory</h1>
  <p>Choose a student or open the creation form. This demo uses sample records.</p>
  <p><a :href="route.url('admin.alunos.index', { query: { sort: 'name' } })">Sort by name (URL example)</a></p>
  <ul>
    <li><a :href="route.url('admin.index')">Dashboard</a></li>
    <li><a :href="route.url('admin.alunos.create')">New student</a></li>
    <li><a :href="route.url('admin.alunos.show', { params: { aluno: 42 } })">Ana · #42</a></li>
    <li><a :href="route.url('admin.alunos.show', { params: { aluno: 7 } })">Bruno · #7</a></li>
  </ul>
</main>
</template>
