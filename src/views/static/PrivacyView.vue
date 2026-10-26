<script setup lang="ts">
const lastUpdate: string = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
</script>

<template>
  <section class="page-breadcrumb">
    <div class="mb-6 flex justify-between"></div>
  </section>

  <div class="mx-auto mb-8 grid max-w-4xl grid-cols-1 px-4">
    <PageHeading title="Privacy Policy" description="" class="text-center" />

    <section class="container mx-auto px-4">
      <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">Last Updated: {{ lastUpdate }}</p>

      <div class="space-y-6">
        <div>
          <h2 class="mb-2 font-semibold">Information We Collect</h2>
          <p class="text-sm">
            CalorieBomb does not collect, store, or share any personal information. We do not require user accounts or
            track individual usage.
          </p>
        </div>

        <div>
          <h2 class="mb-2 font-semibold">Local Storage</h2>
          <p class="text-sm">
            We use browser local storage only to save your theme preference (light/dark mode). This data never leaves
            your device.
          </p>
        </div>

        <div>
          <h2 class="mb-2 font-semibold">Third-Party Services</h2>
          <p class="text-sm">
            CalorieBomb uses external APIs to fetch food nutrition data. No personal information is sent to these
            services.
          </p>
        </div>

        <div>
          <h2 class="mb-2 font-semibold">Cookies</h2>
          <p class="text-sm">We do not use cookies for tracking or analytics purposes.</p>
        </div>

        <div>
          <h2 class="mb-2 font-semibold">Changes to This Policy</h2>
          <p class="text-sm">
            We may update this privacy policy from time to time. Any changes will be reflected on this page.
          </p>
        </div>

        <div>
          <h2 class="mb-2 font-semibold">Contact</h2>
          <p class="text-sm">If you have questions about this privacy policy, please visit our contact page.</p>
        </div>
      </div>
    </section>
  </div>
</template>
