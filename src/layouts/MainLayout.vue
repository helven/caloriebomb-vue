<script setup lang="ts">
// -----------------------------------------------------------------------------
// DEPENDENCIES
// -----------------------------------------------------------------------------
import { onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import { storeToRefs } from 'pinia';
import Header from '@/layouts/components/Header.vue';

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------
// --- Stores ---
const globalStore = useGlobalStore();
const { themeMode } = storeToRefs(globalStore);

// --- Effects ---
// Tailwind darkMode 'class' reads the dark class from <html>
onMounted(() => {
  globalStore.initApp();
  document.documentElement.classList.toggle('dark', themeMode.value === 'dark');
});

watch(themeMode, (newTheme) => {
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
});
</script>
<template>
  <div class="flex h-full min-h-screen w-full flex-col">
    <!-- --- Header --- -->
    <Header />

    <!-- --- Page Content --- -->
    <main class="flex-grow pt-6">
      <RouterView />
    </main>

    <!-- --- Footer --- -->
    <footer class="mt-auto bg-card1 py-6">
      <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        © {{ new Date().getFullYear() }} CalorieBomb. All rights reserved.
        <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
      </div>
    </footer>
  </div>
</template>
