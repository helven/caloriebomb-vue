import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Main layout
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/static/About.vue'),
        },
        {
          path: '/pricing',
          name: 'pricing',
          component: () => import('@/views/static/Pricing.vue'),
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('@/views/static/Contact.vue'),
        },
        {
          path: '/privacy-policy',
          name: 'privacy-policy',
          component: () => import('@/views/static/PrivacyView.vue'),
        },

        {
          path: '/foods',
          name: 'foods',
          component: () => import('@/views/foods/Index.vue'),
        },
      ],
    },

    // Blank layout
    //{
    //  path: '/',
    //  component: () => import('@/layouts/BlankLayout.vue'),
    //  children: [
    //    {
    //      path: '/login',
    //      name: 'login',
    //      component: () => import('@/views/Auth/Login.vue'),
    //    },
    //    {
    //      path: '/blank',
    //      name: 'blank',
    //      component: () => import('@/views/BlankPage.vue'),
    //    },
    //  ],
    //},
  ],
});

export default router;
