<script setup lang="ts">
// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Utils ---
import { formatNutrient } from '@/utils/formatters';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
import type { Food } from '@/types';

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// --- Props ---
defineProps<{ food: Food }>();
</script>

<template>
  <div>
    <div class="food-card">
      <!-- TODO <RouterLink
        :to="`/foods/${food.id}`"
        class="food-thumb"
        style="
          background-image: url('/assets/images/bomb.svg');
          background-position: 65% 45%;
          background-repeat: no-repeat;
          background-size: 65%;
        "
      >
      </RouterLink>-->
      <div
        class="food-thumb"
        style="
          background-image: url('/assets/images/bomb.svg');
          background-position: 65% 45%;
          background-repeat: no-repeat;
          background-size: 65%;
        "
      ></div>
      <div class="p-4">
        <div class="flex items-start justify-between">
          <!-- TODO <RouterLink :to="`/foods/${food.id}`" class="food-name">{{ food.name }}</RouterLink>-->
          <span class="food-name">{{ food.name }}</span>
          <span class="food-calories">{{ formatNutrient(food.calories_kcal) }} kcal</span>
        </div>
        <div class="mt-4 flex space-x-4">
          <div class="food-macro">
            <span class="mr-1">🍖</span>
            <span class="food-macro-text">{{ formatNutrient(food.protein_g) }}g</span>
          </div>
          <div class="food-macro">
            <span class="mr-1">🌾</span>
            <span class="food-macro-text">{{ formatNutrient(food.carbohydrate_g) }}g</span>
          </div>
          <div class="food-macro">
            <span class="mr-1">🥑</span>
            <span class="food-macro-text">{{ formatNutrient(food.fat_g) }}g</span>
          </div>
        </div>
        <div class="mt-3 text-left">
          <RouterLink :to="`/foods?category=${food.category.slug}`" class="food-category">
            {{ food.category.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
