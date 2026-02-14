<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

// Dummy leaderboard data mixed with real user
const leaderboardData = ref([
  { 
    rank: 1, 
    name: 'Sarah Kusuma', 
    xp: 2850, 
    level: 15, 
    badge: 'Master Curator', 
    avatar: '👩‍🎓',
    specialty: 'Textile Heritage',
    completedChallenges: 28
  },
  { 
    rank: 2, 
    name: 'Rudi Hartono', 
    xp: 2320, 
    level: 12, 
    badge: 'Weaponry Expert', 
    avatar: '👨‍🏫',
    specialty: 'Traditional Weapons',
    completedChallenges: 22
  },
  { 
    rank: 3, 
    name: 'Dewi Lestari', 
    xp: 1890, 
    level: 10, 
    badge: 'Kuncen Digital', 
    avatar: '👩‍💼',
    specialty: 'Javanese Art',
    completedChallenges: 18
  },
  { 
    rank: 4, 
    name: userStore.username, 
    xp: userStore.currentXP, 
    level: userStore.level, 
    badge: userStore.rankTitle, 
    avatar: '🧑',
    specialty: 'Aspiring Curator',
    completedChallenges: userStore.visitedArtifacts.length,
    isCurrentUser: true
  },
  { 
    rank: 5, 
    name: 'Andi Setiawan', 
    xp: 1420, 
    level: 8, 
    badge: 'Penjelajah', 
    avatar: '👨‍🎨',
    specialty: 'Colonial Heritage',
    completedChallenges: 14
  },
  { 
    rank: 6, 
    name: 'Maya Putri', 
    xp: 1180, 
    level: 7, 
    badge: 'Penjelajah', 
    avatar: '👩‍🔬',
    specialty: 'Music Archivist',
    completedChallenges: 11
  },
  { 
    rank: 7, 
    name: 'Budi Santoso', 
    xp: 950, 
    level: 6, 
    badge: 'Penjelajah', 
    avatar: '👨‍💻',
    specialty: 'Digital Heritage',
    completedChallenges: 9
  },
  { 
    rank: 8, 
    name: 'Siti Rahayu', 
    xp: 720, 
    level: 5, 
    badge: 'Penjelajah', 
    avatar: '👩‍🏫',
    specialty: 'Educational Curator',
    completedChallenges: 7
  },
  { 
    rank: 9, 
    name: 'Joko Widodo', 
    xp: 580, 
    level: 4, 
    badge: 'Pelancong', 
    avatar: '👨',
    specialty: 'General Enthusiast',
    completedChallenges: 5
  },
  { 
    rank: 10, 
    name: 'Rina Amalia', 
    xp: 420, 
    level: 3, 
    badge: 'Pelancong', 
    avatar: '👩',
    specialty: 'Cultural Student',
    completedChallenges: 4
  },
]);

// Sort leaderboard by XP
leaderboardData.value.sort((a, b) => b.xp - a.xp);
leaderboardData.value.forEach((entry, index) => {
  entry.rank = index + 1;
});
</script>

<template>
  <div class="h-full overflow-y-auto p-6">
    <div class="max-w-5xl mx-auto space-y-6">
      <!-- Header -->
      <div class="text-center space-y-2">
        <h1 class="text-4xl font-bold text-gray-900">🏆 Top Storytellers</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Talenta terbaik dalam storytelling museum budaya Yogyakarta. Platform kami menghasilkan profesional heritage yang siap bekerja!
        </p>
      </div>

      <!-- CTA for Recruiters (Demo purposes) -->
      <div class="bg-gradient-to-r from-[#2C5F4F] to-[#3A7763] rounded-xl p-6 text-white text-center">
        <h2 class="text-2xl font-bold mb-2">🎯 Looking for Cultural Heritage Talent?</h2>
        <p class="mb-4 opacity-90">
          Rekrut storyteller dan kurator berpengalaman dari platform kami!
        </p>
        <button class="px-8 py-3 bg-white text-[#2C5F4F] rounded-lg font-bold hover:bg-gray-100 transition-colors">
          Partner dengan LOKANA
        </button>
      </div>

      <!-- Leaderboard Table -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Rank
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Specialty
                </th>
                <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Level
                </th>
                <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  XP
                </th>
                <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Challenges
                </th>
                <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Badge
                </th>
                <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr 
                v-for="entry in leaderboardData" 
                :key="entry.rank"
                :class="{
                  'bg-emerald-50 border-2 border-emerald-300': entry.isCurrentUser,
                  'hover:bg-gray-50': !entry.isCurrentUser
                }"
                class="transition-colors"
              >
                <!-- Rank -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <span 
                      v-if="entry.rank <= 3"
                      class="text-2xl"
                    >
                      {{ entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉' }}
                    </span>
                    <span 
                      class="font-bold text-lg"
                      :class="{
                        'text-amber-600': entry.rank === 1,
                        'text-gray-500': entry.rank === 2,
                        'text-orange-600': entry.rank === 3,
                        'text-gray-700': entry.rank > 3
                      }"
                    >
                      #{{ entry.rank }}
                    </span>
                  </div>
                </td>

                <!-- User -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="text-3xl">{{ entry.avatar }}</div>
                    <div>
                      <div class="font-semibold text-gray-900 flex items-center gap-2">
                        {{ entry.name }}
                        <span v-if="entry.isCurrentUser" class="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded uppercase">
                          You
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Specialty -->
                <td class="px-6 py-4">
                  <span class="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {{ entry.specialty }}
                  </span>
                </td>

                <!-- Level -->
                <td class="px-6 py-4 text-center">
                  <div class="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#2C5F4F] to-[#3A7763] rounded-full text-white font-bold">
                    {{ entry.level }}
                  </div>
                </td>

                <!-- XP -->
                <td class="px-6 py-4 text-center">
                  <div class="font-bold text-gray-900">{{ entry.xp.toLocaleString() }}</div>
                  <div class="text-xs text-gray-500">Total XP</div>
                </td>

                <!-- Challenges Completed -->
                <td class="px-6 py-4 text-center">
                  <div class="font-semibold text-emerald-600">{{ entry.completedChallenges }}</div>
                  <div class="text-xs text-gray-500">Completed</div>
                </td>

                <!-- Badge -->
                <td class="px-6 py-4 text-center">
                  <span 
                    class="inline-block px-3 py-1 rounded-full text-xs font-bold"
                    :class="{
                      'bg-amber-100 text-amber-700': entry.badge === 'Master Curator',
                      'bg-blue-100 text-blue-700': entry.badge === 'Weaponry Expert',
                      'bg-emerald-100 text-emerald-700': entry.badge === 'Kuncen Digital',
                      'bg-purple-100 text-purple-700': entry.badge === 'Penjelajah',
                      'bg-gray-100 text-gray-700': entry.badge === 'Pelancong'
                    }"
                  >
                    {{ entry.badge }}
                  </span>
                </td>

                <!-- Action -->
                <td class="px-6 py-4 text-center">
                  <button 
                    v-if="!entry.isCurrentUser"
                    class="px-4 py-2 bg-[#2C5F4F] text-white text-xs font-semibold rounded-lg hover:bg-[#3A7763] transition-colors"
                  >
                    Rekrut
                  </button>
                  <span v-else class="text-emerald-600 font-semibold text-sm">
                    That's you!
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
        <div class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-600 shrink-0">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          <div class="text-sm text-blue-800">
            <p class="font-semibold mb-1">How to Climb the Ranks:</p>
            <p>Complete career challenges on artifacts to earn XP. The more accurate and creative your storytelling, the higher your score. Top performers get featured to potential employers!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
