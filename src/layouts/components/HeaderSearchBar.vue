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
//const timerRef = useRef(null);

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
    placeholder="Search for foods..."
    class="w-64 rounded-full border border-gray-300 py-1 pl-3 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
  />
  <SearchButton class="absolute text-gray-400" :width="16" :height="16" @click="handleSearchBtnClick" />
</template>
