<script setup lang="ts">
import { computed, ref } from 'vue';
import artifactsData from '~/assets/data/artifactsData';
import { useUserStore } from '~/stores/user';

const route = useRoute();
const userStore = useUserStore();

const artifactId = computed(() => parseInt(route.params.id as string));
const artifact = computed(() => artifactsData.find(a => a.id === artifactId.value));

if (!artifact.value) {
  throw createError({ statusCode: 404, message: 'Artifact not found' });
}

// Career challenge state
const userStory = ref('');
const isSubmitting = ref(false);
const assessment = ref<any>(null);
const showResults = ref(false);

// Check if artifact is locked based on user XP
const isLocked = computed(() => {
  return userStore.currentXP < artifact.value!.requiredXP;
});

// Handle storytelling submission and AI grading
const submitChallenge = async () => {
  if (userStory.value.trim().length < 50) {
    alert('Cerita terlalu pendek! Minimal 50 karakter untuk penilaian yang akurat.');
    return;
  }

  isSubmitting.value = true;
  showResults.value = false;

  try {
    const response = await $fetch('/api/grade', {
      method: 'POST',
      body: {
        artifactId: artifact.value!.id,
        userStory: userStory.value,
      },
    });

    assessment.value = response.assessment;
    showResults.value = true;

    // Award XP and check for badges
    userStore.gainXP(assessment.value.xpAwarded);
    
    if (assessment.value.badgeEarned) {
      userStore.collectBadge(assessment.value.badgeEarned);
    }

    // Mark artifact as mastered if score is high
    if (assessment.value.score >= 75) {
      userStore.visitArtifact(artifact.value!.id);
    }
  } catch (error) {
    console.error('Challenge submission error:', error);
    alert('Terjadi kesalahan saat menilai cerita. Coba lagi!');
  } finally {
    isSubmitting.value = false;
  }
};

// Reset challenge to try again
const resetChallenge = () => {
  userStory.value = '';
  assessment.value = null;
  showResults.value = false;
};
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

      <!-- Locked State Warning -->
      <div v-if="isLocked" class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
        <div class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-600">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <div>
            <h3 class="font-bold text-amber-900">Artefak Terkunci</h3>
            <p class="text-sm text-amber-700">
              Kamu butuh <strong>{{ artifact.requiredXP }} XP</strong> untuk membuka challenge ini. 
              Saat ini: <strong>{{ userStore.currentXP }} XP</strong>
            </p>
          </div>
        </div>
      </div>

      <!-- Artifact Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6" :class="{ 'opacity-40 pointer-events-none': isLocked }">
        <div class="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-lg">
          <img :src="artifact.image" :alt="artifact.name" class="w-full h-full object-cover" />
        </div>

        <div class="space-y-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase">
                {{ artifact.difficulty }}
              </span>
              <span class="text-xs text-gray-500">{{ artifact.requiredXP }} XP Required</span>
            </div>
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

          <!-- Career Path Info -->
          <div class="bg-gradient-to-r from-[#2C5F4F] to-[#3A7763] p-4 rounded-xl text-white space-y-2">
            <h3 class="font-bold text-sm uppercase tracking-wide">Career Path</h3>
            <p class="text-lg font-semibold">{{ artifact.careerRole }}</p>
            <p class="text-xs opacity-90">{{ artifact.learningObjective }}</p>
          </div>

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

      <!-- Career Challenge Section -->
      <div v-if="!isLocked" class="mt-8 space-y-6">
        <div class="bg-white border-2 border-[#2C5F4F] rounded-xl p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">💼 Career Challenge</h2>
          <p class="text-gray-600 mb-4">
            Tunjukkan kemampuan storytelling museum kamu! Ceritakan artefak ini dengan cara yang menarik untuk pengunjung Gen-Z.
          </p>

          <!-- Challenge Form -->
          <div v-if="!showResults" class="space-y-4">
            <textarea
              v-model="userStory"
              placeholder="Tulis cerita kamu di sini... (minimal 50 karakter)
              
Contoh: 'Bayangin nih, Keris ini bukan cuma senjata biasa. Dibuat sama Empu Gandring sekitar abad 13, craftsman legend yang kayak master blacksmith di game RPG tapi versi real life...'"
              class="w-full h-40 p-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F4F] focus:border-transparent resize-none"
              :disabled="isSubmitting"
            ></textarea>

            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">
                {{ userStory.length }} karakter (min. 50)
              </span>
              <button
                @click="submitChallenge"
                :disabled="isSubmitting || userStory.trim().length < 50"
                class="px-6 py-3 bg-[#2C5F4F] text-white rounded-lg hover:bg-[#3A7763] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2"
              >
                <svg v-if="isSubmitting" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSubmitting ? 'Menilai...' : 'Submit untuk Penilaian AI' }}
              </button>
            </div>
          </div>

          <!-- Assessment Results -->
          <div v-if="showResults && assessment" class="space-y-4">
            <!-- Score Display -->
            <div class="bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-6">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-xl font-bold text-gray-900">Assessment Results</h3>
                  <p class="text-sm text-gray-600">By Senior Curator AI</p>
                </div>
                <div class="text-right">
                  <div class="text-5xl font-bold text-amber-600">{{ assessment.score }}</div>
                  <div class="text-lg font-semibold text-amber-700">Grade: {{ assessment.grade }}</div>
                </div>
              </div>

              <div class="space-y-3">
                <div class="bg-white rounded-lg p-3">
                  <h4 class="font-semibold text-sm text-gray-700 mb-1">💬 Feedback</h4>
                  <p class="text-sm text-gray-600">{{ assessment.feedback }}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="bg-emerald-50 rounded-lg p-3">
                    <h4 class="font-semibold text-sm text-emerald-700 mb-1">✅ Strengths</h4>
                    <p class="text-sm text-gray-600">{{ assessment.strengths }}</p>
                  </div>

                  <div class="bg-blue-50 rounded-lg p-3">
                    <h4 class="font-semibold text-sm text-blue-700 mb-1">📈 Improvements</h4>
                    <p class="text-sm text-gray-600">{{ assessment.improvements }}</p>
                  </div>
                </div>

                <div class="bg-purple-50 rounded-lg p-3">
                  <h4 class="font-semibold text-sm text-purple-700 mb-1">🎯 Career Advice</h4>
                  <p class="text-sm text-gray-600">{{ assessment.careerAdvice }}</p>
                </div>

                <!-- Rewards -->
                <div class="flex items-center justify-between bg-white rounded-lg p-3 border-2 border-emerald-200">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-600">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <span class="font-bold text-emerald-700">+{{ assessment.xpAwarded }} XP Earned!</span>
                  </div>
                  <span v-if="assessment.badgeEarned" class="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-bold rounded-full">
                    🏆 {{ assessment.badgeEarned }}
                  </span>
                </div>
              </div>
            </div>

            <button
              @click="resetChallenge"
              class="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Try Again to Improve Score
            </button>
          </div>
        </div>

        <!-- AI Chat Section (Optional - keep for research) -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">💬 Research Mode</h2>
          <p class="text-sm text-gray-600 mb-4">Butuh inspirasi? Ngobrol dengan artefak untuk research sebelum challenge!</p>
          <ArtifactChat :artifact-id="artifact.id" :artifact-name="artifact.name" />
        </div>
      </div>
    </div>
  </div>
</template>
