<script setup lang="ts">
import { ref, computed } from 'vue';
import { museumsData, type Museum } from '~/assets/data/artifactsData';
import artifactsData from '~/assets/data/artifactsData';
import { useUserStore } from '~/stores/user';

const route = useRoute();
const userStore = useUserStore();

const museumId = computed(() => parseInt(route.params.id as string));
const museum = computed(() => museumsData.find(m => m.id === museumId.value));

const artifacts = computed(() => {
  return artifactsData.filter(a => a.museumId === museumId.value);
});

if (!museum.value) {
  throw createError({ statusCode: 404, message: 'Museum not found' });
}

const comments = ref([
  { id: 1, user: "Ahmad Rizki", avatar: "A", date: "2024-01-15", rating: 5, text: "Museum yang sangat edukatif! Anak-anak sangat antusias belajar tentang sejarah batik." },
  { id: 2, user: "Siti Nurhaliza", avatar: "S", date: "2024-01-10", rating: 4, text: "Koleksi batik yang luar biasa lengkap." },
  { id: 3, user: "Budi Santoso", avatar: "B", date: "2024-01-05", rating: 5, text: "Tempat yang wajib dikunjungi bagi pecinta budaya Jawa." }
]);

const newComment = ref("");
const newRating = ref(5);
const isSubmittingComment = ref(false);

const categoryLabels: Record<string, string> = {
  seni_dan_budaya: 'Seni & Budaya',
  sejarah: 'Sejarah',
  sains: 'Sains',
  nasional: 'Nasional',
  perang: 'Perang'
};

const categoryColors: Record<string, string> = {
  seni_dan_budaya: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  sejarah: 'bg-amber-100 text-amber-700 border-amber-200',
  sains: 'bg-blue-100 text-blue-700 border-blue-200',
  nasional: 'bg-purple-100 text-purple-700 border-purple-200',
  perang: 'bg-red-100 text-red-700 border-red-200'
};

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-orange-100 text-orange-700',
  expert: 'bg-red-100 text-red-700'
};

const handleArtifactClick = (artifactId: number) => {
  const artifact = artifactsData.find(a => a.id === artifactId);
  if (!artifact) return;
  if (userStore.currentXP < artifact.requiredXP) {
    alert(`Artefak terkunci! Kamu butuh ${artifact.requiredXP} XP untuk membuka challenge ini.`);
    return;
  }
  navigateTo(`/artifact/${artifactId}`);
};

const submitComment = () => {
  if (newComment.value.trim().length < 10) {
    alert("Komentar minimal 10 karakter!");
    return;
  }
  isSubmittingComment.value = true;
  setTimeout(() => {
    comments.value.unshift({
      id: Date.now(),
      user: userStore.userName || "Pengunjung",
      avatar: (userStore.userName || "P").charAt(0).toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      rating: newRating.value,
      text: newComment.value
    });
    newComment.value = "";
    newRating.value = 5;
    isSubmittingComment.value = false;
  }, 500);
};

const showChat = ref(false);
const chatMessages = ref([
  { id: 1, type: "bot", text: `Halo! Saya AI Assistant untuk ${museum.value?.name}. Ada yang bisa saya bantu tentang museum ini?` }
]);
const chatInput = ref("");

const sendChatMessage = () => {
  if (!chatInput.value.trim()) return;
  chatMessages.value.push({ id: Date.now(), type: "user", text: chatInput.value });
  const userMsg = chatInput.value;
  chatInput.value = "";
  setTimeout(() => {
    chatMessages.value.push({ 
      id: Date.now() + 1, 
      type: "bot", 
      text: `Terima kasih atas pertanyaan Anda tentang "${userMsg}". Untuk informasi lebih lengkap tentang ${museum.value?.name}, Anda bisa langsung mengunjungi museum ini ya!` 
    });
  }, 500);
};

const renderStars = (rating: number) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

const currentQuizIndex = ref(0);
const selectedAnswer = ref<number | null>(null);
const showQuizResult = ref(false);
const answeredQuizzes = ref<number[]>([]);

const currentQuiz = computed(() => {
  if (!museum.value?.quiz) return null;
  return museum.value.quiz[currentQuizIndex.value];
});

const isQuizCompleted = (index: number) => {
  return answeredQuizzes.value.includes(index);
};

const allQuizzesAnswered = computed(() => {
  if (!museum.value?.quiz) return false;
  return answeredQuizzes.value.length === museum.value.quiz.length;
});

const nextQuiz = () => {
  showQuizResult.value = false;
  selectedAnswer.value = null;
  if (currentQuizIndex.value < (museum.value?.quiz?.length || 0) - 1) {
    currentQuizIndex.value++;
  } else {
    currentQuizIndex.value = 0;
  }
};

const resetQuiz = () => {
  if (!canDoQuiz.value) return;
  currentQuizIndex.value = 0;
  selectedAnswer.value = null;
  showQuizResult.value = false;
  answeredQuizzes.value = [];
};

const canDoQuiz = computed(() => userStore.canDoQuiz(museumId.value));
const quizCooldown = computed(() => userStore.getQuizCooldown(museumId.value));

const submitAnswer = () => {
  if (selectedAnswer.value === null || !currentQuiz.value) return;
  
  const isCorrect = selectedAnswer.value === currentQuiz.value.correctAnswer;
  showQuizResult.value = true;
  
  if (isCorrect && !answeredQuizzes.value.includes(currentQuizIndex.value)) {
    userStore.gainXP(currentQuiz.value.xpReward);
    answeredQuizzes.value.push(currentQuizIndex.value);
  }
  
  if (allQuizzesAnswered.value) {
    userStore.completeQuiz(museumId.value);
  }
};
</script>

<template>
  <div v-if="museum" class="h-full overflow-y-auto p-4 md:p-6 pb-24">
    <div class="max-w-5xl mx-auto space-y-6">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-600 hover:text-[#2C5F4F] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        Kembali ke Peta
      </NuxtLink>

      <div class="relative h-64 md:h-80 rounded-2xl overflow-hidden">
        <img :src="museum.image" :alt="museum.name" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div class="flex items-center gap-2 mb-2">
            <span 
              class="px-3 py-1 text-sm font-medium rounded-full border"
              :class="categoryColors[museum.category] || 'bg-gray-100 text-gray-700'"
            >
              {{ categoryLabels[museum.category] || museum.category }}
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ museum.name }}</h1>
          <div class="flex items-center gap-4">
            <p class="text-white/80">{{ museum.province }}</p>
            <div v-if="museum.rating" class="flex items-center gap-1">
              <span class="text-amber-400">★</span>
              <span class="font-semibold">{{ museum.rating }}</span>
              <span class="text-white/60 text-sm">({{ museum.totalReviews }} review)</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
            <p class="text-gray-700 leading-relaxed">{{ museum.description }}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-if="museum.philosophy" class="bg-emerald-50 rounded-xl p-4">
                <p class="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1">Filosofi</p>
                <p class="text-sm text-emerald-800">{{ museum.philosophy }}</p>
              </div>
              
              <div v-if="museum.historyContext" class="bg-amber-50 rounded-xl p-4">
                <p class="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">Sejarah</p>
                <p class="text-sm text-amber-800">{{ museum.historyContext }}</p>
              </div>
              
              <div v-if="museum.museumTheme" class="bg-blue-50 rounded-xl p-4">
                <p class="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Tema</p>
                <p class="text-sm text-blue-800">{{ museum.museumTheme }}</p>
              </div>
              
              <div v-if="museum.historicalEra" class="bg-purple-50 rounded-xl p-4">
                <p class="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1">Era</p>
                <p class="text-sm text-purple-800">{{ museum.historicalEra }}</p>
              </div>
            </div>

            <div v-if="museum.culturalValues && museum.culturalValues.length > 0" class="flex flex-wrap gap-2">
              <span 
                v-for="(value, index) in museum.culturalValues" 
                :key="index"
                class="px-3 py-1.5 bg-[#2C5F4F]/10 text-[#2C5F4F] text-xs font-medium rounded-full"
              >
                {{ value }}
              </span>
            </div>
          </div>

          <div v-if="museum.quiz && museum.quiz.length > 0" class="bg-gradient-to-r from-[#2C5F4F] to-[#3A7763] rounded-2xl p-6 text-white">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold">Quiz Museum</h2>
              <span class="text-sm bg-white/20 px-3 py-1 rounded-full">
                {{ answeredQuizzes.length }}/{{ museum.quiz.length }} dijawab
              </span>
            </div>
            
            <div v-if="!canDoQuiz" class="text-center py-4">
              <p class="text-amber-300 font-semibold mb-2">⏰ Quiz akan tersedia dalam {{ quizCooldown }}</p>
              <p class="text-sm text-white/70">Kamu sudah melakukan quiz minggu ini. Coba lagi nanti!</p>
            </div>
            
            <div v-else-if="!allQuizzesAnswered && currentQuiz" class="space-y-4">
              <div class="bg-white/10 rounded-xl p-4">
                <p class="font-medium mb-4">{{ currentQuiz.question }}</p>
                <div class="space-y-2">
                  <button
                    v-for="(option, idx) in currentQuiz.options"
                    :key="idx"
                    @click="!showQuizResult && (selectedAnswer = idx)"
                    :disabled="showQuizResult"
                    class="w-full text-left px-4 py-3 rounded-lg text-sm transition-all"
                    :class="{
                      'bg-amber-400 text-black': showQuizResult && idx === currentQuiz.correctAnswer,
                      'bg-red-400 text-white': showQuizResult && selectedAnswer === idx && idx !== currentQuiz.correctAnswer,
                      'bg-white/20 hover:bg-white/30': selectedAnswer !== idx && !showQuizResult,
                      'bg-emerald-400 text-black': selectedAnswer === idx && !showQuizResult
                    }"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
              
              <div v-if="showQuizResult" class="flex items-center justify-between">
                <span class="text-sm">
                  <span v-if="selectedAnswer === currentQuiz.correctAnswer" class="text-emerald-300 font-semibold">
                    ✓ Benar! +{{ currentQuiz.xpReward }} XP
                  </span>
                  <span v-else class="text-red-300 font-semibold">
                    ✗ Salah, jawaban yang benar: {{ currentQuiz.options[currentQuiz.correctAnswer] }}
                  </span>
                </span>
                <button
                  @click="nextQuiz"
                  class="px-4 py-2 bg-white text-[#2C5F4F] rounded-lg font-semibold text-sm hover:bg-white/90 transition-colors"
                >
                  {{ currentQuizIndex < museum.quiz.length - 1 ? 'Soal Berikutnya' : 'Mulai Ulang' }}
                </button>
              </div>
              
              <button
                v-if="!showQuizResult"
                @click="submitAnswer"
                :disabled="selectedAnswer === null"
                class="w-full px-4 py-3 bg-amber-400 text-black rounded-lg font-semibold text-sm hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Jawab
              </button>
            </div>
            
            <div v-else class="text-center py-4">
              <p class="text-emerald-300 font-semibold mb-2">🎉 Semua quiz telah dijawab!</p>
              <button
                @click="resetQuiz"
                class="px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors"
              >
                Ulangi Quiz
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="bg-white border border-gray-200 rounded-xl p-5">
            <h3 class="font-bold text-gray-900 mb-4 text-sm">Informasi Kunjungan</h3>
            <div class="space-y-3 text-sm">
              <div class="flex items-start gap-2">
                <span class="text-gray-400">📍</span>
                <span class="text-gray-600">{{ museum.address }}</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-gray-400">🕐</span>
                <span class="text-gray-600">{{ museum.openingHours }}</span>
              </div>
              <div v-if="museum.ticketPrice" class="flex items-start gap-2">
                <span class="text-gray-400">💰</span>
                <span class="text-gray-600">{{ museum.ticketPrice }}</span>
              </div>
              <div v-if="museum.phone" class="flex items-start gap-2">
                <span class="text-gray-400">📞</span>
                <span class="text-gray-600">{{ museum.phone }}</span>
              </div>
            </div>
          </div>

          <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <h3 class="font-bold text-emerald-900 mb-2 text-sm">Tips Berkunjung</h3>
            <ul class="text-sm text-emerald-800 space-y-1.5">
              <li class="flex items-start gap-2">
                <span class="text-emerald-600">•</span> Datang pagi hari untuk pengalaman terbaik
              </li>
              <li class="flex items-start gap-2">
                <span class="text-emerald-600">•</span> Siapkan kamera untuk dokumentasi
              </li>
              <li class="flex items-start gap-2">
                <span class="text-emerald-600">•</span> Ikuti tur berpemandu
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">Koleksi ({{ artifacts.length }})</h2>
        
        <div v-if="artifacts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="artifact in artifacts"
            :key="artifact.id"
            class="group relative flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-300 transition-all cursor-pointer"
            :class="{
              'hover:shadow-md': userStore.currentXP >= artifact.requiredXP,
              'opacity-60': userStore.currentXP < artifact.requiredXP
            }"
            @click="handleArtifactClick(artifact.id)"
          >
            <div
              v-if="userStore.currentXP < artifact.requiredXP"
              class="absolute inset-0 bg-gray-900 bg-opacity-30 rounded-xl flex items-center justify-center z-10"
            >
              <div class="bg-white px-3 py-1.5 rounded-lg shadow-lg">
                <span class="text-xs font-bold text-gray-900">{{ artifact.requiredXP }} XP</span>
              </div>
            </div>

            <div class="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-100">
              <img :src="artifact.image" :alt="artifact.name" class="w-full h-full object-cover" />
            </div>
            <div class="flex flex-col flex-1 min-w-0">
              <h3 class="font-semibold text-sm text-gray-900 leading-tight line-clamp-1">
                {{ artifact.name }}
              </h3>
              <span class="text-[10px] text-gray-500 uppercase">{{ artifact.type }}</span>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <div class="text-4xl mb-3">🏛️</div>
          <p class="text-gray-500">Museum ini sedang dalam pengembangan koleksi.</p>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">Ulasan ({{ comments.length }})</h2>
        
        <div class="space-y-4 mb-6">
          <div v-for="comment in comments" :key="comment.id" class="border-b border-gray-100 pb-4 last:border-0">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-full bg-[#2C5F4F] text-white flex items-center justify-center font-bold shrink-0">
                {{ comment.avatar }}
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="font-semibold text-gray-900">{{ comment.user }}</span>
                    <span class="text-xs text-gray-400 ml-2">{{ comment.date }}</span>
                  </div>
                  <span class="text-amber-400 text-sm">{{ renderStars(comment.rating) }}</span>
                </div>
                <p class="text-gray-600 text-sm mt-1">{{ comment.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <h3 class="font-semibold text-gray-900 mb-3">Tulis Ulasan</h3>
          <div class="mb-3">
            <label class="text-sm text-gray-600 mb-1 block">Rating</label>
            <div class="flex gap-1">
              <button 
                v-for="star in 5" 
                :key="star"
                @click="newRating = star"
                class="text-2xl transition-colors"
                :class="star <= newRating ? 'text-amber-400' : 'text-gray-300'"
              >
                ★
              </button>
            </div>
          </div>
          <textarea
            v-model="newComment"
            placeholder="Tulis pengalaman kunjungan Anda..."
            class="w-full h-20 p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F4F] resize-none"
          ></textarea>
          <button
            @click="submitComment"
            :disabled="isSubmittingComment || newComment.trim().length < 10"
            class="mt-3 px-6 py-2.5 bg-[#2C5F4F] text-white rounded-lg hover:bg-[#3A7763] transition-colors disabled:opacity-50 font-semibold text-sm"
          >
            {{ isSubmittingComment ? 'Mengirim...' : 'Kirim Ulasan' }}
          </button>
        </div>
      </div>
    </div>

    <div 
      v-if="showChat"
      class="fixed bottom-20 right-4 w-80 md:w-96 h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50"
    >
      <div class="bg-[#2C5F4F] text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🤖</span>
          <div>
            <p class="font-bold text-sm">AI Assistant</p>
            <p class="text-xs text-white/70">{{ museum.name }}</p>
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
            placeholder="Tanya tentang museum..."
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
