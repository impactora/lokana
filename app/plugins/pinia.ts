import { defineNuxtPlugin } from '#app';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Initialize Pinia with persistence plugin for gamification state
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(piniaPluginPersistedstate);
});
