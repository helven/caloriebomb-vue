<script setup lang="ts">
// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Vue ---
import { ref } from 'vue';
// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Utils ---
import { formatNutrient } from '@/utils/formatters';
// --- Constants ---
import { CDN_MEDIA_URL } from '@/constants/global';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
import type { Food } from '@/types';

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// --- Props ---
const { food } = defineProps<{ food: Food }>();
console.log(food.id);
const FALLBACK_IMG = `${CDN_MEDIA_URL}/assets/images/food/default-thumb.jpg`;
const imgSrc = ref(`${CDN_MEDIA_URL}/assets/images/food/${food.id}-thumb.jpg`);

function onImgError() {
  imgSrc.value = FALLBACK_IMG;
}
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
      <!--<div
        class="food-thumb"
        style="background-position: 65% 45%; background-repeat: no-repeat; background-size: 65%; position: relative"
        :style="{ backgroundImage: `url('${CDN_MEDIA_URL}/assets/images/food/${food.id}-full.jpg')` }"
      >-->
      <div class="food-thumb relative overflow-hidden">
        <img
          :src="imgSrc"
          alt=""
          className="absolute top-[45%] h-full max-w-none -translate-y-[45%]"
          @error="onImgError"
        />
      </div>
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
