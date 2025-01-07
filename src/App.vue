<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="relative">
    <header>
      <nav class="flex justify-between items-center p-4 bg-gray-800 text-white">
        <router-link to="/">Home</router-link>
      </nav>
    </header>
    <router-view class="p-4"></router-view>
  </div>
</template>

<style scoped></style>
