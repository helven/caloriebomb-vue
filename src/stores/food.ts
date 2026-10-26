// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Vue ---
import { ref, computed } from 'vue';

// --- Pinia ---
import { defineStore } from 'pinia';

// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
import type { Food, FoodsState, FoodsListState, FoodDetailState } from '@/types';

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const CACHE_DURATION = 1 * 60 * 60 * 1000; // 1 hour in ms

const apiHeaders = {
  'Content-Type': 'application/json',
  'Request-Context': '7bbf3f21-e318-4d1a-ab9f-fc3e744ea8dd', // decoy
  'Client-Context': 'web', // decoy
  'Session-Flag': Math.random().toString(36).substring(2, 8), // decoy
  'Meta': import.meta.env.VITE_API_SECRET,
  'Device-Info': /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop', // decoy
  'App-Env': 'prod',
};

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------
/**
 * Checks if a cached food entry came from a detail fetch that has not expired yet.
 * Only a detail fetch sets expiresAt, so a list-only entry is never fresh.
 */
const isFreshFood = (entry: FoodDetailState | undefined): boolean => {
  if (entry === undefined) {
    return false;
  }
  if (entry.expiresAt === undefined) {
    return false;
  }
  return entry.expiresAt > Date.now();
};

// -----------------------------------------------------------------------------
// STORE
// -----------------------------------------------------------------------------
/**
 * Holds the food list and the actions that change it.
 */
export const useFoodStore = defineStore('food', () => {
  // --- State ---
  const foodsById = ref<Record<number, FoodDetailState>>({});
  const list = ref<FoodsListState>({ ids: [], page: 1, totalItems: 0, status: 'idle', error: null });
  const compareFoodIds = ref<number[]>([]);

  // --- Getters ---
  const listFoods = computed<Food[]>(() =>
    list.value.ids.map((id) => foodsById.value[id]?.food).filter((food): food is Food => !!food),
  );

  // --- Actions ---
  const fetchFoods = async (apiUrl: string) => {
    if (list.value.status === 'loading') {
      return;
    }

    list.value.status = 'loading';
    list.value.error = null;

    try {
      const response = await fetch(apiUrl, {
        headers: apiHeaders,
      });
      // fetch() does not throw on 404, so throw by hand
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = (await response.json()) as { success: boolean; data: { items: Food[]; total: number } };

      // HTTP 200 can still carry success: false, so throw by hand
      if (!json.success) {
        throw new Error('API returned success: false');
      }

      // Reset list to empty for new page
      list.value.ids = [];
      json.data.items.forEach((food) => {
        const oldEntry: FoodDetailState | undefined = foodsById.value[food.id];

        // Push food in the foodsById map, merge with old data if it's still fresh
        if (oldEntry && isFreshFood(oldEntry)) {
          // Merge with old data
          oldEntry.food = { ...oldEntry.food, ...food };
        } else {
          // Fresh push
          foodsById.value[food.id] = {
            food: food,
            status: 'succeeded',
            hasFullData: false,
            expiresAt: Date.now() + CACHE_DURATION,
          };
        }

        // Push food id into the list of ids, skip duplicates inside the same response
        if (!list.value.ids.includes(food.id)) {
          list.value.ids.push(food.id);
        }
      });

      list.value.totalItems = json.data.total;
      list.value.status = 'succeeded';
    } catch (error) {
      list.value.status = 'failed';
      list.value.error = error instanceof Error ? error.message : String(error);
    }
  };

  return { foodsById, list, compareFoodIds, listFoods, fetchFoods };
});
