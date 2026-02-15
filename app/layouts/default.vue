<script setup lang="ts">
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
</script>

<template>
  <div class="bg-background h-screen flex flex-col text-black overflow-hidden">
    <div class="max-w-7xl mx-auto w-full h-full flex flex-col p-6 gap-4">
      <!-- Header with branding and user stats -->
      <header class="shrink-0 space-y-4">
        <div class="flex items-center justify-between p-4 rounded-xl bg-white shadow-sm border border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-[#FF0000] to-[#CC0000] rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              L
            </div>
            <div class="flex flex-col">
              <h1 class="text-xl font-bold text-gray-900">LOKANA</h1>
              <p class="text-xs text-gray-500">Jelajahi Jogja, Kumpulkan Cerita</p>
            </div>
          </div>

          <!-- Quick actions -->
          <div class="flex items-center gap-2">
            <NuxtLink 
              to="/scan"
              class="px-4 py-2 text-xs font-medium text-gray-600 hover:text-[#2C5F4F] hover:bg-emerald-50 rounded-lg transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
                <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
                <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
                <rect x="7" y="7" width="10" height="10" rx="1"/>
              </svg>
              Scan
            </NuxtLink>
            <NuxtLink 
              to="/shop"
              class="px-4 py-2 text-xs font-medium text-gray-600 hover:text-[#2C5F4F] hover:bg-emerald-50 rounded-lg transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Toko
            </NuxtLink>
            <button 
              class="px-4 py-2 text-xs font-medium text-gray-600 hover:text-[#2C5F4F] hover:bg-emerald-50 rounded-lg transition-all flex items-center gap-2"
              @click="userStore.resetProgress()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 2v6h-6"/>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
                <path d="M3 22v-6h6"/>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
              </svg>
              Reset
            </button>
          </div>
        </div>

        <UserStats />
      </header>

      <!-- Main content area -->
      <main class="flex-1 min-h-0 overflow-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>
