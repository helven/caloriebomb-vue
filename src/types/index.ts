// -----------------------------------------------------------------------------
// FOOD TYPE
// -----------------------------------------------------------------------------
// Sample FoodsState (the whole store):
//
// {
//   "foodsById": {                      // Record<number, FoodDetailState> - cache, keyed by food id
//     "12": {                           // FoodDetailState - one food + its fetch status
//       "food": {                       // Food - the actual row from the API
//         "id": 12,
//         "source_url": "https://example.com/foods/12",
//         "name": "Nasi Lemak",
//         "category": { "id": 3, "parent_id": 1, "name": "Rice", "slug": "rice", "emoji": "🍚", "level": 2 },
//         "category_id": 3,
//         "energy_kj": 2720,
//         "calories_kcal": 650,
//         "protein_g": 18,
//         "carbohydrate_g": 80,
//         "fat_g": 28,
//         "saturated_fat_g": 12,
//         "monounsaturated_fat_g": 9,
//         "polyunsaturated_fat_g": 4,
//         "cholesterol_mg": 190,
//         "fiber_g": 3
//       },
//       "hasFullData": true,              // true after the detail page fetch
//       "expiresAt": 1761552000000,       // ms timestamp, refetch after this
//       "status": "succeeded",
//       "error": null
//     },
//     "15": {                           // still loading, no food yet
//       "status": "loading",
//       "error": null
//     }
//   },
//   "list": {                           // FoodsListState - the current results page
//     "ids": [12, 15],                  // look up each id in foodsById
//     "page": 1,
//     "totalItems": 42,
//     "status": "succeeded",
//     "error": null
//   },
//   "compareFoodIds": [12]
// }
// -----------------------------------------------------------------------------
export type FoodsState = {
  foodsById: Record<number, FoodDetailState>; // to change to detailsById
  list: FoodsListState; // to change to listing
  compareFoodIds: number[]; // to change to compareIds
  [key: string]: unknown;
};

export type FoodsListState = {
  ids: number[]; // food ids for the current page, in display order
  page: number;
  totalItems: number; // from the API, for the Pagination component
  status: FoodsStatus;
  error?: string | null;
  [key: string]: unknown;
};

export type FoodDetailState = {
  food?: Food;
  hasFullData?: boolean;
  expiresAt?: number;
  status: FoodsStatus;
  error?: string | null;
  [key: string]: unknown;
};

export type Food = {
  id: number;
  source_url: string;
  name: string;
  category: {
    id: number;
    parent_id: number;
    name: string;
    slug: string;
    emoji: string;
    level: number;
    [key: string]: unknown;
  };
  category_id: number;
  energy_kj: number;
  calories_kcal: number;
  protein_g: number;
  carbohydrate_g: number;
  fat_g: number;
  saturated_fat_g: number;
  monounsaturated_fat_g: number;
  polyunsaturated_fat_g: number;
  cholesterol_mg: number;
  fiber_g: number;
};

export type FoodsStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ApiFoodResponse = {
  success: boolean;
  data: Food;
};
