// import L from "leaflet";
import artifactsData from "~/assets/data/artifactsData";

// STATE
let map: any;
let userLocation: { lat: number; lng: number } | null = null;
let markers: Record<string, L.Marker> = {};
let activeFilter = "all";
let searchQuery = "";

// MAIN FUNCTION
export default async function initMap() {
  if (typeof window === "undefined") return;

  const L = (await import("leaflet")).default;
  map = L.map("map").setView([-2.5489, 118.0149], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19,
  }).addTo(map);

  requestGeolocation();
  initUI();
}

// LOGIC & GEOLOCATION
async function requestGeolocation() {
  const L = (await import("leaflet")).default;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map.setView([userLocation.lat, userLocation.lng], 15);

        L.marker([userLocation.lat, userLocation.lng], {
          icon: L.divIcon({
            className: "user-location-marker",
            html: '<div style="width: 16px; height: 16px; background: #3B82F6; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
            iconSize: [16, 16],
          }),
        })
          .addTo(map)
          .bindPopup("Your Location");

        updateLocationText("Location detected");
        addMuseumMarkers();
        renderArtifactList();
        hideLoading();
      },
      (error) => {
        updateLocationText("Showing All");
        addMuseumMarkers();
        renderArtifactList();
        hideLoading();
      },
    );
  } else {
    updateLocationText("Geolocation not supported");
    addMuseumMarkers();
    renderArtifactList();
    hideLoading();
  }
}

// EVENT LISTENER
function initUI() {
  const filterChips = document.querySelectorAll(".filter-chip");
  const searchInput = document.getElementById("searchInput");
  const mobileToggle = document.getElementById("mobileToggle");
  const sidebarHeader = document.querySelector(".sidebar-header");

  // Safety check
  if (!searchInput && filterChips.length === 0) return;

  filterChips.forEach((c) => {
    const chip = c as HTMLElement;
    chip.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-chip")
        .forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.filter || "all";
      addMuseumMarkers();
      renderArtifactList();
    });
  });

  searchInput?.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    searchQuery = target.value;
    addMuseumMarkers();
    renderArtifactList();
  });

  mobileToggle?.addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar?.classList.toggle("open");
  });

  sidebarHeader?.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById("sidebar");
      sidebar?.classList.toggle("open");
    }
  });
}

// HELPER FUNCTION
function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
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
}

async function addMuseumMarkers() {
  const L = (await import("leaflet")).default;

  Object.values(markers).forEach((marker) => {
    map.removeLayer(marker);
  });
  markers = {};

  const filteredArtifacts = getFilteredArtifacts();

  interface MuseumGroup {
    museum: any;
    artifacts: any;
  }

  const museumGroups: Record<string, MuseumGroup> = {};
  filteredArtifacts.forEach((artifact: any) => {
    const key = `${artifact.museum.lat}-${artifact.museum.lng}`;
    if (!museumGroups[key]) {
      museumGroups[key] = {
        museum: artifact.museum,
        artifacts: [],
      };
    }
    museumGroups[key].artifacts.push(artifact);
  });

  Object.entries(museumGroups).forEach(([key, data]) => {
    const customIcon = L.divIcon({
      className: "custom-marker-wrapper",
      html: `<div class="custom-marker ${data.artifacts.length > 1 ? "has-multiple" : ""}" data-count="${data.artifacts.length}"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    const marker = L.marker([data.museum.lat, data.museum.lng], {
      icon: customIcon,
    }).addTo(map);

    // Popup showing all artifacts at this museum
    const popupContent = `
                      <div class="popup-content">
                          <div class="popup-museum-name">
                              🏛️ ${data.museum.name}
                          </div>
                          <div class="popup-collections">
                              <div class="popup-collection-title">
                                  Koleksi di museum ini (${data.artifacts.length}):
                              </div>
                              ${data.artifacts
                                .map(
                                  (artifact: any) => `
                                  <div class="popup-artifact-item" onclick="highlightArtifactCard(${artifact.id})">
                                      <img src="${artifact.image}" alt="${artifact.name}" class="popup-artifact-thumb">
                                      <div class="popup-artifact-info">
                                          <div class="popup-artifact-name">${artifact.name}</div>
                                          <div class="popup-artifact-type">${artifact.type.toUpperCase()} • ${artifact.period}</div>
                                      </div>
                                  </div>
                              `,
                                )
                                .join("")}
                          </div>
                      </div>
                  `;

    marker.bindPopup(popupContent, { maxWidth: 320 });
    markers[key] = marker;
  });
}

function renderArtifactList() {
  const listContainer = document.getElementById("artifactList");
  const statsInfo = document.getElementById("statsInfo");
  const filteredArtifacts = getFilteredArtifacts();

  if (!listContainer || !statsInfo) return;

  // Calculate distances and sort
  const artifactsWithDistance = filteredArtifacts.map((artifact) => {
    const distance = userLocation
      ? calculateDistance(
          userLocation.lat,
          userLocation.lng,
          artifact.museum.lat,
          artifact.museum.lng,
        )
      : null;
    return { ...artifact, distance };
  });

  artifactsWithDistance.sort((a, b) => {
    if (!a.distance) return 1;
    if (!b.distance) return -1;
    return a.distance - b.distance;
  });

  // Update stats
  statsInfo.innerHTML = `
        <span><span class="stats-number">${artifactsWithDistance.length}</span> peninggalan ditemukan</span>
        <span id="locationText">${userLocation ? "📍 Terdekat dulu" : "📍 Semua lokasi"}</span>
    `;

  // Render cards
  listContainer.innerHTML = artifactsWithDistance
    .map(
      (artifact) => `
        <div class="artifact-card" data-id="${artifact.id}" onclick="focusOnArtifact(${artifact.id})">
            <div class="artifact-header">
                <img src="${artifact.image}" alt="${artifact.name}" class="artifact-image">
                <div class="artifact-info">
                    <div class="artifact-name">${artifact.name}</div>
                    <div class="artifact-meta">
                        <span class="artifact-type">${artifact.type.toUpperCase()}</span>
                        <span class="artifact-period">${artifact.period}</span>
                    </div>
                </div>
            </div>
            <div class="artifact-description">${artifact.description}</div>
            <div class="artifact-museum">
                <span class="museum-icon">🏛️</span>
                <div class="museum-info">
                    <div class="museum-name">${artifact.museum.name}</div>
                    <div class="museum-distance">
                        ${
                          artifact.distance
                            ? `📍 ${artifact.distance.toFixed(1)} km dari Anda`
                            : `📍 ${artifact.museum.province}`
                        }
                    </div>
                </div>
            </div>
            <div class="artifact-footer">
                <button class="btn btn-primary" onclick="showMuseumOnMap(${artifact.id}); event.stopPropagation();">
                    📍 Lihat Lokasi Museum
                </button>
            </div>
        </div>
    `,
    )
    .join("");
}

function updateLocationText(text: string) {
  const elem = document.getElementById("locationText");
  if (elem) elem.textContent = `$${text}`;
}

function getFilteredArtifacts() {
  return artifactsData.filter((artifact) => {
    const matchesFilter =
      activeFilter === "all" || artifact.type === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      artifact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artifact.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artifact.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artifact.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
}

export function focusOnArtifact(id: any) {
  const artifact = artifactsData.find((a) => a.id === id);
  if (artifact) {
    showMuseumOnMap(id);
    highlightArtifactCard(id);
  }
}

export function showMuseumOnMap(artifactId: any) {
  const artifact = artifactsData.find((a) => a.id === artifactId);
  if (artifact) {
    map.setView([artifact.museum.lat, artifact.museum.lng], 14);

    const key = `${artifact.museum.lat}-${artifact.museum.lng}`;
    const marker = markers[key];

    if (marker) {
      marker.openPopup();
    }
  }
}

if (typeof window !== "undefined") {
  (window as any).showMuseumOnMap = showMuseumOnMap;
  (window as any).focusOnArtifact = focusOnArtifact;
  (window as any).highlightArtifactCard = highlightArtifactCard;
}

function highlightArtifactCard(id: any) {
  document.querySelectorAll(".artifact-card").forEach((card) => {
    card.classList.remove("active");
  });

  const activeCard = document.querySelector(`[data-id="${id}"]`);
  if (activeCard) {
    activeCard.classList.add("active");
    activeCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function hideLoading() {
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "none";
}
