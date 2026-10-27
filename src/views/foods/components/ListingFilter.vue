<script setup lang="ts">
// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
type FilterHandler = { value: string; change: (e: Event) => void };

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// --- Props ---
withDefaults(
  defineProps<{
    class: string;
    category?: FilterHandler;
    sortBy?: FilterHandler;
    sortOrder: FilterHandler;
  }>(),
  {
    class: '',
    category: () => ({ value: '', change: () => {} }),
    sortBy: () => ({ value: '', change: () => {} }),
    sortOrder: () => ({ value: '', change: () => {} }),
  },
);
</script>

<template>
  <div class="rounded-lg bg-card1 p-4 shadow-md" :class="class">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div>
        <label class="mb-1 block text-sm font-medium">Category</label>
        <select
          class="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          :value="category.value"
          @change="category.change($event)"
        >
          <option value="">All</option>
          <option value="beverage">Beverage</option>
          <option value="condiments">Condiments</option>
          <option value="cream_crackers">Cream Crackers</option>
          <option value="dairy">Dairy</option>
          <option value="dessert">Dessert</option>
          <option value="fruit">Fruit</option>
          <option value="grain">Grain</option>
          <option value="meat">Meat</option>
          <option value="misc">Misc</option>
          <option value="oils-fats">Oils Fats</option>
          <option value="seafood">Seafood</option>
          <option value="snack">Snack</option>
          <option value="vegetable">Vegetable</option>
        </select>
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium">Sort By</label>
        <select
          class="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          :value="sortBy.value"
          @change="sortBy.change($event)"
        >
          <option value="name">Name</option>
          <option value="calories_kcal">Calories</option>
          <option value="protein_g">Protein</option>
          <option value="carbs_g">Carbs</option>
          <option value="fat_g">Fat</option>
        </select>
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium">Sort Order</label>
        <select
          class="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          :value="sortOrder.value"
          @change="sortOrder.change($event)"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  </div>
</template>
