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
import FoodCard from '@/components/FoodCard.vue';
import SearchBar from '@/components/SearchBar.vue';

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// --- Stores ---
const foodStore = useFoodStore();
const { listFoods } = storeToRefs(foodStore);
const { fetchFoods } = foodStore;

// --- Lifecycle ---
onMounted(async () => {
  await fetchFoods(`${API_ROUTES.FOODS.BASE}?sortby=random&per_page=6`);
  console.log(listFoods.value);
});
</script>

<template>
  <!-- --- Page Header --- -->
  <section class="page-header text-center">
    <h2 class="mb-4 text-4xl font-bold dark:text-white">
      Find Your Food's Kaboom <span class="inline-block">💣</span>
    </h2>
    <p class="mb-8">Discover the nutritional content of your favorite foods</p>
    <div class="mx-auto max-w-md">
      <div class="relative">
        <SearchBar />
      </div>
    </div>
  </section>

  <!-- --- Featured Foods --- -->
  <section class="container mx-auto px-4 py-8">
    <h3 class="mb-8 text-center text-2xl font-bold dark:text-white"><span>🔥</span> Featured Foods <span>🔥</span></h3>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FoodCard v-for="food in listFoods" :key="food.id" :food="food" />
    </div>
    <div class="mt-8 text-center">
      <RouterLink to="/foods" class="btn btn-primary">Browse All Foods</RouterLink>
    </div>
  </section>

  <!-- --- Browse by Category --- -->
  <section class="container mx-auto px-4 py-12">
    <h3 class="mb-8 text-center text-2xl font-bold dark:text-white">Browse by Category</h3>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <RouterLink to="/foods?category=meat" class="food-category-card">
        <div class="rounded-lg p-6 text-center shadow-md transition-shadow hover:shadow-lg">
          <div class="mb-3 text-4xl">🥩</div>
          <h4 class="food-category-name">Meat</h4>
        </div>
      </RouterLink>
      <RouterLink to="/foods?category=vegetable" class="food-category-card">
        <div class="rounded-lg p-6 text-center shadow-md transition-shadow hover:shadow-lg">
          <div class="mb-3 text-4xl">🥦</div>
          <h4 class="food-category-name">Vegetable</h4>
        </div>
      </RouterLink>
      <RouterLink to="/foods?category=fruit" class="food-category-card">
        <div class="rounded-lg p-6 text-center shadow-md transition-shadow hover:shadow-lg">
          <div class="mb-3 text-4xl">🍎</div>
          <h4 class="food-category-name">Fruit</h4>
        </div>
      </RouterLink>
      <RouterLink to="/foods?category=dessert" class="food-category-card">
        <div class="rounded-lg p-6 text-center shadow-md transition-shadow hover:shadow-lg">
          <div class="mb-3 text-4xl">🍰</div>
          <h4 class="food-category-name">Dessert</h4>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
