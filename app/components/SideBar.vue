<script setup lang="ts">
import { ref, computed } from 'vue';
import artifactsData from '~/assets/data/artifactsData';
import { useUserStore } from '~/stores/user';

const emit = defineEmits(['artifact-click', 'show-on-map']);

const userStore = useUserStore();

// Filter configuration with proper type mapping
const filters = [
  { label: 'Semua', value: 'all' },
  { label: 'Arca', value: 'arca' },
  { label: 'Prasasti', value: 'prasasti' },
  { label: 'Senjata', value: 'senjata' },
  { label: 'Tekstil', value: 'tekstil' },
  { label: 'Keramik', value: 'keramik' },
  { label: 'Fosil', value: 'fosil' },
  { label: 'Perhiasan', value: 'perhiasan' },
  { label: 'Manuskrip', value: 'manuskrip' },
  { label: 'Alat Musik', value: 'alat musik' },
];

const searchQuery = ref('');
const activeFilter = ref('all');

// Props to receive user location from parent
const props = defineProps<{
  userLocation?: { lat: number; lng: number } | null;
}>();

// Calculate distance between two coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Filtered artifacts based on search and filter
const filteredArtifacts = computed(() => {
  return artifactsData
    .filter((artifact) => {
      const matchesFilter = activeFilter.value === 'all' || artifact.type === activeFilter.value;
      const matchesSearch =
        searchQuery.value === '' ||
        artifact.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        artifact.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        artifact.period.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        artifact.origin.toLowerCase().includes(searchQuery.value.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .map((artifact) => {
      const distance = props.userLocation
        ? calculateDistance(
            props.userLocation.lat,
            props.userLocation.lng,
            artifact.museum.lat,
            artifact.museum.lng
          )
        : null;
      return { ...artifact, distance };
    })
    .sort((a, b) => {
      if (!a.distance) return 1;
      if (!b.distance) return -1;
      return a.distance - b.distance;
    });
});

// Stats text
const locationText = computed(() => {
  return props.userLocation ? 'Terdekat dulu' : 'Semua lokasi';
});

// Handle artifact card click
const handleArtifactClick = (artifactId: number) => {
  userStore.visitArtifact(artifactId);
  emit('artifact-click', artifactId);
};

// Handle show on map button
const handleShowOnMap = (artifactId: number, event: Event) => {
  event.stopPropagation();
  emit('show-on-map', artifactId);
};
</script>

<template>
  <div class="flex flex-col gap-4 h-full">
    <!-- Title Section -->
    <div class="flex flex-col gap-4 shrink-0">
      <div class="flex flex-col gap-2">
        <h1 class="text-lg font-bold leading-tight">
          <span class="text-black">Jelajahi</span>
          <span class="text-[#FF0000]"> Peninggalan Budaya</span>
        </h1>
        <p class="text-sm text-gray-600">
          Temukan artefak, arca, prasasti, dan koleksi bersejarah Indonesia
        </p>
      </div>

      <!-- Search and Filter -->
      <div class="flex flex-col gap-3">
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari peninggalan..."
            class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F4F] focus:border-transparent"
          />
        </div>

        <!-- Filter Chips -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="activeFilter = filter.value"
            class="px-3 py-1.5 text-xs font-medium rounded-full border transition-all"
            :class="
              activeFilter === filter.value
                ? 'bg-[#2C5F4F] text-white border-[#2C5F4F]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#2C5F4F]'
            "
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <div class="h-px bg-gray-200" />
    </div>

    <!-- Stats Info -->
    <div class="bg-[#E0DDD5] p-4 flex justify-between items-center text-xs rounded-xl shrink-0">
      <span class="font-bold text-gray-900">
        <span class="text-lg text-[#2C5F4F]">{{ filteredArtifacts.length }}</span>
        peninggalan ditemukan
      </span>
      <span class="text-gray-600 font-medium">{{ locationText }}</span>
    </div>

    <!-- Artifact List -->
    <div class="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto pr-2">
      <div
        v-for="artifact in filteredArtifacts"
        :key="artifact.id"
        class="group relative flex flex-col gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer"
        @click="handleArtifactClick(artifact.id)"
      >
        <!-- Main Content -->
        <div class="flex gap-3">
          <!-- Artifact Image -->
          <div class="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
            <img
              :src="artifact.image"
              :alt="artifact.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <!-- Visited Badge -->
            <div
              v-if="userStore.visitedArtifacts.includes(artifact.id)"
              class="absolute top-1 right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>

          <!-- Artifact Info -->
          <div class="flex flex-col flex-1 min-w-0 justify-center">
            <h3 class="font-bold text-sm text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
              {{ artifact.name }}
            </h3>

            <div class="flex flex-wrap gap-1.5 mt-1.5">
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200 uppercase">
                {{ artifact.type }}
              </span>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
                {{ artifact.period }}
              </span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <p class="text-xs text-gray-600 leading-relaxed line-clamp-3 border-t border-dashed border-gray-100 pt-2">
          {{ artifact.description }}
        </p>

        <!-- Museum Info & Action -->
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 min-w-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-gray-400">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <div class="flex flex-col min-w-0">
              <span class="text-[10px] font-bold text-gray-900 truncate">
                {{ artifact.museum.name }}
              </span>
              <span class="text-[10px] text-emerald-600 font-medium truncate flex items-center gap-1">
                <span v-if="artifact.distance" class="w-1 h-1 rounded-full bg-emerald-500"></span>
                {{ artifact.distance ? `${artifact.distance.toFixed(1)} km` : artifact.museum.province }}
              </span>
            </div>
          </div>

          <button
            class="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all active:scale-95 flex items-center gap-1"
            @click="handleShowOnMap(artifact.id, $event)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
            PETA
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredArtifacts.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-300 mb-3">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
        <p class="text-sm text-gray-500 font-medium">Tidak ada peninggalan ditemukan</p>
        <p class="text-xs text-gray-400 mt-1">Coba ubah filter atau kata kunci pencarian</p>
      </div>
    </div>
  </div>
</template>
