// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// --- Vue ---
import { ref } from 'vue';

// --- Pinia ---
import { defineStore } from 'pinia';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// STORE
// -----------------------------------------------------------------------------
/**
 * Holds the todo list and the actions that change it.
 */
export const useGlobalStore = defineStore('global', () => {
  const initialTheme = 'light';
  // --- State ---
  const themeMode = ref<'light' | 'dark'>(initialTheme);
  const fontSize = ref('medium');

  // --- Getters ---

  // --- Actions ---
  const initApp = () => {
    let storedTheme: string;

    // Get the themeMode from an local storage (if not set, use initialTheme)
    storedTheme = (localStorage.getItem('themeMode') as 'light' | 'dark') || initialTheme;

    // Update themeMode to state
    themeMode.value = storedTheme === 'dark' ? 'dark' : 'light';

    // Update themeMode to local storage
    localStorage.setItem('themeMode', themeMode.value);
  };

  const setThemeMode = () => {
    // Toggle themeMode
    themeMode.value = themeMode.value === 'light' ? 'dark' : 'light';

    // Update themeMode to local storage
    localStorage.setItem('themeMode', themeMode.value);
  };

  const setFontSize = (size: string) => {
    fontSize.value = size;
  };

  return { themeMode, fontSize, initApp, setThemeMode, setFontSize };
});
