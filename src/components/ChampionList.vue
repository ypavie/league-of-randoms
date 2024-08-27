<template>
  <div class="md:w-3/12 bg-white dark:bg-gray-800 overflow-y-auto">
    <div class="champion-list-vue">
      <div class="champion-icons flex flex-wrap justify-center">
        <div v-for="championName in currentChampions" :key="championName" class="champion-icon">
          <img
            :src="getChampionIconUrl(championName)"
            @click="toggleBan(championName)"
            :class="{ selected: disabledChampions.includes(championName) }"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import champions from '@/assets/champions.json'

export default {
  data() {
    return {
      searchTerm: '',
      currentChampions: Object.keys(champions),
      disabledChampions: []
    }
  },
  methods: {
    toggleBan(championName) {
      if (this.disabledChampions.includes(championName)) {
        this.disabledChampions = this.disabledChampions.filter(
          (champion) => champion !== championName
        )
      } else {
        this.disabledChampions.push(championName)
      }
    },
    updateFilteredChampions(championList) {
      this.currentChampions = championList
    },
    getChampionIconUrl(championName) {
      return `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${championName}.png`
    },
    getDisabledChampions() {
      return this.disabledChampions
    },
    selectAll(select) {
      if (select) {
        this.disabledChampions = []
      } else {
        this.disabledChampions = this.currentChampions
      }
    }
  }
}
</script>

<style scoped>
.champion-list-vue {
  padding: 5px;
}

.search-bar {
  text-align: center;
  margin: 10px 0;
}

.champion-icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 92vh;
  overflow-y: auto;
}

.champion-icon {
  text-align: center;
  margin: 2px;
}

.champion-icon img {
  width: 75px;
  height: 75px;
  margin: 0 auto;
}

.selected {
  filter: grayscale(100%);
}

.champion-icon img:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.champion-icon img:hover:not(.selected) {
  filter: brightness(130%);
}

.champion-icon img:hover {
  filter: grayscale(100%) brightness(130%);
}

.champion-icon img:active {
  transform: scale(0.97);
}
</style>
