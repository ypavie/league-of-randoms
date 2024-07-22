<script>
import ChampionList from '@/components/ChampionList.vue'
import AppHeader from '@/components/AppHeader.vue'
import RandomChampion from './components/RandomChampion.vue'
import ChampionHistory from './components/ChampionHistory.vue'

import { generateItemBuild } from '@/utils/item_utils'
import { getChampions, getChampion_tofix, getRandomChampion } from './utils/champion_utils'

export default {
  components: {
    ChampionList,
    AppHeader,
    RandomChampion,
    ChampionHistory
  },
  data() {
    return {
      champions: [],
      currentChampion: null,
      lastGenerationTime: 0,
      isLoading: false,
      currentWaitingTime: 500
    }
  },
  mounted() {
    console.log('App mounted')
    this.initializeChampions()
  },
  methods: {
    initializeChampions() {
      this.champions = getChampions()
      if (this.$refs.randomChampion && this.currentChampion) {
        this.$refs.randomChampion.updateCurrentChampion(this.currentChampion)
      }
    },
    async generateRandomChampion() {
      const now = Date.now()
      if (now - this.lastGenerationTime < this.currentWaitingTime) {
        return
      }
      this.isLoading = true
      this.lastGenerationTime = now
      this.currentChampion = getChampion_tofix()
      if (this.$refs.randomChampion && this.currentChampion) {
        this.$refs.randomChampion.updateCurrentChampion(this.currentChampion)
        this.$refs.championHistory.addChampion(this.currentChampion)
      }
      setTimeout(() => {
        this.isLoading = false
      }, this.currentWaitingTime)
    },
    championFromHistory(champion) {
      this.currentChampion = champion
      this.$refs.randomChampion.updateCurrentChampion(champion)
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="flex-1 bg-white dark:bg-gray-800 flex">
      <div class="flex flex-col md:flex-row flex-1">
        <!-- Left Column -->

        <ChampionHistory ref="championHistory" @champion-clicked="championFromHistory" />

        <!-- Middle Column -->
        <div
          class="flex-1 p-4 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg relative"
        >
          <div
            v-if="isLoading"
            class="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10"
          >
            <svg
              class="spinner"
              width="65px"
              height="65px"
              viewBox="0 0 66 66"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                class="path"
                fill="none"
                stroke-width="12"
                stroke-linecap="round"
                cx="33"
                cy="33"
                r="25"
              ></circle>
            </svg>
          </div>
          <RandomChampion ref="randomChampion" @generate="generateRandomChampion" />
        </div>

        <!-- Right Column -->

        <ChampionList ref="championList" :champions="champions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  animation: rotator 1.5s linear infinite;
}
@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
.path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation:
    dash 2.5s ease-in-out infinite,
    colors 2.5s ease-in-out infinite;
  stroke-width: 12px;
}
@keyframes colors {
  0% {
    stroke: #0ac3b7;
  }
  25% {
    stroke: #048998;
  }
  50% {
    stroke: #043e4c;
  }
  75% {
    stroke: #0ac3b7;
  }
  100% {
    stroke: #041822;
  }
}
@keyframes dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}
svg {
  width: 50px;
  height: 50px;
}
</style>
