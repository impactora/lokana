<script setup lang="ts">
import { ref, computed } from 'vue';
import { museumsData } from '~/assets/data/artifactsData';
import { MapPin, Clock, Navigation, Calendar, Share2, Building2, Camera, Users, BookOpen } from 'lucide-vue-next';

// Preset itinerary routes
const presetRoutes = [
  {
    id: 'heritage-day',
    name: 'One Day Heritage Tour',
    duration: '8 jam',
    description: 'Jelajahi warisan budaya Jogja dalam sehari',
    museums: [1, 2, 4], // Ullen Sentalu, Sonobudoyo, Vredeburg
    bestTime: 'Pagi hari (08:00 - 16:00)',
    difficulty: 'Mudah',
    icon: Building2
  },
  {
    id: 'instagram-spots',
    name: 'Instagram Worthy Spots',
    duration: '6 jam',
    description: 'Spot foto terbaik untuk konten sosial media',
    museums: [1, 5], // Ullen Sentalu, Museum Sains
    bestTime: 'Siang hari (10:00 - 16:00)',
    difficulty: 'Mudah',
    icon: Camera
  },
  {
    id: 'family-friendly',
    name: 'Family Friendly Tour',
    duration: '5 jam',
    description: 'Cocok untuk keluarga dengan anak-anak',
    museums: [5, 7, 8], // Sains, Kereta Api, Wayang
    bestTime: 'Pagi hari (09:00 - 14:00)',
    difficulty: 'Mudah',
    icon: Users
  },
  {
    id: 'deep-history',
    name: 'Deep Historical Dive',
    duration: '10 jam',
    description: 'Untuk pecinta sejarah yang ingin eksplorasi mendalam',
    museums: [2, 4, 7], // Sonobudoyo, Vredeburg, Kereta Api
    bestTime: 'Full day (08:00 - 18:00)',
    difficulty: 'Menengah',
    icon: BookOpen
  }
];

const selectedRoute = ref<string | null>(null);
const customMuseums = ref<number[]>([]);

const selectedRouteData = computed(() => {
  if (!selectedRoute.value) return null;
  return presetRoutes.find(r => r.id === selectedRoute.value);
});

const routeMuseums = computed(() => {
  const museumIds = selectedRouteData.value?.museums || customMuseums.value;
  return museumsData.filter(m => museumIds.includes(m.id));
});

const totalEstimatedTime = computed(() => {
  // Average 1.5 hours per museum + travel time
  const baseTime = routeMuseums.value.length * 1.5;
  const travelTime = Math.max(0, (routeMuseums.value.length - 1) * 0.5);
  return baseTime + travelTime;
});

const selectPresetRoute = (routeId: string) => {
  selectedRoute.value = routeId;
  customMuseums.value = [];
};

const toggleCustomMuseum = (museumId: number) => {
  const index = customMuseums.value.indexOf(museumId);
  if (index > -1) {
    customMuseums.value.splice(index, 1);
  } else {
    customMuseums.value.push(museumId);
  }
  selectedRoute.value = null;
};

const exportToCalendar = () => {
  alert('Fitur export ke Google Calendar akan segera hadir!');
};

const shareRoute = () => {
  if (navigator.share) {
    navigator.share({
      title: selectedRouteData.value?.name || 'Rute Museum Jogja',
      text: `Jelajahi ${routeMuseums.value.length} museum di Yogyakarta!`,
      url: window.location.href
    });
  } else {
    alert('Fitur share akan segera hadir!');
  }
};
</script>

<template>
  <div class="h-full overflow-y-auto pb-20 md:pb-6">
    <div class="max-w-5xl mx-auto space-y-6">
      <!-- Header -->
      <div class="bg-gradient-to-r from-[#6B4423] to-[#8B6F47] rounded-xl p-6 text-white">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <MapPin class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold font-['Libre_Baskerville']">Rencanakan Rute</h1>
            <p class="text-white/80 text-sm">Pilih rute atau buat sendiri</p>
          </div>
        </div>
      </div>

      <!-- Preset Routes -->
      <div>
        <h2 class="text-lg font-bold text-[#2D2416] mb-4 font-['Libre_Baskerville']">Rute Rekomendasi</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="route in presetRoutes"
            :key="route.id"
            @click="selectPresetRoute(route.id)"
            class="group bg-white border-2 rounded-xl p-5 cursor-pointer transition-all"
            :class="selectedRoute === route.id 
              ? 'border-[#6B4423] shadow-md' 
              : 'border-[#6B4423]/10 hover:border-[#D4A574] hover:shadow-sm'"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-[#6B4423]/10 rounded-lg flex items-center justify-center shrink-0">
                <component :is="route.icon" class="w-6 h-6 text-[#6B4423]" />
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-[#2D2416] mb-1">{{ route.name }}</h3>
                <p class="text-sm text-[#6B5D4F] mb-3">{{ route.description }}</p>
                
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="flex items-center gap-1 px-2 py-1 bg-[#6B4423]/5 text-[#6B4423] rounded-full">
                    <Clock class="w-3 h-3" />
                    {{ route.duration }}
                  </span>
                  <span class="flex items-center gap-1 px-2 py-1 bg-[#4A7C59]/10 text-[#4A7C59] rounded-full">
                    <MapPin class="w-3 h-3" />
                    {{ route.museums.length }} museum
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Route Builder -->
      <div>
        <h2 class="text-lg font-bold text-[#2D2416] mb-4 font-['Libre_Baskerville']">Atau Buat Rute Sendiri</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button
            v-for="museum in museumsData"
            :key="museum.id"
            @click="toggleCustomMuseum(museum.id)"
            class="p-3 text-left border-2 rounded-lg transition-all"
            :class="customMuseums.includes(museum.id)
              ? 'border-[#6B4423] bg-[#6B4423]/5'
              : 'border-[#6B4423]/10 hover:border-[#D4A574] bg-white'"
          >
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 rounded bg-[#6B4423]/10 flex items-center justify-center">
                <Building2 class="w-4 h-4 text-[#6B4423]" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-xs text-[#2D2416] truncate">{{ museum.name }}</h4>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Route Summary -->
      <div v-if="routeMuseums.length > 0" class="bg-white border border-[#6B4423]/10 rounded-xl p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-[#2D2416] font-['Libre_Baskerville']">
            {{ selectedRouteData?.name || 'Rute Custom' }}
          </h3>
          <div class="flex gap-2">
            <button
              @click="shareRoute"
              class="p-2 rounded-lg bg-[#6B4423]/5 text-[#6B4423] hover:bg-[#6B4423]/10 transition-all"
              title="Share Route"
            >
              <Share2 class="w-4 h-4" />
            </button>
            <button
              @click="exportToCalendar"
              class="p-2 rounded-lg bg-[#6B4423]/5 text-[#6B4423] hover:bg-[#6B4423]/10 transition-all"
              title="Export to Calendar"
            >
              <Calendar class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Route Stats -->
        <div class="grid grid-cols-3 gap-4 p-4 bg-[#6B4423]/5 rounded-lg">
          <div class="text-center">
            <div class="text-2xl font-bold text-[#6B4423]">{{ routeMuseums.length }}</div>
            <div class="text-xs text-[#6B5D4F]">Museum</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-[#6B4423]">~{{ totalEstimatedTime.toFixed(0) }}j</div>
            <div class="text-xs text-[#6B5D4F]">Estimasi Waktu</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-[#6B4423]">{{ selectedRouteData?.difficulty || 'Custom' }}</div>
            <div class="text-xs text-[#6B5D4F]">Tingkat</div>
          </div>
        </div>

        <!-- Museum List in Order -->
        <div class="space-y-3">
          <h4 class="font-semibold text-sm text-[#2D2416]">Urutan Kunjungan</h4>
          <div
            v-for="(museum, index) in routeMuseums"
            :key="museum.id"
            class="flex items-center gap-4 p-3 bg-[#F5F1EA] rounded-lg"
          >
            <div class="w-8 h-8 shrink-0 rounded-full bg-[#6B4423] text-white flex items-center justify-center font-bold text-sm">
              {{ index + 1 }}
            </div>
            <div class="flex-1 min-w-0">
              <h5 class="font-semibold text-sm text-[#2D2416] truncate">{{ museum.name }}</h5>
              <p class="text-xs text-[#6B5D4F]">{{ museum.openingHours }}</p>
            </div>
            <NuxtLink
              :to="`/museum/${museum.id}`"
              class="px-3 py-1.5 text-xs font-medium bg-white text-[#6B4423] rounded-lg border border-[#6B4423]/20 hover:bg-[#6B4423] hover:text-white transition-all"
            >
              Detail
            </NuxtLink>
          </div>
        </div>

        <!-- Start Navigation Button -->
        <button
          class="w-full py-3 bg-gradient-to-r from-[#6B4423] to-[#8B6F47] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
        >
          <Navigation class="w-5 h-5" />
          Mulai Navigasi
        </button>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <MapPin class="w-16 h-16 mx-auto text-[#6B4423]/20 mb-4" />
        <h3 class="text-lg font-semibold text-[#2D2416] mb-2">Pilih Rute atau Buat Sendiri</h3>
        <p class="text-sm text-[#6B5D4F]">Pilih preset atau klik museum untuk membuat rute custom</p>
      </div>
    </div>
  </div>
</template>
