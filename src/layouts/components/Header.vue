<script setup lang="ts">
// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Vue ---
import { ref, watch, useTemplateRef, onMounted } from 'vue';

// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Components ---
import Logo from '@/components/Logo.vue';
import MainNavigation from '@/components/MainNavigation.vue';
import MobileNavigation from '@/components/MobileNavigation.vue';
import HeaderSearchBar from '@/layouts/components/HeaderSearchBar.vue';
import ThemeModeButton from '@/components/ThemeModeButton.vue';

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// --- Local State ---
const isScrolled = ref(false);
const headerRef = useTemplateRef<HTMLElement>('headerRef');

// --- Handlers ---
const handleScroll = () => {
  if (!headerRef.value) {
    return;
  }

  // Pin the header once the page scrolls past the header's own height
  isScrolled.value = window.scrollY > headerRef.value.offsetHeight;
};

// --- Lifecycle ---
// onMounted because listener only need to be assigned once
onMounted(() => {
  // Set the start state when the page loads already scrolled
  handleScroll();
  window.addEventListener('scroll', handleScroll);

  return () => window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header
    ref="headerRef"
    class="bg-card1 shadow-sm"
    :class="isScrolled ? 'fixed left-0 right-0 top-0 z-50 backdrop-blur-sm' : ''"
  >
    <div
      class="container mx-auto grid grid-cols-1 items-center justify-items-center px-4 py-3 md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch"
    >
      <!-- --- Mobile Navigation --- -->
      <MobileNavigation class="absolute left-4 top-4" />

      <!-- --- Logo --- -->
      <RouterLink to="/" class="md:justify-self-start">
        <Logo />
      </RouterLink>

      <!-- --- Main Navigation --- -->
      <div class="hidden items-center md:flex md:justify-self-center">
        <MainNavigation class="hidden gap-4 md:flex" />
      </div>

      <!-- --- Actions --- -->
      <div class="mt-3 flex items-center gap-4 md:mt-0 md:justify-self-end">
        <div class="relative">
          <HeaderSearchBar />
        </div>
        <ThemeModeButton class="hidden md:flex" />
      </div>
    </div>
  </header>
</template>
