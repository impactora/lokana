import { defineStore } from 'pinia';

export interface Voucher {
  id: string;
  name: string;
  description: string;
  image: string;
  coinsRequired: number;
  partner: string;
  validUntil: string;
}

export const vouchersData: Voucher[] = [
  { id: 'v1', name: 'Tiket Gratis Anak Museum Sonobudoyo', description: '1 tiket gratis untuk anak-anak di Museum Sonobudoyo', image: 'https://placehold.co/200x200/8D6E63/FFF?text=Museum', coinsRequired: 100, partner: 'Museum Sonobudoyo', validUntil: '2026-12-31' },
  { id: 'v2', name: 'Voucher Makanan Rp50.000', description: 'Voucher makanan Rp50.000 di sekitar museums Yogyakarta', image: 'https://placehold.co/200x200/4CAF50/FFF?text=Food', coinsRequired: 150, partner: 'UMKM Lokal', validUntil: '2026-12-31' },
  { id: 'v3', name: 'Diskon 15% Kopi Lokal', description: 'Diskon 15% untuk kopi khas Yogyakarta', image: 'https://placehold.co/200x200/795548/FFF?text=Kopi', coinsRequired: 75, partner: 'Kopi Lokal Yogyakarta', validUntil: '2026-12-31' },
  { id: 'v4', name: 'Gratis Masuk Vredeburg', description: 'Tiket masuk gratis Museum Benteng Vredeburg', image: 'https://placehold.co/200x200/5D4037/FFF?text=Vredeburg', coinsRequired: 120, partner: 'Museum Benteng Vredeburg', validUntil: '2026-12-31' },
  { id: 'v5', name: 'Workshop Batik Gratis', description: '1x gratis workshop batik di Museum Ullen Sentalu', image: 'https://placehold.co/200x200/FFAB91/000?text=Workshop', coinsRequired: 250, partner: 'Museum Ullen Sentalu', validUntil: '2026-12-31' },
  { id: 'v6', name: 'Souvenir Keramik 30% Off', description: 'Diskon 30% untuk souvenir keramik asli Yogyakarta', image: 'https://placehold.co/200x200/1565C0/FFF?text=Keramik', coinsRequired: 180, partner: 'UMKM Keramik Yogyakarta', validUntil: '2026-12-31' },
  { id: 'v7', name: 'Tea Time Set', description: 'Tea time set gratis di cafe museum terdekat', image: 'https://placehold.co/200x200/8BC34A/FFF?text=Tea', coinsRequired: 50, partner: 'Museum Cafe Partners', validUntil: '2026-12-31' },
  { id: 'v8', name: 'Diskon 25% Museum Ullen Sentalu', description: 'Diskon 25% untuk tiket masuk Museum Ullen Sentalu', image: 'https://placehold.co/200x200/3A7763/FFF?text=Ullen', coinsRequired: 200, partner: 'Museum Ullen Sentalu', validUntil: '2026-12-31' },
];

// User progress and gamification state store
export const useUserStore = defineStore('user', {
  state: () => ({
    username: 'Explorer',
    level: 1,
    currentXP: 0,
    maxXP: 100,
    coins: 0,
    unlockedLocations: [] as string[],
    collectedBadges: [] as string[],
    visitedArtifacts: [] as number[],
    redeemedVouchers: [] as string[],
    quizCompletedMuseums: {} as Record<number, number>,
    scannedMuseums: [] as number[],
  }),

  getters: {
    // Calculate rank title based on level
    rankTitle: (state) => {
      if (state.level >= 10) return 'Kuncen Digital';
      if (state.level >= 5) return 'Penjelajah';
      return 'Pelancong';
    },

    // XP progress percentage for UI
    xpProgress: (state) => {
      return Math.floor((state.currentXP / state.maxXP) * 100);
    },

    // Total number of locations unlocked
    totalUnlockedLocations: (state) => state.unlockedLocations.length,
  },

  actions: {
    // Award XP and check for level up
    gainXP(amount: number) {
      this.currentXP += amount;
      
      // Check if leveled up
      while (this.currentXP >= this.maxXP) {
        this.levelUp();
      }
    },

    // Level up and increase XP requirement
    levelUp() {
      this.level++;
      this.currentXP -= this.maxXP;
      this.maxXP = Math.floor(this.maxXP * 1.5); // Exponential XP growth
      this.coins += 100; // 100 coins per level up
      
      // Award badge based on level
      const badges: string[] = ['Penjelajah Pemula', 'Kolektor Budaya', 'Sejarah Lover', 'Ahli Museum', 'Master Penjaga Budaya', 'Kuncen Digital', 'Sang Legend', 'Pakar Warisan', 'Pembawa Traditions', 'Sang Pahlawannya'];
      const badgeName = badges[this.level - 1];
      if (badgeName) {
        this.collectBadge(badgeName);
      }
    },

    // Award coins for completing challenges
    gainCoins(amount: number) {
      this.coins += amount;
    },

    // Unlock a museum location (fog of war mechanic)
    unlockLocation(museumName: string) {
      if (!this.unlockedLocations.includes(museumName)) {
        this.unlockedLocations.push(museumName);
        this.gainXP(25); // Reward for discovering new location
      }
    },

    // Mark artifact as visited
    visitArtifact(artifactId: number) {
      if (!this.visitedArtifacts.includes(artifactId)) {
        this.visitedArtifacts.push(artifactId);
        this.gainXP(10); // Small XP for viewing artifact
      }
    },

    // Add a badge to collection
    collectBadge(badgeName: string) {
      if (!this.collectedBadges.includes(badgeName)) {
        this.collectedBadges.push(badgeName);
        this.gainCoins(100);
      }
    },

    // Spend coins on vouchers
    spendCoins(amount: number): boolean {
      if (this.coins >= amount) {
        this.coins -= amount;
        return true;
      }
      return false;
    },

    // Scan QR code at museum - get 100XP reward (once per museum)
    scanMuseumQR(museumId: number): boolean {
      if (this.scannedMuseums.includes(museumId)) {
        return false; // Already scanned
      }
      this.scannedMuseums.push(museumId);
      this.gainXP(100); // Award 100 XP
      return true;
    },

    // Check if museum QR has been scanned
    hasScannedMuseum(museumId: number): boolean {
      return this.scannedMuseums.includes(museumId);
    },

    // Check if user can do quiz for a specific museum (once per week per museum)
    canDoQuiz(museumId: number): boolean {
      const lastQuiz = this.quizCompletedMuseums[museumId];
      if (!lastQuiz) return true;
      const weekInMs = 7 * 24 * 60 * 60 * 1000;
      return Date.now() - lastQuiz >= weekInMs;
    },

    // Get time until next quiz available for a museum
    getQuizCooldown(museumId: number): string {
      const lastQuiz = this.quizCompletedMuseums[museumId];
      if (!lastQuiz) return '';
      const weekInMs = 7 * 24 * 60 * 60 * 1000;
      const timeSince = Date.now() - lastQuiz;
      const remaining = weekInMs - timeSince;
      
      if (remaining <= 0) return '';
      
      const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
      const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      
      if (days > 0) return `${days} hari ${hours} jam`;
      return `${hours} jam`;
    },

    // Record quiz completion for a specific museum
    completeQuiz(museumId: number) {
      this.quizCompletedMuseums[museumId] = Date.now();
    },

    // Redeem a voucher
    redeemVoucher(voucherId: string): boolean {
      if (this.redeemedVouchers.includes(voucherId)) return false;
      this.redeemedVouchers.push(voucherId);
      return true;
    },

    // Check if voucher is redeemed
    isVoucherRedeemed(voucherId: string): boolean {
      return this.redeemedVouchers.includes(voucherId);
    },

    // Reset progress (for demo purposes)
    resetProgress() {
      this.$reset();
    },
  },

  persist: true, // Persist state to localStorage
});
