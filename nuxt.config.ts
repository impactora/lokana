// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  css: ['./app/assets/css/main.css', 'leaflet/dist/leaflet.css'],
  
  vite: {
    plugins: [tailwindcss()],
  },
  
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt', // Add Pinia for state management
  ],
  
  routeRules: {
    '/': { ssr: false }, // Disable SSR for map functionality
  },

  // Pinia configuration
  pinia: {
    storesDirs: ['./stores/**'],
  },
});
