<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '~/stores/user';
import { Award, MapPin, Coins, TrendingUp, CheckCircle, Gift, Medal, Trophy, Target, BookOpen, Crown, Gem } from 'lucide-vue-next';
import { museumsData } from '~/assets/data/artifactsData';
import artifactsData from '~/assets/data/artifactsData';

const userStore = useUserStore();

const visitedMuseums = computed(() => {
  return museumsData.filter(m => userStore.scannedMuseums.includes(m.id));
});

const discoveryPercentage = computed(() => {
  return Math.floor((userStore.scannedMuseums.length / museumsData.length) * 100);
});

const nextLevelProgress = computed(() => {
  return {
    current: userStore.currentXP,
    max: userStore.maxXP,
    percentage: userStore.xpProgress,
    remaining: userStore.maxXP - userStore.currentXP
  };
});

const achievements = computed(() => {
  const data = [];
  
  // Level milestones
  if (userStore.level >= 5) {
    data.push({
      id: 'level-5',
      icon: Medal,
      title: 'Explorer Level 5',
      description: 'Mencapai level 5',
      unlocked: true
    });
  }
  
  if (userStore.level >= 10) {
    data.push({
      id: 'level-10',
      icon: Trophy,
      title: 'Master Level 10',
      description: 'Mencapai level 10',
      unlocked: true
    });
  }
  
  // Museum discoveries
  if (userStore.scannedMuseums.length >= 3) {
    data.push({
      id: 'museum-3',
      icon: MapPin,
      title: 'Museum Explorer',
      description: 'Mengunjungi 3 museum',
      unlocked: true
    });
  }
  
  if (userStore.scannedMuseums.length >= 5) {
    data.push({
      id: 'museum-5',
      icon: Target,
      title: 'Heritage Hunter',
      description: 'Mengunjungi 5 museum',
      unlocked: true
    });
  }
  
  // Artifact exploration
  if (userStore.visitedArtifacts.length >= 10) {
    data.push({
      id: 'artifact-10',
      icon: BookOpen,
      title: 'Artifact Collector',
      description: 'Menjelajahi 10 artefak',
      unlocked: true
    });
  }
  
  // Locked achievements (upcoming)
  const lockedAchievements = [
    {
      id: 'complete-all',
      icon: Crown,
      title: 'Heritage Master',
      description: 'Mengunjungi semua museum Jogja',
      unlocked: false,
      requirement: `${userStore.scannedMuseums.length}/${museumsData.length} museum`
    },
    {
      id: 'artifact-25',
      icon: Gem,
      title: 'Artifact Enthusiast',
      description: 'Menjelajahi 25 artefak',
      unlocked: false,
      requirement: `${userStore.visitedArtifacts.length}/25 artefak`
    }
  ];
  
  return [...data, ...lockedAchievements];
});
</script>

<template>
  <div class="h-full overflow-y-auto pb-20 md:pb-6">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Profile Header -->
      <div class="bg-gradient-to-r from-[#6B4423] to-[#8B6F47] rounded-xl p-6 text-white">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span class="text-3xl font-bold">{{ userStore.level }}</span>
          </div>
          <div class="flex-1">
            <h1 class="text-2xl font-bold font-['Libre_Baskerville']">{{ userStore.username }}</h1>
            <p class="text-white/80">{{ userStore.rankTitle }}</p>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold">{{ userStore.level }}</div>
            <div class="text-xs text-white/70">Level</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ userStore.coins }}</div>
            <div class="text-xs text-white/70">Coins</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ userStore.scannedMuseums.length }}</div>
            <div class="text-xs text-white/70">Museum</div>
          </div>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="bg-white border border-[#6B4423]/10 rounded-xl p-6 space-y-4">
        <h2 class="text-lg font-bold text-[#2D2416] font-['Libre_Baskerville']">Progress Kamu</h2>
        
        <!-- Level Progress -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-[#6B5D4F]">Level {{ userStore.level }} → {{ userStore.level + 1 }}</span>
            <span class="text-sm font-bold text-[#6B4423]">{{ nextLevelProgress.remaining }} XP lagi</span>
          </div>
          <div class="h-3 bg-[#6B4423]/10 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-[#6B4423] to-[#8B6F47] transition-all duration-500"
              :style="{ width: `${nextLevelProgress.percentage}%` }"
            />
          </div>
        </div>

        <!-- Discovery Progress -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-[#6B5D4F]">Museum Ditemukan</span>
            <span class="text-sm font-bold text-[#4A7C59]">{{ discoveryPercentage }}%</span>
          </div>
          <div class="h-3 bg-[#4A7C59]/10 rounded-full overflow-hidden">
            <div 
              class="h-full bg-[#4A7C59] transition-all duration-500"
              :style="{ width: `${discoveryPercentage}%` }"
            />
          </div>
          <p class="text-xs text-[#6B5D4F] mt-1">
            {{ userStore.scannedMuseums.length }} dari {{ museumsData.length }} museum
          </p>
        </div>
      </div>

      <!-- Achievements -->
      <div class="bg-white border border-[#6B4423]/10 rounded-xl p-6">
        <div class="flex items-center gap-2 mb-4">
          <Award class="w-5 h-5 text-[#6B4423]" />
          <h2 class="text-lg font-bold text-[#2D2416] font-['Libre_Baskerville']">Pencapaian</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            v-for="achievement in achievements"
            :key="achievement.id"
            class="flex items-center gap-3 p-3 rounded-lg border transition-all"
            :class="achievement.unlocked 
              ? 'bg-[#D4A574]/10 border-[#D4A574]/30' 
              : 'bg-[#6B4423]/5 border-[#6B4423]/10 opacity-60'"
          >
            <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              :class="achievement.unlocked ? 'bg-[#D4A574]/20' : 'bg-[#6B4423]/10'"
            >
              <component :is="achievement.icon" 
                class="w-6 h-6" 
                :class="achievement.unlocked ? 'text-[#8B6F47]' : 'text-[#6B4423]/40'"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-sm text-[#2D2416] truncate">
                {{ achievement.title }}
              </h3>
              <p class="text-xs text-[#6B5D4F]">{{ achievement.description }}</p>
              <p v-if="!achievement.unlocked && 'requirement' in achievement" class="text-xs text-[#6B4423] font-medium mt-1">
                {{ achievement.requirement }}
              </p>
            </div>
            <CheckCircle 
              v-if="achievement.unlocked"
              class="w-5 h-5 text-[#4A7C59] shrink-0" 
            />
          </div>
        </div>
      </div>

      <!-- Visited Museums -->
      <div v-if="visitedMuseums.length > 0" class="bg-white border border-[#6B4423]/10 rounded-xl p-6">
        <div class="flex items-center gap-2 mb-4">
          <MapPin class="w-5 h-5 text-[#6B4423]" />
          <h2 class="text-lg font-bold text-[#2D2416] font-['Libre_Baskerville']">Museum yang Dikunjungi</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NuxtLink
            v-for="museum in visitedMuseums"
            :key="museum.id"
            :to="`/museum/${museum.id}`"
            class="flex items-center gap-3 p-3 bg-[#F5F1EA] rounded-lg hover:bg-[#6B4423]/5 transition-all"
          >
            <div class="w-12 h-12 rounded-lg overflow-hidden bg-[#6B4423]/10">
              <img :src="museum.image" :alt="museum.name" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-sm text-[#2D2416] truncate">{{ museum.name }}</h3>
              <p class="text-xs text-[#6B5D4F]">{{ museum.province }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Redeemed Vouchers -->
      <div v-if="userStore.redeemedVouchers.length > 0" class="bg-white border border-[#6B4423]/10 rounded-xl p-6">
        <div class="flex items-center gap-2 mb-4">
          <Gift class="w-5 h-5 text-[#6B4423]" />
          <h2 class="text-lg font-bold text-[#2D2416] font-['Libre_Baskerville']">Voucher Saya</h2>
        </div>

        <div class="space-y-2">
          <div
            v-for="voucherId in userStore.redeemedVouchers"
            :key="voucherId"
            class="flex items-center justify-between p-3 bg-[#4A7C59]/5 rounded-lg border border-[#4A7C59]/20"
          >
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-[#4A7C59]" />
              <span class="text-sm font-medium text-[#2D2416]">Voucher #{{ voucherId }}</span>
            </div>
            <span class="text-xs text-[#6B5D4F]">Aktif</span>
          </div>
        </div>
      </div>

      <!-- Stats Summary -->
      <div class="bg-gradient-to-br from-[#6B4423]/5 to-[#D4A574]/5 border border-[#6B4423]/10 rounded-xl p-6">
        <h2 class="text-lg font-bold text-[#2D2416] mb-4 font-['Libre_Baskerville']">Ringkasan</h2>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div class="flex justify-between">
            <span class="text-[#6B5D4F]">Total XP:</span>
            <span class="font-bold text-[#2D2416]">{{ userStore.currentXP + ((userStore.level - 1) * 100) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#6B5D4F]">Artefak Dilihat:</span>
            <span class="font-bold text-[#2D2416]">{{ userStore.visitedArtifacts.length }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#6B5D4F]">Voucher Ditukar:</span>
            <span class="font-bold text-[#2D2416]">{{ userStore.redeemedVouchers.length }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#6B5D4F]">Badge Terkumpul:</span>
            <span class="font-bold text-[#2D2416]">{{ userStore.collectedBadges.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
