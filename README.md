# 💣 CalorieBomb (Vue 3)

> A Vue 3 port of the CalorieBomb food nutrition search app. Users search foods and view calories and macronutrients.

**Live Demo:** [https://vue.caloriebomb.com](https://vue.caloriebomb.com)
**React version:** [https://www.caloriebomb.com](https://www.caloriebomb.com)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#️-tech-stack)
- [Key Features](#-key-features)
- [Architecture](#️-architecture)
- [Technical Highlights](#-technical-highlights)
- [Setup & Installation](#-setup--installation)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [Contact](#-contact)

---

## 🎯 Overview

CalorieBomb Vue is a side-by-side port of the CalorieBomb React app. The goal is to show the same design carried over to Vue 3 with Vue idioms, not React patterns in Vue syntax.

The port reuses the existing Laravel API and the Express proxy. Only the frontend changes.

**Scope:** search, results, food detail page, and theme. No features beyond the React version.

**Status:** Work in progress. Layout, header, navigation, theme toggle, and routes are done. The homepage and the `/foods` list fetch foods from the API through the `food` Pinia store. URL query handling, search, filter, pagination, and the detail page are next.

---

## 🛠️ Tech Stack

### Frontend

- **Vue 3** - Composition API with `<script setup lang="ts">`
- **TypeScript** - Type-safe development, checked with `vue-tsc`
- **Vite** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS with class-based dark mode
- **Pinia** - State management (replaces Zustand and Redux Toolkit from the React version)
- **Vue Router** - Client-side routing with layout routes
- **Fetch API** - HTTP requests from the Pinia store

### Backend

- **Node.js + Express** - Proxy server for secure API communication
- **Axios** - HTTP client in the proxy server
- **Vercel Serverless Functions** - Production deployment target

### API Backend (Separate Repository)

- **Laravel 12** - RESTful API with admin dashboard
- **Laravel Inertia** - Server-side rendering for dashboard
- **Shadcn UI** - Component library for admin interface
- **PHP 8.3** - Server-side language
- **MySQL** - Database for food nutrition data
- **Bearer Token Authentication** - Secure API access

### Development Tools

- **ESLint** - Vue and TypeScript lint rules
- **oxlint** - Fast linter, runs before ESLint
- **Prettier** - Formatting, with import sorting and Tailwind class sorting
- **PostCSS + Autoprefixer** - CSS processing for Tailwind
- **Vue DevTools plugin** - In-browser debugging through `vite-plugin-vue-devtools`

---

## ✨ Key Features

### 🎨 User Experience (done)

- **Dark/Light Theme Toggle** - Persistent theme preference in a Pinia store and localStorage
- Sticky header on scroll
- Responsive navigation with a burger menu on mobile
- Responsive design for mobile, tablet, and desktop

### 🍔 Food Listing (done)

- Featured foods on the homepage
- Food grid on `/foods`
- `FoodCard` with calories, protein, carbs, and fat
- Food list held in a Pinia store with a 1-hour cache per food

### 🔍 Smart Search System (planned)

- Search logic in a `useSearch` composable (the Vue version of a custom hook)
- URL query string as the single source of truth
- Shareable search results through the URL
- Browser back/forward navigation works

### 🏗️ Architecture

- **Secure API Proxy Pattern** - Node.js backend protects API credentials
- **Token Caching & Auto-Refresh** - Cached tokens with expiration check
- **Layout Routes** - Parent route renders a layout, child routes render inside it
- **Lazy-loaded Views** - Each page loads only when the user opens it

---

## 🏛️ Architecture

### Request Flow

```
User Browser (Vue App)
    ↓
Node.js Proxy Server (localhost:3001 / Vercel Serverless)
    ↓
External API (helventest.pixelstail.com)
```

### Why Proxy Architecture?

1. **Security** - API credentials never reach the browser
2. **Authentication** - Automatic token management and caching
3. **CORS** - Removes cross-origin issues
4. **Flexibility** - Switch APIs without frontend changes

### Key Architecture Files

```
api/index.js                    # Express proxy server
src/router/index.ts             # Routes with layout groups
src/layouts/MainLayout.vue      # Header, page content, footer
src/stores/global.ts            # Pinia global store (theme, font size)
src/stores/food.ts              # Pinia food store (list, cache, fetch)
```

### React to Vue Mapping

| Concern        | React version           | Vue version                    |
| -------------- | ----------------------- | ------------------------------ |
| Components     | JSX, `.tsx`             | Single File Components, `.vue` |
| Reusable logic | Custom hooks            | Composables                    |
| Global state   | Zustand + Redux Toolkit | Pinia                          |
| Async fetch    | Redux thunk             | Async Pinia action             |
| Derived state  | Redux selector          | `computed` getter              |
| Side effects   | `useEffect`             | `onMounted`, `watch`           |
| Routing        | React Router DOM        | Vue Router                     |
| Links          | `<Link to>`             | `<RouterLink to>`              |

---

## 🎓 Technical Highlights

### 1. Theme Persistence with Pinia

One setup-style Pinia store holds app-level state. It replaces the Zustand store from the React version:

```typescript
// src/stores/global.ts
export const useGlobalStore = defineStore('global', () => {
  const initialTheme = 'light';
  const themeMode = ref<'light' | 'dark'>(initialTheme);

  const initApp = () => {
    const storedTheme = localStorage.getItem('themeMode') || initialTheme;
    themeMode.value = storedTheme === 'dark' ? 'dark' : 'light';
    localStorage.setItem('themeMode', themeMode.value);
  };

  const setThemeMode = () => {
    themeMode.value = themeMode.value === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeMode', themeMode.value);
  };

  return { themeMode, initApp, setThemeMode };
});
```

The layout reacts to the store and toggles the `dark` class on `<html>` for Tailwind:

```typescript
// src/layouts/MainLayout.vue
const globalStore = useGlobalStore();
const { themeMode } = storeToRefs(globalStore);

onMounted(() => {
  globalStore.initApp();
  document.documentElement.classList.toggle('dark', themeMode.value === 'dark');
});

watch(themeMode, (newTheme) => {
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
});
```

**Benefits:**

- `storeToRefs` keeps the destructured state reactive
- `watch` runs only when `themeMode` changes (React needs a dependency array for this)
- Theme survives page reloads

### 2. Layout Routes with Lazy Loading

A parent route renders the layout. Its children render inside the layout's `<RouterView />`:

```typescript
// src/router/index.ts
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
        { path: '/foods', name: 'foods', component: () => import('@/views/foods/Index.vue') },
      ],
    },
  ],
});
```

**Benefits:**

- Header and footer live in one place
- New layouts (for example a blank layout for login) are a new route group
- Each view is a separate chunk, loaded on demand

### 3. Token Caching & Automatic Refresh

The proxy is shared with the React version. It caches the token and gets a new one only when it expires:

```javascript
// api/index.js
let cachedToken = null;
let tokenExpiration = null;

const getToken = async () => {
    // Return cached token if still valid
    if (cachedToken && tokenExpiration && new Date() < new Date(tokenExpiration)) {
        return cachedToken;
    }

    // Fetch new token and cache it
    const response = await axios.post(`${EXTERNAL_API}/api/v1/login`, {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
    });

    cachedToken = response.data.token;
    tokenExpiration = response.data.expires_at;
    return cachedToken;
};
```

**Benefits:**

- Fewer API calls, because a valid token is reused
- Automatic token refresh when expired
- Frontend does not handle authentication
- Credentials never reach the browser

### 4. Clean Code Organization

```
public/               # Images and favicon, served as-is by URL
src/
├── assets/           # CSS (Tailwind layers, color variables)
├── components/       # Reusable UI components
├── constants/        # API routes
├── layouts/          # Layout components and their parts
├── router/           # Vue Router config
├── stores/           # Pinia stores
├── types/            # TypeScript types
├── utils/            # Formatters
└── views/            # Page components
```

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js `^22.18.0` or `>=24.12.0`, and npm
- Git

### Environment Variables

Create a `.env` file in the root directory:

```env
# Frontend (bundled into browser code, never put secrets here)
VITE_SERVER_URL=http://localhost:3001
VITE_APP_DEBUG=true
VITE_API_SECRET=anything_you_like_it_is_a_decoy

# Backend (read only by api/index.js)
API_URL=https://helventest.pixelstail.com
API_CLIENT_ID=your_client_id
API_CLIENT_SECRET=your_client_secret
API_SECRET=your_secret_key
```

### Installation

```bash
# Clone the repository
git clone https://github.com/helven/caloriebomb-vue.git
cd caloriebomb-vue

# Install dependencies
npm install

# Start the proxy server and the Vite dev server together
npm run dev:all
```

Visit `http://localhost:5174` in your browser.

### Scripts

| Command            | What it does                                                |
| ------------------ | ----------------------------------------------------------- |
| `npm run dev:all`  | Proxy server (port 3001) and Vite dev server together       |
| `npm run dev`      | Vite dev server only                                        |
| `npm run build`    | Type check and production build in parallel                 |
| `npm run lint`     | oxlint then ESLint, both with auto-fix                      |
| `npm run format`   | Prettier on `src/`                                          |
| `npm run ci:check` | Lint, format check, type check, and build, with no auto-fix |

---

## 📁 Project Structure

```
caloriebomb-vue/
├── api/
│   └── index.js                    # Express proxy server
├── public/
│   ├── bomb.svg                    # Favicon
│   └── assets/images/              # Food thumbnail, page banners
├── src/
│   ├── assets/
│   │   ├── base.css                # Tailwind layers, CSS color variables
│   │   ├── main.css                # Global styles entry
│   │   └── food/                   # Food page styles
│   ├── components/
│   │   ├── FoodCard.vue            # Food card with macros
│   │   ├── Logo.vue                # Logo
│   │   ├── MainNavigation.vue      # Desktop navigation
│   │   ├── MobileNavigation.vue    # Burger menu navigation
│   │   ├── SearchBar.vue           # Page search bar (stub)
│   │   ├── SearchButton.vue        # Search button
│   │   ├── ThemeModeButton.vue     # Theme toggle
│   │   └── listing/
│   │       └── Pagination.vue      # Pagination (stub)
│   ├── constants/
│   │   └── apiRoutes.ts            # API endpoint URLs
│   ├── layouts/
│   │   ├── MainLayout.vue          # Header, page content, footer
│   │   └── components/
│   │       ├── Header.vue          # Sticky header
│   │       └── HeaderSearchBar.vue # Header search bar
│   ├── router/
│   │   └── index.ts                # Routes
│   ├── stores/
│   │   ├── food.ts                 # Pinia food store
│   │   └── global.ts               # Pinia global store
│   ├── types/
│   │   └── index.ts                # Food and store types
│   ├── utils/
│   │   └── formatters.ts           # formatNutrient
│   ├── views/
│   │   ├── HomeView.vue            # Homepage
│   │   ├── foods/                  # Food listing page
│   │   └── static/                 # About, Pricing, Contact, Privacy
│   ├── App.vue                     # Root component
│   └── main.ts                     # App entry
├── CODING_STANDARDS.md             # Coding standards
├── .env                            # Environment variables
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── vite.config.ts                  # Vite configuration
└── package.json
```

---

## 🌐 Deployment

Deployed on Vercel at [https://vue.caloriebomb.com](https://vue.caloriebomb.com), with the same setup as the React version.

1. **Connect Repository**

    ```bash
    vercel
    ```

2. **Set Environment Variables** in Vercel Dashboard:
    - `API_URL`
    - `API_CLIENT_ID`
    - `API_CLIENT_SECRET`
    - `API_SECRET`

3. **Deploy**
    ```bash
    vercel --prod
    ```

Vercel builds the Vue app as static files and runs `api/index.js` as a serverless function.

---

## 🔮 Future Improvements

### 1. Finish the Port (Priority)

- `/foods` reads the URL query (search, category, sort, page)
- Search with a `useSearch` composable and URL sync
- Food list filter and pagination
- Food detail page, using the cache in the `food` store
- Navigation service, so only one service changes between React and Vue

### 2. Documentation

- `COMPARISON.md` - state, routing, data fetching, and caching in React vs Vue
- ADRs - for example "Pinia vs Vuex" and "one store vs two"

### 3. Testing & Quality

- Unit tests with Vitest
- E2E tests with Playwright

---

## 👤 Contact

**Senjitsu**

- LinkedIn: [https://www.linkedin.com/in/senjitsu/](https://www.linkedin.com/in/senjitsu/)
- Portfolio: [https://www.caloriebomb.com](https://www.caloriebomb.com)

---

## 📄 License

This project is a portfolio piece and is available for viewing and reference.

---

## 🙏 Acknowledgments

- Built with Vue 3 and TypeScript
- Styled with Tailwind CSS
- Ported from [CalorieBomb React](https://www.caloriebomb.com)
- API integration with custom proxy architecture

---

**⭐ If you found this project interesting, please consider giving it a star!**
