<script setup lang="ts">
// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// --- Props ---
withDefaults(defineProps<{ type?: 'left' | 'right'; disabled?: boolean; variant?: 'default' | 'circle' }>(), {
  type: 'right',
  disabled: false,
  variant: 'default',
});

const emit = defineEmits<{ click: [] }>();

// Define different path patterns for each arrow type
const paths = {
  left: 'm15 18-6-6 6-6',
  right: 'm9 18 6-6-6-6',
  up: 'm18 15-6-6-6 6',
  down: 'm6 9 6 6 6-6',
};

// Define different button styles based on variant
//const buttonStyles = {
//  default: 'p-2 rounded-md',
//  circle: 'p-2 rounded-full',
//  square: 'p-2 w-10 h-10',
//};
</script>
<template>
  <span @click="emit('click')">
    <svg
      v-if="variant === 'circle'"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path :d="paths[type]"></path>
    </svg>

    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path :d="paths[type]"></path>
    </svg>
  </span>
</template>
