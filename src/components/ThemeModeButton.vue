<script setup lang="ts">
// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// -- Pinia ---
import { storeToRefs } from 'pinia';

// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Store ---
import { useGlobalStore } from '@/stores/global';

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// --- Stores ---
const globalStore = useGlobalStore();
const { themeMode } = storeToRefs(globalStore);
const { setThemeMode } = globalStore;
</script>

<template>
  <!-- setThemeMode() takes no value, it toggles between light and dark -->
  <button @click="setThemeMode()">{{ themeMode === 'dark' ? '☀️' : '🌙' }}</button>
</template>
