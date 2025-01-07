<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import ToggleMode from '@/components/ToggleMode.vue'
import Navbar from '@/components/layout/Navbar.vue'
</script>

<template>
  <div class="relative">
    <header class="flex items-center justify-center p-4">
      <Navbar />
      <div class="self-end">
        <ToggleMode />
      </div>
    </header>
    <main class="p-6">
      <router-view></router-view>
    </main>
    <Toaster />
  </div>
</template>

<style scoped></style>
