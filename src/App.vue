<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="bg-gray-800 text-white p-4 flex gap-4 items-center fixed top-0 left-0 right-0">
      <RouterLink to="/">Patients List</RouterLink>
      <RouterLink to="/new-patient">New Patient</RouterLink>
    </nav>
    <RouterView class="mt-16" />
  </header>
</template>

<style scoped></style>
