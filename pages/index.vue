<!-- index.vue -->
<template>
    <h1>Landing Page</h1>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ['redirect-login'] // redirecting to login page if not logged in
  })
</script>

