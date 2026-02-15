<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { museumsData } from '~/assets/data/artifactsData';
import { useUserStore } from '~/stores/user';
import { QrCode, CheckCircle, XCircle, PartyPopper, ArrowLeft, Smartphone } from 'lucide-vue-next';

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

  // Success - give XP reward (will level up and give 100 coins)
  userStore.scanMuseumQR(museumId);
  scanResult.value = {
    success: true,
    message: `Selamat! Anda mendapat +100 XP dari Museum ${museum.name}! (Naik level dapat 100 coins)`,
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
  <div class="h-full overflow-y-auto p-4 md:p-6 pb-20">
    <div class="max-w-lg mx-auto space-y-6">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-600 hover:text-[#6B4423] transition-colors">
        <ArrowLeft class="w-5 h-5" />
        Kembali ke Peta
      </NuxtLink>

      <div class="bg-gradient-to-r from-[#6B4423] to-[#8B6F47] rounded-2xl p-6 text-white text-center">
        <div class="flex items-center justify-center mb-4">
          <Smartphone class="w-16 h-16" />
        </div>
        <h1 class="text-2xl font-bold mb-2 font-['Libre_Baskerville']">Scan QR Museum</h1>
        <p class="text-white/80">Pindai QR code di museum partner untuk mendapat 100 XP!</p>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-6">
        <div class="text-center mb-6">
          <div class="w-20 h-20 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
            <QrCode class="w-10 h-10 text-emerald-600" />
          </div>
          <h2 class="text-lg font-bold text-gray-900 mb-2">Cara Menggunakan</h2>
          <ol class="text-sm text-gray-600 text-left space-y-2 max-w-xs mx-auto">
            <li class="flex gap-2">
              <span class="font-bold text-[#6B4423]">1.</span>
              Kunjungi museum partner LOKANA
            </li>
            <li class="flex gap-2">
              <span class="font-bold text-[#6B4423]">2.</span>
              Cari QR code di lokasi museum
            </li>
            <li class="flex gap-2">
              <span class="font-bold text-[#6B4423]">3.</span>
              Pindai atau masukkan kode manual
            </li>
            <li class="flex gap-2">
              <span class="font-bold text-[#6B4423]">4.</span>
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
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4423] focus:border-transparent text-center font-mono"
              @keyup.enter="handleManualScan"
            />
          </div>
          
          <button
            @click="handleManualScan"
            class="w-full py-3 bg-[#6B4423] text-white rounded-lg font-semibold hover:bg-[#8B6F47] transition-colors"
          >
            Klaim XP
          </button>
        </div>
      </div>

      <div v-if="scanResult" class="bg-white border-2 rounded-2xl p-6" :class="scanResult.success ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50'">
        <div class="text-center">
          <div class="flex items-center justify-center mb-3">
            <PartyPopper v-if="scanResult.success" class="w-12 h-12 text-emerald-600" />
            <XCircle v-else class="w-12 h-12 text-red-600" />
          </div>
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
              <CheckCircle 
                class="w-4 h-4" 
                :class="userStore.hasScannedMuseum(museum.id) ? 'text-emerald-500' : 'text-gray-300'"
              />
              <span class="text-gray-600">{{ museum.name }}</span>
            </div>
            <span v-if="userStore.hasScannedMuseum(museum.id)" class="text-emerald-600 text-xs font-medium flex items-center gap-1">
              <CheckCircle class="w-3 h-3" />
              Sudah Dipindai
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
