<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import artifactsData from '~/assets/data/artifactsData';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
const userLocation = ref<{ lat: number; lng: number } | null>(null);

let map: any = null;
let L: any = null;
let markers: Record<string, any> = {};

// Initialize map on component mount
onMounted(async () => {
  if (typeof window === 'undefined') return;

  // Dynamically import Leaflet
  L = (await import('leaflet')).default;

  // Initialize map centered on Indonesia
  map = L.map('map').setView([-2.5489, 118.0149], 5);

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  // Request user geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Center map on user location
        map.setView([userLocation.value.lat, userLocation.value.lng], 13);

        // Add user location marker
        L.marker([userLocation.value.lat, userLocation.value.lng], {
          icon: L.divIcon({
            className: 'user-location-marker',
            html: '<div style="width: 16px; height: 16px; background: #3B82F6; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
            iconSize: [16, 16],
          }),
        })
          .addTo(map)
          .bindPopup('Lokasi Anda');
      },
      (error) => {
        console.warn('Geolocation error:', error);
      }
    );
  }

  // Add museum markers to map
  addMuseumMarkers();
});

// Cleanup map on unmount
onUnmounted(() => {
  if (map) {
    map.remove();
  }
});

// Add markers for museums with artifacts
const addMuseumMarkers = () => {
  if (!L || !map) return;

  // Clear existing markers
  Object.values(markers).forEach((marker) => {
    map.removeLayer(marker);
  });
  markers = {};

  // Group artifacts by museum location
  interface MuseumGroup {
    museum: any;
    artifacts: any[];
  }

  const museumGroups: Record<string, MuseumGroup> = {};
  artifactsData.forEach((artifact) => {
    const key = `${artifact.museum.lat}-${artifact.museum.lng}`;
    if (!museumGroups[key]) {
      museumGroups[key] = {
        museum: artifact.museum,
        artifacts: [],
      };
    }
    museumGroups[key].artifacts.push(artifact);
  });

  // Create markers for each museum
  Object.entries(museumGroups).forEach(([key, data]) => {
    const isUnlocked = userStore.unlockedLocations.includes(data.museum.name);

    const customIcon = L.divIcon({
      className: 'custom-marker-wrapper',
      html: `<div class="custom-marker ${data.artifacts.length > 1 ? 'has-multiple' : ''} ${isUnlocked ? 'unlocked' : 'locked'}" data-count="${data.artifacts.length}"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    const marker = L.marker([data.museum.lat, data.museum.lng], {
      icon: customIcon,
    }).addTo(map);

    // Popup content with all artifacts at this museum
    const popupContent = `
      <div class="min-w-[240px] max-w-[280px]">
        <div class="flex items-center gap-2 border-b border-gray-100 pb-3 mb-2">
          <span class="text-xl">🏛️</span>
          <div class="flex flex-col gap-0.5">
            <h3 class="font-bold text-gray-900 text-sm leading-none">
              ${data.museum.name}
            </h3>
            <p class="text-[10px] text-gray-500 leading-tight">
              ${data.museum.province || 'Lokasi Museum'}
            </p>
          </div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">
            Koleksi di sini (${data.artifacts.length})
          </div>
          <div class="flex flex-col gap-1 max-h-[220px] overflow-y-auto pr-1">
            ${data.artifacts
              .map(
                (artifact: any) => `
              <div class="group flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-50 cursor-pointer transition-all border border-transparent hover:border-emerald-100">
                <div class="relative w-10 h-10 shrink-0 overflow-hidden rounded-md bg-gray-100 shadow-sm">
                  <img src="${artifact.image}" alt="${artifact.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="flex flex-col min-w-0">
                  <div class="text-xs font-semibold text-gray-800 truncate group-hover:text-emerald-700">
                    ${artifact.name}
                  </div>
                  <div class="text-[10px] text-gray-500 truncate mt-0.5">
                    <span class="bg-gray-100 px-1 rounded text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
                      ${artifact.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent, { maxWidth: 320 });

    // Unlock location when popup is opened
    marker.on('popupopen', () => {
      if (!isUnlocked) {
        userStore.unlockLocation(data.museum.name);
      }
    });

    markers[key] = marker;
  });
};

// Handle artifact click from sidebar
const handleArtifactClick = (artifactId: number) => {
  const artifact = artifactsData.find((a) => a.id === artifactId);
  if (artifact && map) {
    map.setView([artifact.museum.lat, artifact.museum.lng], 14);
  }
};

// Handle show on map button
const handleShowOnMap = (artifactId: number) => {
  const artifact = artifactsData.find((a) => a.id === artifactId);
  if (artifact && map) {
    map.setView([artifact.museum.lat, artifact.museum.lng], 14);

    const key = `${artifact.museum.lat}-${artifact.museum.lng}`;
    const marker = markers[key];
    if (marker) {
      marker.openPopup();
    }
  }
};
</script>

<template>
  <div class="h-full flex gap-4">
    <!-- Sidebar -->
    <aside class="w-85 h-full overflow-hidden flex flex-col shrink-0">
      <SideBar
        :user-location="userLocation"
        @artifact-click="handleArtifactClick"
        @show-on-map="handleShowOnMap"
      />
    </aside>

    <!-- Map -->
    <div id="map" class="flex-1 h-full rounded-xl border border-gray-200 overflow-hidden shadow-sm"></div>
  </div>
</template>

<style scoped>
/* Leaflet map custom styles for fog of war effect */
:deep(.custom-marker.locked) {
  background: #9CA3AF !important;
  opacity: 0.5;
}

:deep(.custom-marker.unlocked) {
  background: #2C5F4F !important;
}
</style>
