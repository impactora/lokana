<script setup lang="ts">
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
</script>

<template>
  <!-- User gamification stats header -->
  <div class="flex items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
    <!-- User Info & Rank -->
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 bg-gradient-to-br from-[#2C5F4F] to-[#3A7763] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
        {{ userStore.level }}
      </div>
      
      <div class="flex flex-col">
        <span class="font-bold text-gray-900 text-sm leading-tight">
          {{ userStore.username }}
        </span>
        <span class="text-xs text-[#2C5F4F] font-medium">
          {{ userStore.rankTitle }}
        </span>
      </div>
    </div>

    <!-- Stats -->
    <div class="flex items-center gap-4">
      <!-- XP Progress -->
      <div class="flex flex-col gap-1 min-w-32">
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-600 font-medium">XP</span>
          <span class="text-gray-900 font-bold">
            {{ userStore.currentXP }}/{{ userStore.maxXP }}
          </span>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-[#2C5F4F] to-[#3A7763] transition-all duration-500"
            :style="{ width: `${userStore.xpProgress}%` }"
          />
        </div>
      </div>

      <!-- Coins -->
      <div class="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-600">
          <circle cx="12" cy="12" r="8"/>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
          <path d="M12 18V6"/>
        </svg>
        <span class="font-bold text-amber-700">
          {{ userStore.coins }}
        </span>
      </div>

      <!-- Unlocked Locations Badge -->
      <div class="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span class="font-bold text-emerald-700">
          {{ userStore.totalUnlockedLocations }}
        </span>
      </div>
    </div>
  </div>
</template>
