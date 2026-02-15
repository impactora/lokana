<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore, vouchersData } from '~/stores/user';

const userStore = useUserStore();

const canRedeem = (pointsRequired: number) => {
  return userStore.points >= pointsRequired;
};

const handleRedeem = (voucherId: string, pointsRequired: number) => {
  if (!canRedeem(pointsRequired)) {
    alert(`Points tidak mencukupi! Anda butuh ${pointsRequired} points untuk menukar voucher ini.`);
    return;
  }

  if (userStore.isVoucherRedeemed(voucherId)) {
    alert('Voucher ini sudah Anda tukar!');
    return;
  }

  const confirm = window.confirm(`Tukar ${pointsRequired} points dengan voucher ini?`);
  if (confirm) {
    userStore.spendPoints(pointsRequired);
    userStore.redeemVoucher(voucherId);
    alert('Voucher berhasil ditukar! Cek profil Anda untuk melihat voucher.');
  }
};
</script>

<template>
  <div class="h-full overflow-y-auto p-4 md:p-6">
    <div class="max-w-5xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-600 hover:text-[#2C5F4F] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Kembali ke Peta
        </NuxtLink>
      </div>

      <div class="bg-gradient-to-r from-[#2C5F4F] to-[#3A7763] rounded-2xl p-6 text-white">
        <h1 class="text-3xl font-bold mb-2">🎁 Toko Voucher</h1>
        <p class="text-white/80">Tukar points Anda dengan voucher menarik dari partner kami!</p>
        <div class="mt-4 flex items-center gap-4">
          <div class="bg-white/20 px-4 py-2 rounded-lg">
            <span class="text-sm">Points Anda:</span>
            <span class="text-2xl font-bold ml-2">{{ userStore.points }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="voucher in vouchersData"
          :key="voucher.id"
          class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div class="aspect-video relative bg-gray-100">
            <img :src="voucher.image" :alt="voucher.name" class="w-full h-full object-cover" />
            <div v-if="userStore.isVoucherRedeemed(voucher.id)" class="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span class="bg-emerald-500 text-white px-4 py-2 rounded-full font-bold">✓ Sudah Ditukar</span>
            </div>
          </div>
          
          <div class="p-4 space-y-3">
            <div>
              <h3 class="font-bold text-gray-900 line-clamp-2">{{ voucher.name }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ voucher.partner }}</p>
            </div>
            
            <p class="text-sm text-gray-600 line-clamp-2">{{ voucher.description }}</p>
            
            <div class="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <span class="text-xs text-gray-500">Harga:</span>
                <p class="text-lg font-bold text-[#2C5F4F]">{{ voucher.pointsRequired }} Points</p>
              </div>
              <button
                @click="handleRedeem(voucher.id, voucher.pointsRequired)"
                :disabled="userStore.isVoucherRedeemed(voucher.id)"
                class="px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                :class="userStore.isVoucherRedeemed(voucher.id) 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : canRedeem(voucher.pointsRequired)
                    ? 'bg-[#2C5F4F] text-white hover:bg-[#3A7763]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
              >
                {{ userStore.isVoucherRedeemed(voucher.id) ? 'Ditukar' : 'Tukar' }}
              </button>
            </div>
            
            <p class="text-xs text-gray-400">Berlaku hingga: {{ voucher.validUntil }}</p>
          </div>
        </div>
      </div>

      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h3 class="font-bold text-amber-800 mb-2">ℹ️ Cara Menukar</h3>
        <ul class="text-sm text-amber-700 space-y-1">
          <li>1. Kumpulkan points dengan naik level (setiap 100XP = 100 points)</li>
          <li>2. Atau scan QR code di museum partner untuk mendapat 100XP</li>
          <li>3. Pilih voucher yang ingin ditukar</li>
          <li>4. Klik tombol "Tukar" untuk menggunakan points</li>
          <li>5. Tunjukkan voucher ke mitra kami untuk menggunakan</li>
        </ul>
      </div>
    </div>
  </div>
</template>
