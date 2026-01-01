<script setup lang="ts">
import { onMounted } from "vue";
import initMap from "~/composables/initMap";

onMounted(() => {
    initMap();
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

<style>
#map {
    height: 100vh;
    width: 100%;
}
/* Style dasar agar map tidak ketutup */
</style>
