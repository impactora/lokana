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
