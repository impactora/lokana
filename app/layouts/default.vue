<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import { MapPin, QrCode, ShoppingBag, Map, User, RefreshCw } from 'lucide-vue-next';

const userStore = useUserStore();
const route = useRoute();
</script>

<template>
  <div class="bg-[#F5F1EA] min-h-screen flex flex-col text-[#2D2416]">
    <div class="max-w-7xl mx-auto w-full flex-1 flex flex-col p-4 md:p-6 gap-4">
      <!-- Header -->
      <header class="shrink-0 space-y-4">
        <!-- Brand & Navigation -->
        <div class="bg-white rounded-xl shadow-sm border border-[#6B4423]/10 p-4">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <NuxtLink to="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div class="w-10 h-10 bg-gradient-to-br from-[#6B4423] to-[#8B6F47] rounded-lg flex items-center justify-center shadow-md">
                <MapPin class="w-5 h-5 text-white" :stroke-width="2.5" />
              </div>
              <div class="flex flex-col">
                <h1 class="text-xl font-bold text-[#6B4423] font-['Libre_Baskerville']">LOKANA</h1>
                <p class="text-xs text-[#6B5D4F]">Jogja Heritage Explorer</p>
              </div>
            </NuxtLink>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center gap-2">
              <NuxtLink 
                to="/"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                :class="route.path === '/' 
                  ? 'bg-[#6B4423] text-white' 
                  : 'text-[#6B5D4F] hover:bg-[#6B4423]/5'"
              >
                <Map class="w-4 h-4" />
                <span>Jelajah</span>
              </NuxtLink>
              
              <NuxtLink 
                to="/itinerary"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                :class="route.path.startsWith('/itinerary')
                  ? 'bg-[#6B4423] text-white' 
                  : 'text-[#6B5D4F] hover:bg-[#6B4423]/5'"
              >
                <MapPin class="w-4 h-4" />
                <span>Rute</span>
              </NuxtLink>

              <NuxtLink 
                to="/scan"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                :class="route.path === '/scan'
                  ? 'bg-[#6B4423] text-white' 
                  : 'text-[#6B5D4F] hover:bg-[#6B4423]/5'"
              >
                <QrCode class="w-4 h-4" />
                <span>Scan</span>
              </NuxtLink>

              <NuxtLink 
                to="/shop"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                :class="route.path === '/shop'
                  ? 'bg-[#6B4423] text-white' 
                  : 'text-[#6B5D4F] hover:bg-[#6B4423]/5'"
              >
                <ShoppingBag class="w-4 h-4" />
                <span>Voucher</span>
              </NuxtLink>

              <NuxtLink 
                to="/profile"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                :class="route.path === '/profile'
                  ? 'bg-[#6B4423] text-white' 
                  : 'text-[#6B5D4F] hover:bg-[#6B4423]/5'"
              >
                <User class="w-4 h-4" />
                <span>Profil</span>
              </NuxtLink>

              <button 
                @click="userStore.resetProgress()"
                class="px-3 py-2 rounded-lg text-sm font-medium text-[#6B5D4F] hover:bg-[#6B4423]/5 transition-all"
                title="Reset Progress"
              >
                <RefreshCw class="w-4 h-4" />
              </button>
            </nav>

            <!-- Mobile Menu Button -->
            <button class="md:hidden p-2 rounded-lg hover:bg-[#6B4423]/5">
              <svg class="w-6 h-6 text-[#6B4423]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- User Stats -->
        <UserStats />
      </header>

      <!-- Main Content -->
      <main class="flex-1 min-h-0">
        <slot />
      </main>

      <!-- Mobile Bottom Navigation -->
      <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#6B4423]/10 shadow-lg z-50">
        <div class="flex items-center justify-around p-2">
          <NuxtLink 
            to="/"
            class="flex flex-col items-center gap-1 p-2 rounded-lg transition-all"
            :class="route.path === '/' ? 'text-[#6B4423]' : 'text-[#6B5D4F]'"
          >
            <Map class="w-5 h-5" />
            <span class="text-xs font-medium">Jelajah</span>
          </NuxtLink>

          <NuxtLink 
            to="/itinerary"
            class="flex flex-col items-center gap-1 p-2 rounded-lg transition-all"
            :class="route.path.startsWith('/itinerary') ? 'text-[#6B4423]' : 'text-[#6B5D4F]'"
          >
            <MapPin class="w-5 h-5" />
            <span class="text-xs font-medium">Rute</span>
          </NuxtLink>

          <NuxtLink 
            to="/scan"
            class="flex flex-col items-center gap-1 p-2 rounded-lg transition-all"
            :class="route.path === '/scan' ? 'text-[#6B4423]' : 'text-[#6B5D4F]'"
          >
            <QrCode class="w-5 h-5" />
            <span class="text-xs font-medium">Scan</span>
          </NuxtLink>

          <NuxtLink 
            to="/shop"
            class="flex flex-col items-center gap-1 p-2 rounded-lg transition-all"
            :class="route.path === '/shop' ? 'text-[#6B4423]' : 'text-[#6B5D4F]'"
          >
            <ShoppingBag class="w-5 h-5" />
            <span class="text-xs font-medium">Voucher</span>
          </NuxtLink>

          <NuxtLink 
            to="/profile"
            class="flex flex-col items-center gap-1 p-2 rounded-lg transition-all"
            :class="route.path === '/profile' ? 'text-[#6B4423]' : 'text-[#6B5D4F]'"
          >
            <User class="w-5 h-5" />
            <span class="text-xs font-medium">Profil</span>
          </NuxtLink>
        </div>
      </nav>
    </div>
  </div>
</template>
