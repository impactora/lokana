<script setup lang="ts">
import { MapPin, Clock, Phone, Ticket } from 'lucide-vue-next';
import type { Museum } from '~/assets/data/artifactsData';

const props = defineProps<{
  museum: Museum;
  distance?: number | null;
  artifactCount?: number;
}>();

const categoryColors: Record<string, string> = {
  seni_dan_budaya: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  sejarah: 'bg-[#D4A574]/20 text-[#8B6F47] border-[#D4A574]/40',
  sains: 'bg-blue-50 text-blue-700 border-blue-200',
  perang: 'bg-red-50 text-red-700 border-red-200'
};

const categoryLabels: Record<string, string> = {
  seni_dan_budaya: 'Seni & Budaya',
  sejarah: 'Sejarah',
  sains: 'Sains',
  perang: 'Perang'
};
</script>

<template>
  <div class="group bg-white border border-[#6B4423]/10 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-[#D4A574] overflow-hidden">
    <!-- Image Header -->
    <div class="relative h-48 overflow-hidden bg-[#6B4423]/5">
      <img
        :src="museum.image"
        :alt="museum.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      <!-- Category Badge -->
      <div class="absolute top-3 left-3">
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm"
          :class="categoryColors[museum.category] || 'bg-white/90 text-gray-700 border-gray-200'"
        >
          {{ categoryLabels[museum.category] || museum.category }}
        </span>
      </div>

      <!-- Rating (if available) -->
      <div v-if="museum.rating" class="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
        <svg class="w-4 h-4 text-[#D4A574]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span class="text-sm font-bold text-[#2D2416]">{{ museum.rating }}</span>
      </div>

      <!-- Museum Name Overlay -->
      <div class="absolute bottom-0 left-0 right-0 p-4">
        <h3 class="font-bold text-white text-base leading-tight line-clamp-2 font-['Libre_Baskerville']">
          {{ museum.name }}
        </h3>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-3">
      <!-- Description -->
      <p class="text-sm text-[#6B5D4F] leading-relaxed line-clamp-2">
        {{ museum.description }}
      </p>

      <!-- Quick Info -->
      <div class="grid grid-cols-2 gap-2 text-xs">
        <div class="flex items-center gap-2 text-[#6B5D4F]">
          <Clock class="w-4 h-4 shrink-0" />
          <span class="truncate">{{ museum.openingHours || 'Lihat detail' }}</span>
        </div>
        <div class="flex items-center gap-2 text-[#6B5D4F]">
          <Ticket class="w-4 h-4 shrink-0" />
          <span class="truncate">{{ museum.ticketPrice || 'Gratis' }}</span>
        </div>
      </div>

      <!-- Stats Footer -->
      <div class="flex items-center justify-between pt-3 border-t border-[#6B4423]/10">
        <div class="flex flex-col">
          <span class="text-xs text-[#6B5D4F]">Koleksi</span>
          <span class="text-sm font-bold text-[#2D2416]">{{ artifactCount || 0 }} artefak</span>
        </div>
        
        <div v-if="distance" class="flex items-center gap-1 text-[#6B4423]">
          <MapPin class="w-4 h-4" />
          <span class="text-sm font-semibold">{{ distance.toFixed(1) }} km</span>
        </div>
      </div>
    </div>
  </div>
</template>
