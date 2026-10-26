<script setup lang="ts">
// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Vue ---
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Components ---
import SearchButton from '@/components/SearchButton.vue';

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// --- Local State ---
const router = useRouter();
const localSearchValue = ref('');

// --- Handlers ---
// Search input key down handler
const handleInputEnterKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    router.push({ path: '/foods', query: { search: localSearchValue.value } });
  }
};

// Search button click handler
const handleSearchBtnClick = () => {
  router.push({ path: '/foods', query: { search: localSearchValue.value } });
};
</script>

<template>
  <input
    type="text"
    v-model="localSearchValue"
    @keydown.enter="handleInputEnterKeyDown"
    placeholder="Search for any food..."
    class="w-full rounded-full border border-gray-300 py-3 pl-4 pr-10 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700"
  />
  <SearchButton class="btn-primary absolute text-white" :width="24" :height="24" @click="handleSearchBtnClick" />
</template>
