<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import { TrendingUp, Coins, MapPin } from 'lucide-vue-next';

const userStore = useUserStore();
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-[#6B4423]/10 p-4">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <!-- User Info & Level -->
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="w-12 h-12 bg-gradient-to-br from-[#6B4423] to-[#8B6F47] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
            {{ userStore.level }}
          </div>
          <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-[#D4A574] rounded-full border-2 border-white flex items-center justify-center">
            <TrendingUp class="w-3 h-3 text-white" :stroke-width="2.5" />
          </div>
        </div>
        
        <div class="flex flex-col">
          <span class="font-bold text-[#2D2416] text-base leading-tight">
            {{ userStore.username }}
          </span>
          <span class="text-sm text-[#6B5D4F] font-medium">
            {{ userStore.rankTitle }}
          </span>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="flex items-center gap-3 sm:gap-4">
        <!-- XP Progress -->
        <div class="flex flex-col gap-1.5 min-w-[140px]">
          <div class="flex items-center justify-between text-xs">
            <span class="text-[#6B5D4F] font-medium">Pengalaman</span>
            <span class="text-[#2D2416] font-bold">
              {{ userStore.currentXP }}/{{ userStore.maxXP }}
            </span>
          </div>
          <div class="w-full h-2 bg-[#6B4423]/10 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-[#6B4423] to-[#8B6F47] transition-all duration-500 ease-out"
              :style="{ width: `${userStore.xpProgress}%` }"
            />
          </div>
        </div>

        <!-- Coins -->
        <div class="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-[#D4A574]/20 to-[#B8935F]/20 rounded-lg border border-[#D4A574]/30">
          <Coins class="w-5 h-5 text-[#B8935F]" :stroke-width="2" />
          <span class="font-bold text-[#6B4423] text-sm">
            {{ userStore.coins }}
          </span>
        </div>

        <!-- Locations Discovered -->
        <div class="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-[#4A7C59]/20 to-[#6B9E7A]/20 rounded-lg border border-[#4A7C59]/30">
          <MapPin class="w-5 h-5 text-[#4A7C59]" :stroke-width="2" />
          <span class="font-bold text-[#2D2416] text-sm">
            {{ userStore.totalUnlockedLocations }}
          </span>
        </div>
      </div>
    </div>

    <!-- Progress Description (Hidden on Mobile) -->
    <div class="hidden sm:block mt-3 pt-3 border-t border-[#6B4423]/10">
      <p class="text-xs text-[#6B5D4F]">
        <span class="font-semibold text-[#2D2416]">{{ userStore.xpProgress }}%</span> menuju level berikutnya
        <span class="mx-1">•</span>
        <span class="font-semibold text-[#2D2416]">{{ userStore.visitedArtifacts.length }}</span> artefak terjelajahi
        <span class="mx-1">•</span>
        <span class="font-semibold text-[#2D2416]">{{ userStore.scannedMuseums.length }}</span> museum dikunjungi
      </p>
    </div>
  </div>
</template>
