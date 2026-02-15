<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { museumsData } from '~/assets/data/artifactsData';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

const scannedCode = ref('');
const scanResult = ref<{ success: boolean; message: string; museum?: typeof museumsData[0] } | null>(null);
const isScanning = ref(false);

const handleManualScan = () => {
  if (!scannedCode.value.trim()) {
    alert('Masukkan kode museum terlebih dahulu!');
    return;
  }

  const code = scannedCode.value.trim().toUpperCase();
  
  // Parse museum ID from QR code (format: LOKANA-MUSEUM-{id})
  const match = code.match(/LOKANA-MUSEUM-(\d+)/);
  
  if (!match) {
    scanResult.value = {
      success: false,
      message: 'Kode QR tidak valid! Pastikan Anda memindai QR code LOKANA yang benar.'
    };
    return;
  }

  const museumId = parseInt(match[1]);
  const museum = museumsData.find(m => m.id === museumId);

  if (!museum) {
    scanResult.value = {
      success: false,
      message: 'Museum tidak ditemukan! Kode QR mungkin sudah kedaluwarsa.'
    };
    return;
  }

  // Check if already scanned
  if (userStore.hasScannedMuseum(museumId)) {
    scanResult.value = {
      success: false,
      message: `Anda sudah memindai QR code Museum ${museum.name} sebelumnya. Setiap museum hanya bisa dipindai sekali!`
    };
    return;
  }

  // Success - give XP reward
  userStore.scanMuseumQR(museumId);
  scanResult.value = {
    success: true,
    message: `Selamat! Anda mendapat +100 XP dari Museum ${museum.name}!`,
    museum: museum
  };
  
  scannedCode.value = '';
};

const resetScan = () => {
  scannedCode.value = '';
  scanResult.value = null;
};
</script>

<template>
  <div class="h-full overflow-y-auto p-4 md:p-6">
    <div class="max-w-lg mx-auto space-y-6">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-600 hover:text-[#2C5F4F] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        Kembali ke Peta
      </NuxtLink>

      <div class="bg-gradient-to-r from-[#2C5F4F] to-[#3A7763] rounded-2xl p-6 text-white text-center">
        <div class="text-5xl mb-4">📱</div>
        <h1 class="text-2xl font-bold mb-2">Scan QR Museum</h1>
        <p class="text-white/80">Pindai QR code di museum partner untuk mendapat 100 XP!</p>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-6">
        <div class="text-center mb-6">
          <div class="w-20 h-20 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
              <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
              <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
              <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
              <rect x="7" y="7" width="10" height="10" rx="1"/>
            </svg>
          </div>
          <h2 class="text-lg font-bold text-gray-900 mb-2">Cara Menggunakan</h2>
          <ol class="text-sm text-gray-600 text-left space-y-2 max-w-xs mx-auto">
            <li class="flex gap-2">
              <span class="font-bold text-[#2C5F4F]">1.</span>
              Kunjungi museum partner LOKANA
            </li>
            <li class="flex gap-2">
              <span class="font-bold text-[#2C5F4F]">2.</span>
              Cari QR code di lokasi museum
            </li>
            <li class="flex gap-2">
              <span class="font-bold text-[#2C5F4F]">3.</span>
              Pindai atau masukkan kode manual
            </li>
            <li class="flex gap-2">
              <span class="font-bold text-[#2C5F4F]">4.</span>
              Dapatkan 100 XP langsung!
            </li>
          </ol>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Masukkan Kode Manual
            </label>
            <input
              v-model="scannedCode"
              type="text"
              placeholder="Contoh: LOKANA-MUSEUM-1"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C5F4F] focus:border-transparent text-center font-mono"
              @keyup.enter="handleManualScan"
            />
          </div>
          
          <button
            @click="handleManualScan"
            class="w-full py-3 bg-[#2C5F4F] text-white rounded-lg font-semibold hover:bg-[#3A7763] transition-colors"
          >
            Klaim XP
          </button>
        </div>
      </div>

      <div v-if="scanResult" class="bg-white border-2 rounded-2xl p-6" :class="scanResult.success ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50'">
        <div class="text-center">
          <div class="text-4xl mb-3">{{ scanResult.success ? '🎉' : '❌' }}</div>
          <h3 class="font-bold text-lg mb-2" :class="scanResult.success ? 'text-emerald-800' : 'text-red-800'">
            {{ scanResult.success ? 'Berhasil!' : 'Gagal' }}
          </h3>
          <p class="text-sm mb-4" :class="scanResult.success ? 'text-emerald-700' : 'text-red-700'">
            {{ scanResult.message }}
          </p>
          <button
            @click="resetScan"
            class="px-6 py-2 rounded-lg font-medium text-sm transition-colors"
            :class="scanResult.success 
              ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
              : 'bg-red-500 text-white hover:bg-red-600'"
          >
            Scan Lagi
          </button>
        </div>
      </div>

      <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h3 class="font-bold text-gray-900 mb-3 text-sm">Museum Partner</h3>
        <div class="space-y-2">
          <div v-for="museum in museumsData" :key="museum.id" class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full" :class="userStore.hasScannedMuseum(museum.id) ? 'bg-emerald-500' : 'bg-gray-300'"></span>
              <span class="text-gray-600">{{ museum.name }}</span>
            </div>
            <span v-if="userStore.hasScannedMuseum(museum.id)" class="text-emerald-600 text-xs font-medium">
              ✓ Sudah Dipindai
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
