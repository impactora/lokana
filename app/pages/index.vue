<script setup lang="ts">
import { onMounted } from "vue";
import initMap from "~/composables/initMap";

onMounted(async () => {
    await initMap();
});
</script>

<template>
    <div class="layout-container">
        <aside id="sidebar">
            <div id="loading">Loading...</div>
            <div id="artifactList"></div>
        </aside>

        <div id="map"></div>
    </div>
</template>
