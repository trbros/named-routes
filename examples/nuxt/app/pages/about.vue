<script setup lang="ts">
// The URL is declared in code; the file name says "about".
definePageMeta({ path: "/sobre", alias: ["/a-propos"] });
</script>
<template>
  <p>Sobre · declared with definePageMeta({ path: "/sobre" })</p>
</template>
