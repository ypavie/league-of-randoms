<script>
import { ref, computed } from 'vue'

export default {
  props: ['champions'],
  data() {
    return {
      searchTerm: '',
      disabledChampions: [], // disabled = Champions clicked by the user to be removed
      filteredChampions: [] // filtered = Champions matching the search term by the user to be kept
    }
  },
  computed: {},
  methods: {
    toggleBan(championName) {
      if (this.disabledChampions.includes(championName)) {
        this.disabledChampions.splice(this.disabledChampions.indexOf(championName), 1)
      } else {
        this.disabledChampions.push(championName)
      }
    },
    updateSearchTerm(filters) {
      this.searchTerm = filters.searchText
      if (filters.selectAll) {
        this.disabledChampions = []
      }
      if (filters.unselectAll) {
        this.disabledChampions = this.getChampionList()
      }
      this.getFilteredChampions()
    },
    updateFilteredChampions(champions) {
      this.filteredChampions = this.filteredChampions.filter(
        (championName) => !champions.includes(championName)
      )
    },

    getChampionIconUrl(id) {
      return `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${id}.png`
    },
    getFilteredChampions() {
      const input = this.searchTerm.trim().toLowerCase()
      if (input === '') {
        return this.champions
      } else {
        this.filteredChampions = Object.keys(this.champions).filter((championName) =>
          championName.toLowerCase().includes(input)
        )
        return Object.fromEntries(
          Object.entries(this.champions).filter(([championName]) =>
            this.filteredChampions.includes(championName)
          )
        )
      }
    },
    getChampionList() {
      return Object.keys(this.getFilteredChampions()).filter(
        (championName) => !this.disabledChampions.includes(championName)
      )
    }
  }
}
</script>

<template>
  <div class="md:w-4/12 bg-white dark:bg-gray-800 overflow-y-auto">
    <div class="champion-list-vue">
      <div class="champion-icons flex flex-wrap justify-center">
        <div
          v-for="(champion, championName) in getFilteredChampions()"
          :key="champion.id"
          class="champion-icon"
        >
          <img
            :src="getChampionIconUrl(champion.id)"
            @click="toggleBan(championName)"
            :class="{ selected: disabledChampions.includes(championName) }"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

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
