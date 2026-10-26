<script setup lang="ts">
// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Vue ---
import { onMounted } from 'vue';

// --- Pinia ---
import { storeToRefs } from 'pinia';

// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Constants ---
import { API_ROUTES } from '@/constants/apiRoutes';

// --- Store ---
import { useFoodStore } from '@/stores/food';

// --- Components ---
import ListingFilter from '@/views/foods/components/ListingFilter.vue';
import FoodCard from '@/components/FoodCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import Pagination from '@/components/listing/Pagination.vue';

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// --- Stores ---
const foodStore = useFoodStore();
const { listFoods } = storeToRefs(foodStore);
const { fetchFoods } = foodStore;

// --- Lifecycle ---
onMounted(() => {
  fetchFoods(`${API_ROUTES.FOODS.BASE}?sortby=name&sortorder=asc&per_page=9&page=1`);
});
</script>

<template>
  <!-- --- Page Header --- -->
  <section class="page-header text-center">
    <h2 class="mb-4 text-4xl font-bold">Find Your Food's Kaboom <span class="inline-block">💣</span></h2>
    <p class="mb-8">Discover the nutritional content of your favorite foods</p>
    <div class="mx-auto max-w-md">
      <div class="relative">
        <SearchBar />
      </div>
    </div>
  </section>

  <section class="container mx-auto mb-8 grid grid-cols-1 gap-8 px-4">
    <!-- --- Title & Filter Toggle --- -->
    <div>
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold">All Foods</h1>
          <div class="text-left text-sm"></div>
        </div>
        <!--<button class="btn btn-secondary flex items-center rounded-md px-3 py-2 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-sliders-horizontal mr-2"
          >
            <line x1="21" x2="14" y1="4" y2="4"></line>
            <line x1="10" x2="3" y1="4" y2="4"></line>
            <line x1="21" x2="12" y1="12" y2="12"></line>
            <line x1="8" x2="3" y1="12" y2="12"></line>
            <line x1="21" x2="16" y1="20" y2="20"></line>
            <line x1="12" x2="3" y1="20" y2="20"></line>
            <line x1="14" x2="14" y1="2" y2="6"></line>
            <line x1="8" x2="8" y1="10" y2="14"></line>
            <line x1="16" x2="16" y1="18" y2="22"></line>
          </svg>
          Filters
        </button>-->
      </div>
    </div>

    <!-- --- Filters --- -->
    <!--<ListingFilter />-->

    <!-- --- Food Grid --- -->
    <section>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FoodCard v-for="food in listFoods" :key="food.id" :food="food" />
      </div>
    </section>

    <!-- --- Pagination --- -->
    <Pagination />
  </section>
</template>
