<script setup lang="ts">
// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Vue ---
import { ref } from 'vue';

// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Components ---
import MainNavigation from '@/components/MainNavigation.vue';

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// --- Props ---
defineProps<{ class?: string | undefined }>();

// --- Local State ---
const isOpen = ref(false);

// --- Handlers ---
// Search input key down handler
const handleBurgerClick = (e: Event) => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div :class="class">
    <button @click="handleBurgerClick" class="flex flex-col gap-1.5 p-2 md:hidden" aria-label="Toggle menu">
      <span class="h-0.5 w-6 bg-current transition-transform" :class="isOpen ? 'translate-y-2 rotate-45' : ''" />
      <span class="h-0.5 w-6 bg-current transition-opacity" :class="isOpen ? 'opacity-0' : ''" />
      <span class="h-0.5 w-6 bg-current transition-transform" :class="isOpen ? '-translate-y-2 -rotate-45' : ''" />
    </button>

    <div v-if="isOpen" class="fixed inset-0 z-50 md:hidden" @click="handleBurgerClick">
      <div class="absolute inset-0 bg-black/50" />
      <nav class="absolute left-0 top-0 h-full w-64 bg-card1 shadow-xl" @click="(e) => e.stopPropagation()">
        <MainNavigation
          class="flex flex-col gap-4 p-6"
          @click="
            () => {
              isOpen = false;
            }
          "
        />
      </nav>
    </div>
  </div>
</template>
