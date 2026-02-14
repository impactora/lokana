<script setup lang="ts">
import { ref, computed } from 'vue';
import artifactsData from '~/assets/data/artifactsData';
import { useUserStore } from '~/stores/user';

const emit = defineEmits(['artifact-click', 'show-on-map']);
const userStore = useUserStore();

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

const props = defineProps<{
  userLocation?: { lat: number; lng: number } | null;
}>();

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

const filteredArtifacts = computed(() => {
  return artifactsData
    .filter((artifact) => {
      const matchesFilter =
        activeFilter.value === 'all' || artifact.type === activeFilter.value;

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

const locationText = computed(() => {
  return props.userLocation ? 'Terdekat dulu' : 'Semua lokasi';
});

const handleArtifactClick = (artifactId: number) => {
  const artifact = artifactsData.find((a) => a.id === artifactId);
  if (!artifact) return;

  if (userStore.currentXP < artifact.requiredXP) {
    alert(
      `Artefak terkunci! Kamu butuh ${artifact.requiredXP} XP untuk membuka challenge ini.`
    );
    return;
  }

  navigateTo(`/artifact/${artifactId}`);
};

const handleShowOnMap = (artifactId: number, event: Event) => {
  event.stopPropagation();
  emit('show-on-map', artifactId);
};
</script>

<template>
  <div class="flex flex-col gap-4 h-full">
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

      <div class="flex flex-col gap-3">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari peninggalan..."
            class="w-full pl-4 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F4F] focus:border-transparent"
          />
        </div>

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

    <div
      class="bg-[#E0DDD5] p-4 flex justify-between items-center text-xs rounded-xl shrink-0"
    >
      <span class="font-bold text-gray-900">
        <span class="text-lg text-[#2C5F4F]">
          {{ filteredArtifacts.length }}
        </span>
        peninggalan ditemukan
      </span>
      <span class="text-gray-600 font-medium">
        {{ locationText }}
      </span>
    </div>

    <div class="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto pr-2">
      <NuxtLink
        v-for="artifact in filteredArtifacts"
        :key="artifact.id"
        :to="`/artifact/${artifact.id}`"
        class="group relative flex flex-col gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
        :class="{
          'hover:border-emerald-300': userStore.currentXP >= artifact.requiredXP,
          'opacity-60 cursor-not-allowed': userStore.currentXP < artifact.requiredXP
        }"
        @click.prevent="handleArtifactClick(artifact.id)"
      >
        <div
          v-if="userStore.currentXP < artifact.requiredXP"
          class="absolute inset-0 bg-gray-900 bg-opacity-30 rounded-xl flex items-center justify-center z-10"
        >
          <div
            class="bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <span class="text-sm font-bold text-gray-900">
              {{ artifact.requiredXP }} XP Required
            </span>
          </div>
        </div>

        <div class="flex gap-3">
          <div
            class="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-100"
          >
            <img
              :src="artifact.image"
              :alt="artifact.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div class="flex flex-col flex-1 min-w-0 justify-center">
            <h3
              class="font-bold text-sm text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2"
            >
              {{ artifact.name }}
            </h3>

            <div class="flex flex-wrap gap-1.5 mt-1.5">
              <span
                class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200 uppercase"
              >
                {{ artifact.type }}
              </span>
              <span
                class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100"
              >
                {{ artifact.period }}
              </span>
            </div>
          </div>
        </div>

        <p
          class="text-xs text-gray-600 leading-relaxed line-clamp-3 border-t border-dashed border-gray-100 pt-2"
        >
          {{ artifact.description }}
        </p>

        <div class="flex items-center justify-between gap-2">
          <div class="flex flex-col min-w-0">
            <span class="text-[10px] font-bold text-gray-900 truncate">
              {{ artifact.museum.name }}
            </span>
            <span
              class="text-[10px] text-emerald-600 font-medium truncate"
            >
              {{
                artifact.distance
                  ? `${artifact.distance.toFixed(1)} km`
                  : artifact.museum.province
              }}
            </span>
          </div>

          <button
            class="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all active:scale-95"
            @click="handleShowOnMap(artifact.id, $event)"
          >
            PETA
          </button>
        </div>
      </NuxtLink>

      <div
        v-if="filteredArtifacts.length === 0"
        class="flex flex-col items-center justify-center py-12 text-center"
      >
        <p class="text-sm text-gray-500 font-medium">
          Tidak ada peninggalan ditemukan
        </p>
        <p class="text-xs text-gray-400 mt-1">
          Coba ubah filter atau kata kunci pencarian
        </p>
      </div>
    </div>
  </div>
</template>

