<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const props = defineProps({
  class: { type: null, required: false },
})
</script>

<template>
  <nav aria-label="breadcrumb" :class="props.class">
    <slot />
  </nav>
</template>
