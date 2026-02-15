<script setup lang="ts">
import { ref, computed } from 'vue';
import { museumsData, type Museum } from '~/assets/data/artifactsData';
import artifactsData from '~/assets/data/artifactsData';
import { useUserStore } from '~/stores/user';
import { MapPin, Clock, ArrowRight, Filter, Search } from 'lucide-vue-next';

const emit = defineEmits(['museum-click', 'show-on-map']);
const userStore = useUserStore();

const museumCategoryFilters = [
  { label: 'Semua', value: 'all' },
  { label: 'Seni & Budaya', value: 'seni_dan_budaya' },
  { label: 'Sejarah', value: 'sejarah' },
  { label: 'Sains', value: 'sains' },
  { label: 'Perang', value: 'perang' },
];

const searchQuery = ref('');
const activeCategory = ref('all');

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

const getArtifactCount = (museumId: number) => {
  return artifactsData.filter(a => a.museumId === museumId).length;
};

const filteredMuseums = computed(() => {
  return museumsData
    .filter((museum) => {
      const matchesCategory =
        activeCategory.value === 'all' || museum.category === activeCategory.value;

      const matchesSearch =
        searchQuery.value === '' ||
        museum.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        museum.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        museum.province.toLowerCase().includes(searchQuery.value.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .map((museum) => {
      const distance = props.userLocation
        ? calculateDistance(
            props.userLocation.lat,
            props.userLocation.lng,
            museum.lat,
            museum.lng
          )
        : null;

      return { 
        ...museum, 
        distance,
        artifactCount: getArtifactCount(museum.id)
      };
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

const categoryLabels: Record<string, string> = {
  seni_dan_budaya: 'Seni & Budaya',
  sejarah: 'Sejarah',
  sains: 'Sains',
  perang: 'Perang'
};

const categoryColors: Record<string, string> = {
  seni_dan_budaya: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  sejarah: 'bg-amber-100 text-amber-700 border-amber-200',
  sains: 'bg-blue-100 text-blue-700 border-blue-200',
  perang: 'bg-red-100 text-red-700 border-red-200'
};

const categoryIcons: Record<string, string> = {
  seni_dan_budaya: '🎨',
  sejarah: '🏛️',
  sains: '🔬',
  perang: '⚔️'
};

const handleMuseumClick = (museumId: number) => {
  navigateTo(`/museum/${museumId}`);
};

const handleShowOnMap = (museum: Museum, event: Event) => {
  event.stopPropagation();
  emit('show-on-map', museum.id);
};
</script>

<template>
  <div class="flex flex-col gap-4 h-full">
    <div class="flex flex-col gap-4 shrink-0">
      <div class="flex flex-col gap-2">
        <h1 class="text-lg font-bold leading-tight">
          <span class="text-black">Jelajahi</span>
          <span class="text-[#FF0000]"> Museum</span>
        </h1>
        <p class="text-sm text-gray-600">
          Temukan museum dan koleksi bersejarah Indonesia
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari museum..."
            class="w-full pl-4 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F4F] focus:border-transparent"
          />
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in museumCategoryFilters"
            :key="filter.value"
            @click="activeCategory = filter.value"
            class="px-3 py-1.5 text-xs font-medium rounded-full border transition-all"
            :class="
              activeCategory === filter.value
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
          {{ filteredMuseums.length }}
        </span>
        museum ditemukan
      </span>
      <span class="text-gray-600 font-medium">
        {{ locationText }}
      </span>
    </div>

    <div class="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto pr-2">
      <div
        v-for="museum in filteredMuseums"
        :key="museum.id"
        class="group relative flex flex-col gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-emerald-300"
        @click="handleMuseumClick(museum.id)"
      >
        <div class="flex gap-3">
          <div
            class="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-100"
          >
            <img
              :src="museum.image"
              :alt="museum.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div class="flex flex-col flex-1 min-w-0 justify-center">
            <h3
              class="font-bold text-sm text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2"
            >
              {{ museum.name }}
            </h3>

            <div class="flex flex-wrap gap-1.5 mt-1.5">
              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border uppercase"
                :class="categoryColors[museum.category] || 'bg-gray-100 text-gray-600 border-gray-200'"
              >
                {{ categoryIcons[museum.category] }} {{ categoryLabels[museum.category] || museum.category }}
              </span>
            </div>
          </div>
        </div>

        <p
          class="text-xs text-gray-600 leading-relaxed line-clamp-2 border-t border-dashed border-gray-100 pt-2"
        >
          {{ museum.description }}
        </p>

        <div class="flex items-center justify-between gap-2">
          <div class="flex flex-col min-w-0">
            <span class="text-[10px] font-bold text-gray-900 truncate">
              {{ museum.artifactCount }} artefak
            </span>
            <span
              class="text-[10px] text-emerald-600 font-medium truncate"
            >
              {{
                museum.distance
                  ? `${museum.distance.toFixed(1)} km`
                  : museum.province
              }}
            </span>
          </div>

          <button
            class="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all active:scale-95"
            @click="handleShowOnMap(museum, $event)"
          >
            PETA
          </button>
        </div>
      </div>

      <div
        v-if="filteredMuseums.length === 0"
        class="flex flex-col items-center justify-center py-12 text-center"
      >
        <p class="text-sm text-gray-500 font-medium">
          Tidak ada museum ditemukan
        </p>
        <p class="text-xs text-gray-400 mt-1">
          Coba ubah filter atau kata kunci pencarian
        </p>
      </div>
    </div>
  </div>
</template>
