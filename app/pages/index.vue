<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { museumsData, type Museum } from "~/assets/data/artifactsData";
import artifactsData from "~/assets/data/artifactsData";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const userLocation = ref<{ lat: number; lng: number } | null>(null);

let map: any = null;
let L: any = null;
let markers: Record<number, any> = {};

const categoryColors: Record<string, string> = {
    seni_dan_budaya: "#3A7763",
    sejarah: "#D97706",
    sains: "#2563EB",
    perang: "#DC2626",
};

const getArtifactCount = (museumId: number) => {
    return artifactsData.filter((a) => a.museumId === museumId).length;
};

onMounted(async () => {
    if (typeof window === "undefined") return;

    L = (await import("leaflet")).default;

    // Initialize map centered on Yogyakarta
    map = L.map("map").setView([-7.7956, 110.3695], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
    }).addTo(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation.value = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                map.setView(
                    [userLocation.value.lat, userLocation.value.lng],
                    13,
                );

                L.marker([userLocation.value.lat, userLocation.value.lng], {
                    icon: L.divIcon({
                        className: "user-location-marker",
                        html: '<div style="width: 16px; height: 16px; background: #3B82F6; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
                        iconSize: [16, 16],
                    }),
                })
                    .addTo(map)
                    .bindPopup("Lokasi Anda");
            },
            (error) => {
                console.warn("Geolocation error:", error);
            },
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
    const color = categoryColors[museum.category] || "#6B7280";
    const artifactCount = getArtifactCount(museum.id);
    const scale = isHovered ? 1.2 : 1;
    const size = Math.round(36 * scale);

    return L.divIcon({
        className: "custom-marker-wrapper",
        html: `
      <div class="custom-marker ${isHovered ? "hovered" : ""}" style="background: ${color}; width: ${size}px; height: ${size}px;">
        <span class="marker-count" style="transform: rotate(45deg);">${artifactCount}</span>
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
          <div class="w-8 h-8 rounded bg-[#6B4423]/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-[#6B4423]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          </div>
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
          <a href="/museum/${museum.id}" class="block w-full text-center px-4 py-2.5 bg-[#6B4423] text-white rounded-lg hover:bg-[#8B6F47] transition-colors font-semibold text-sm">
            Lihat Museum
          </a>
        </div>
      </div>
    `;

        marker.bindPopup(popupContent, { maxWidth: 340 });

        marker.on("mouseover", () => {
            marker.setIcon(createMarkerIcon(museum, true));
        });

        marker.on("mouseout", () => {
            marker.setIcon(createMarkerIcon(museum, false));
        });

        marker.on("click", () => {
            navigateTo(`/museum/${museum.id}`);
        });

        markers[museum.id] = marker;
    });
};

const handleSidebarMuseumClick = (museumId: number) => {
    const museum = museumsData.find((m) => m.id === museumId);
    if (museum && map) {
        map.setView([museum.lat, museum.lng], 14);

        const marker = markers[museum.id];
        if (marker) {
            marker.openPopup();
        }
    }
};
</script>

<template>
    <div class="h-full flex flex-col md:flex-row gap-2 md:gap-4 relative">
        <aside
            class="w-full md:w-80 lg:w-85 h-full overflow-hidden flex flex-col shrink-0 pl-2"
        >
            <SideBar
                :user-location="userLocation"
                @show-on-map="handleSidebarMuseumClick"
            />
        </aside>

        <div
            id="map"
            class="flex-1 min-h-[300px] md:min-h-0 h-full rounded-xl border border-gray-200 overflow-hidden shadow-sm"
        ></div>
    </div>
</template>

<style scoped>
:deep(.custom-marker) {
    border-radius: 50% 50% 50% 0 !important;
    transform: rotate(-45deg) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3) !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    border: 3px solid white !important;
}

:deep(.custom-marker.hovered) {
    transform: rotate(-45deg) scale(1.15) !important;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4) !important;
    z-index: 1000 !important;
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

/* Ensure map container has proper size */
#map {
    position: relative;
    z-index: 0;
}
</style>
