import { defineStore } from 'pinia';

// User progress and gamification state store
export const useUserStore = defineStore('user', {
  state: () => ({
    username: 'Explorer',
    level: 1,
    currentXP: 0,
    maxXP: 100, // XP needed for next level
    coins: 0,
    unlockedLocations: [] as string[], // Museum names that have been visited
    collectedBadges: [] as string[],
    visitedArtifacts: [] as number[], // Artifact IDs that have been viewed
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
      this.coins += 50; // Bonus coins on level up
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

    // Spend coins on rewards
    spendCoins(amount: number): boolean {
      if (this.coins >= amount) {
        this.coins -= amount;
        return true;
      }
      return false;
    },

    // Reset progress (for demo purposes)
    resetProgress() {
      this.$reset();
    },
  },

  persist: true, // Persist state to localStorage
});
