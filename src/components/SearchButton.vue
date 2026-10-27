<script setup lang="ts">
// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// --- Props ---
withDefaults(defineProps<{ width?: number; height?: number; class?: string | undefined }>(), {
  width: 24,
  height: 24,
  class: '',
});

const emit = defineEmits<{ click: [] }>();
</script>

<template>
  <button
    class="right-3 top-1/2 -translate-y-1/2 transform rounded-full p-1 text-gray-400"
    :class="class"
    @click="emit('click')"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="lucide lucide-search"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  </button>
</template>
