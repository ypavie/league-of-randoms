<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="flex-1 bg-white dark:bg-gray-800 flex">
      <div class="flex flex-col md:flex-row flex-1">
        <ChampionHistory ref="championHistory" @champion-clicked="championFromHistory" />
        <div class="flex-1 p-4 overflow-y-auto rounded-lg relative">
          <RandomChampion
            ref="randomChampion"
            @generate="generateRandomChampion"
            @update-filters="updateFilters"
          />
        </div>
        <ChampionList ref="championList" />
      </div>
    </div>
  </div>
</template>

<script>
import ChampionList from '@/components/ChampionList.vue'
import AppHeader from '@/components/AppHeader.vue'
import RandomChampion from './components/RandomChampion.vue'
import ChampionHistory from './components/ChampionHistory.vue'

import { getChampions, getChampion, getChampionNamesFromFilters } from './utils/champion_utils'

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
      filters: {
        lanes: ['Top', 'Jungle', 'Middle', 'Bottom', 'Support'],
        searchText: '',
        selectAll: false,
        unselectAll: false,
        summs: true,
        roles: true,
        runes: true,
        items: true,
        gender: '',
        mana: '',
        class: '',
        range: '',
        species: '',
        region: '',
        skinlines: '',
        releaseyearmin: 2009,
        releaseyearmax: 2024
      }
    }
  },
  mounted() {
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
      const filters = this.$refs.randomChampion.getFilters()
      const disabledChampions = this.$refs.championList.getDisabledChampions()
      this.currentChampion = getChampion(filters, disabledChampions)
      if (this.$refs.randomChampion && this.currentChampion) {
        this.$refs.randomChampion.updateCurrentChampion(this.currentChampion)
        this.$refs.championHistory.addChampion(this.currentChampion)
      }
    },
    championFromHistory(champion) {
      this.currentChampion = champion
      this.$refs.randomChampion.updateCurrentChampion(champion)
    },
    updateFilters() {
      const filters = this.$refs.randomChampion.getFilters()
      const championFromFilters = getChampionNamesFromFilters(filters)
      this.$refs.championList.updateFilteredChampions(championFromFilters)
    }
  }
}
</script>

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
