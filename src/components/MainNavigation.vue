<script setup lang="ts">
// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// --- Props ---
const emit = defineEmits<{ onLinkClick: [] }>();
</script>

<template>
  <nav className="{className}">
    <RouterLink to="/about" @click="emit('onLinkClick')">About Us</RouterLink>
    <RouterLink to="/pricing" @click="emit('onLinkClick')">Pricing</RouterLink>
    <RouterLink to="/contact" @click="emit('onLinkClick')">Contact Us</RouterLink>
  </nav>
</template>
