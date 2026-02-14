<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { museumsData, type Museum } from '~/assets/data/artifactsData';
import artifactsData from '~/assets/data/artifactsData';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
const userLocation = ref<{ lat: number; lng: number } | null>(null);

let map: any = null;
let L: any = null;
let markers: Record<number, any> = {};
let hoveredMarkerId: number | null = null;

const categoryColors: Record<string, string> = {
  seni_dan_budaya: '#3A7763',
  sejarah: '#D97706',
  sains: '#2563EB',
  perang: '#DC2626'
};

const categoryIcons: Record<string, string> = {
  seni_dan_budaya: '🎨',
  sejarah: '🏛️',
  sains: '🔬',
  perang: '⚔️'
};

const getArtifactCount = (museumId: number) => {
  return artifactsData.filter(a => a.museumId === museumId).length;
};

const categoryLabels: Record<string, string> = {
  seni_dan_budaya: 'Seni & Budaya',
  sejarah: 'Sejarah',
  sains: 'Sains',
  perang: 'Perang'
};

onMounted(async () => {
  if (typeof window === 'undefined') return;

  L = (await import('leaflet')).default;

  map = L.map('map').setView([-2.5489, 118.0149], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map.setView([userLocation.value.lat, userLocation.value.lng], 13);

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

  addMuseumMarkers();
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});

const createMarkerIcon = (museum: Museum, isHovered: boolean = false) => {
  const color = categoryColors[museum.category] || '#6B7280';
  const icon = categoryIcons[museum.category] || '🏛️';
  const artifactCount = getArtifactCount(museum.id);
  const scale = isHovered ? 1.2 : 1;
  const size = Math.round(36 * scale);
  const iconSize = Math.round(24 * scale);

  return L.divIcon({
    className: 'custom-marker-wrapper',
    html: `
      <div class="custom-marker ${isHovered ? 'hovered' : ''}" style="background: ${color};">
        <span style="font-size: ${iconSize}px; line-height: ${size}px;">${icon}</span>
        <span class="marker-count">${artifactCount}</span>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const addMuseumMarkers = () => {
  if (!L || !map) return;

  Object.values(markers).forEach((marker) => {
    map.removeLayer(marker);
  });
  markers = {};

  museumsData.forEach((museum) => {
    const customIcon = createMarkerIcon(museum, false);

    const marker = L.marker([museum.lat, museum.lng], {
      icon: customIcon,
    }).addTo(map);

    const artifactCount = getArtifactCount(museum.id);
    const popupContent = `
      <div class="min-w-[260px] max-w-[300px]">
        <div class="flex items-center gap-2 border-b border-gray-100 pb-3 mb-2">
          <span class="text-xl">🏛️</span>
          <div class="flex flex-col gap-0.5">
            <h3 class="font-bold text-gray-900 text-sm leading-none">
              ${museum.name}
            </h3>
            <p class="text-[10px] text-gray-500 leading-tight">
              ${museum.province}
            </p>
          </div>
        </div>
        <div>
          <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">
            ${artifactCount} artefak di koleksi
          </div>
          <a href="/museum/${museum.id}" class="block w-full text-center px-4 py-2.5 bg-[#2C5F4F] text-white rounded-lg hover:bg-[#3A7763] transition-colors font-semibold text-sm">
            Lihat Museum
          </a>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent, { maxWidth: 340 });

    marker.on('mouseover', () => {
      hoveredMarkerId = museum.id;
      marker.setIcon(createMarkerIcon(museum, true));
    });

    marker.on('mouseout', () => {
      hoveredMarkerId = null;
      marker.setIcon(createMarkerIcon(museum, false));
    });

    marker.on('click', () => {
      navigateTo(`/museum/${museum.id}`);
    });

    markers[museum.id] = marker;
  });
};

const handleMuseumClick = (museumId: number) => {
  const museum = museumsData.find(m => m.id === museumId);
  if (museum && map) {
    map.setView([museum.lat, museum.lng], 14);
  }
};

const handleShowOnMap = (museumId: number) => {
  const museum = museumsData.find(m => m.id === museumId);
  if (museum && map) {
    map.setView([museum.lat, museum.lng], 14);

    const marker = markers[museum.id];
    if (marker) {
      marker.openPopup();
    }
  }
};

const handleSidebarMuseumClick = (museumId: number) => {
  handleShowOnMap(museumId);
};

const showChat = ref(false);
const chatMessages = ref([
  { id: 1, type: "bot", text: "Halo! Saya AI Assistant LOKANA. Ada yang bisa saya bantu hari ini? Anda bisa bertanya tentang museum, artefak, atau budaya Indonesia!" }
]);
const chatInput = ref("");

const sendChatMessage = () => {
  if (!chatInput.value.trim()) return;
  chatMessages.value.push({ id: Date.now(), type: "user", text: chatInput.value });
  const userMsg = chatInput.value;
  chatInput.value = "";
  
  setTimeout(() => {
    let response = "";
    const lowerMsg = userMsg.toLowerCase();
    
    if (lowerMsg.includes("museum") || lowerMsg.includes("museum terdekat")) {
      response = "Ada banyak museum menarik di Yogyakarta! Untuk melihat semuanya, Anda bisa klik pada peta di sebelah kanan. Museum Sonobudoyo dan Museum Ullen Sentalu adalah yang paling populer!";
    } else if (lowerMsg.includes("batik") || lowerMsg.includes("tekstil")) {
      response = "Batik adalah warisan budaya UNESCO dari Indonesia! Anda bisa mengunjungi Museum Batik Danar Hadi di Pekalongan untuk melihat koleksi batik yang luar biasa.";
    } else if (lowerMsg.includes("sejarah") || lowerMsg.includes("jarah")) {
      response = "Yogyakarta memiliki rich sejarah sebagai pusat kerajaan Jawa! Museum Benteng Vredeburg menceritakan perjuangan pahlawan Indonesia.";
    } else if (lowerMsg.includes("artefak") || lowerMsg.includes("arca")) {
      response = "Artefak-artefak menarik bisa Anda temukan di Museum Sonobudoyo, seperti Arca Prajnaparamita dan Keris Empu Gandring!";
    } else {
      response = "Terima kasih atas pertanyaannya! Anda bisa menjelajahi museum di peta atau menggunakan sidebar untuk mencari museum tertentu.";
    }
    
    chatMessages.value.push({ id: Date.now() + 1, type: "bot", text: response });
  }, 500);
};
</script>

<template>
  <div class="h-full flex gap-4 relative">
    <aside class="w-85 h-full overflow-hidden flex flex-col shrink-0">
      <SideBar
        :user-location="userLocation"
        @show-on-map="handleSidebarMuseumClick"
      />
    </aside>

    <div id="map" class="flex-1 h-full rounded-xl border border-gray-200 overflow-hidden shadow-sm"></div>

    <div 
      v-if="showChat"
      class="fixed bottom-20 right-4 w-80 md:w-96 h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50"
    >
      <div class="bg-[#2C5F4F] text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🤖</span>
          <div>
            <p class="font-bold text-sm">AI Assistant</p>
            <p class="text-xs text-white/70">LOKANA</p>
          </div>
        </div>
        <button @click="showChat = false" class="text-white/80 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <div 
          v-for="msg in chatMessages" 
          :key="msg.id"
          class="flex"
          :class="msg.type === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div 
            class="max-w-[80%] p-3 rounded-xl text-sm"
            :class="msg.type === 'user' ? 'bg-[#2C5F4F] text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>
      
      <div class="p-3 border-t border-gray-200">
        <div class="flex gap-2">
          <input
            v-model="chatInput"
            type="text"
            placeholder="Apa yang ingin Anda tahu?"
            class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F4F]"
            @keyup.enter="sendChatMessage"
          />
          <button 
            @click="sendChatMessage"
            class="px-4 py-2 bg-[#2C5F4F] text-white rounded-lg hover:bg-[#3A7763] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m22 2-7 20-4-9-9-4Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <button
      @click="showChat = !showChat"
      class="fixed bottom-4 right-4 w-14 h-14 bg-[#2C5F4F] text-white rounded-full shadow-lg hover:bg-[#3A7763] transition-all flex items-center justify-center z-50 hover:scale-110"
    >
      <span v-if="!showChat" class="text-2xl">💬</span>
      <span v-else class="text-2xl">🤖</span>
    </button>
  </div>
</template>

<style scoped>
:deep(.custom-marker) {
  width: 36px !important;
  height: 36px !important;
  border-radius: 50% 50% 50% 0 !important;
  transform: rotate(-45deg) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3) !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

:deep(.custom-marker.hovered) {
  transform: rotate(-45deg) scale(1.2) !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4) !important;
  z-index: 1000 !important;
}

:deep(.custom-marker span) {
  transform: rotate(45deg) !important;
}

:deep(.marker-count) {
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: white;
  color: #374151;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 12px;
}

:deep(.leaflet-popup-content) {
  margin: 12px 14px;
}
</style>
