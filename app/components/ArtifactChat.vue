<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '~/stores/user';

const props = defineProps<{
  artifactId: number;
  artifactName: string;
}>();

const userStore = useUserStore();
const messages = ref<Array<{ role: string; content: string }>>([
  { 
    role: 'assistant', 
    content: `Halo! Aku ${props.artifactName}. Mau tanya apa tentang aku?` 
  }
]);
const userMessage = ref('');
const isLoading = ref(false);

const sendMessage = async () => {
  if (!userMessage.value.trim() || isLoading.value) return;

  const msg = userMessage.value;
  messages.value.push({ role: 'user', content: msg });
  userMessage.value = '';
  isLoading.value = true;

  try {
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        artifactId: props.artifactId,
        message: msg,
        conversationHistory: messages.value,
      },
    });

    messages.value.push({ role: 'assistant', content: response.message });
    
    // Award XP for using AI chat
    userStore.gainXP(15);
  } catch (error) {
    console.error('Chat error:', error);
    messages.value.push({ 
      role: 'assistant', 
      content: 'Maaf, ada error. Coba lagi ya!' 
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col h-full max-h-[500px] bg-white rounded-xl border border-gray-200 shadow-sm">
    <!-- Chat Header -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-[#2C5F4F] to-[#3A7763] rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white">
            <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>
            <path d="M12 14v.01"/>
            <path d="M12 10a2 2 0 0 0-2-2"/>
          </svg>
        </div>
        <div>
          <h3 class="font-bold text-sm text-gray-900">Tanya {{ artifactName }}</h3>
          <p class="text-xs text-gray-500">Powered by AI</p>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3">
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        class="flex"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[80%] px-4 py-2 rounded-lg text-sm"
          :class="
            msg.role === 'user'
              ? 'bg-[#2C5F4F] text-white'
              : 'bg-gray-100 text-gray-900'
          "
        >
          {{ msg.content }}
        </div>
      </div>

      <!-- Loading indicator -->
      <div v-if="isLoading" class="flex justify-start">
        <div class="bg-gray-100 px-4 py-2 rounded-lg">
          <div class="flex gap-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input -->
    <form @submit.prevent="sendMessage" class="p-4 border-t border-gray-200">
      <div class="flex gap-2">
        <input
          v-model="userMessage"
          type="text"
          placeholder="Ketik pertanyaan..."
          class="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F4F] focus:border-transparent"
          :disabled="isLoading"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-[#2C5F4F] text-white rounded-lg hover:bg-[#3A7763] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isLoading || !userMessage.trim()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" x2="11" y1="2" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>
