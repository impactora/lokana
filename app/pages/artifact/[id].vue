<script setup lang="ts">
import { computed } from 'vue';
import artifactsData from '~/assets/data/artifactsData';

const route = useRoute();
const artifactId = computed(() => parseInt(route.params.id as string));
const artifact = computed(() => artifactsData.find(a => a.id === artifactId.value));

if (!artifact.value) {
  throw createError({ statusCode: 404, message: 'Artifact not found' });
}
</script>

<template>
  <div v-if="artifact" class="h-full overflow-y-auto p-6">
    <div class="max-w-5xl mx-auto space-y-6">
      <!-- Back button -->
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-600 hover:text-[#2C5F4F] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        Kembali ke Peta
      </NuxtLink>

      <!-- Artifact Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="aspect-square rounded-xl overflow-hidden bg-gray-100">
          <img :src="artifact.image" :alt="artifact.name" class="w-full h-full object-cover" />
        </div>

        <div class="space-y-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ artifact.name }}</h1>
            <div class="flex gap-2">
              <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full uppercase">
                {{ artifact.type }}
              </span>
              <span class="px-3 py-1 bg-amber-50 text-amber-700 text-sm font-medium rounded-full">
                {{ artifact.period }}
              </span>
            </div>
          </div>

          <p class="text-gray-700 leading-relaxed">{{ artifact.description }}</p>

          <div class="space-y-2 pt-4 border-t border-gray-200">
            <div class="flex items-center gap-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
              <span class="font-semibold text-gray-900">{{ artifact.museum.name }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              </svg>
              <span class="text-gray-600">{{ artifact.origin }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Chat Section -->
      <div class="mt-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">💬 Ngobrol dengan Artifact</h2>
        <ArtifactChat :artifact-id="artifact.id" :artifact-name="artifact.name" />
      </div>
    </div>
  </div>
</template>
