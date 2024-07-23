<script>
export default {
  data() {
    return {
      champions: [],
      MAX_CHAMPIONS: 8
    }
  },
  methods: {
    addChampion(newChampion) {
      if (this.champions.length >= this.MAX_CHAMPIONS) {
        this.champions.shift()
      }
      this.champions.push(newChampion)
      this.saveToLocalStorage()
    },
    handleClick(champion) {
      this.$emit('champion-clicked', champion)
    },
    saveToLocalStorage() {
      localStorage.removeItem('champions')
      localStorage.setItem('champions', JSON.stringify(this.champions))
    },
    loadFromLocalStorage() {
      const champions = localStorage.getItem('champions')
      if (champions) {
        this.champions = JSON.parse(champions)
        if (this.champions.length > this.MAX_CHAMPIONS) {
          this.champions = this.champions.slice(-this.MAX_CHAMPIONS)
          this.saveToLocalStorage()
        }
      }
    },
    clearChampions() {
      this.champions = []
      localStorage.removeItem('champions')
    }
  },
  created() {
    this.loadFromLocalStorage()
  }
}
</script>

<template>
  <div class="flex flex-col items-center p-2 md:space-y-2" v-if="champions.length">
    <p class="text-center text-gray-700 dark:text-white font-bold py-2 px-4 rounded">History</p>
    <div
      class="box flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal"
    >
      <div
        v-for="champion in champions.slice().reverse()"
        :key="champion.id"
        class="champion-icon flex flex-col items-center space-y-2 md:space-y-0 md:space-x-2"
      >
        <img
          :src="champion.icon"
          :alt="champion.name"
          class="w-20 h-auto max-h-[150px] champion-icon"
          @click="handleClick(champion)"
        />
      </div>
    </div>
    <p
      class="text-center text-gray-700 dark:text-white font-bold py-2 px-4 rounded underline cursor-pointer"
      @click="clearChampions"
    >
      Clear
    </p>
  </div>
</template>

<style scoped>
.h-full {
  max-height: 92vh;
  overflow-y: auto;
}

.champion-icon img {
  width: 75px;
  height: 75px;
  margin: 0 auto;
}

.champion-icon img:hover {
  cursor: pointer;
  filter: brightness(130%);
}

.champion-icon img:active {
  transform: scale(0.97);
}
</style>
