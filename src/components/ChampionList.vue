<template>
  <div class="md:w-4/12 bg-white dark:bg-gray-800">
    <div class="champion-list-vue">
      <div class="champion-icons flex flex-wrap justify-center" ref="container">
        <div
          v-for="championName in currentChampions"
          :key="championName"
          class="champion-icon"
          :data-champion="championName"
        >
          <img
            :src="getChampionIconUrl(championName)"
            @click="toggleBan(championName)"
            :class="{ selected: disabledChampions.includes(championName) }"
            draggable="false"
          />
        </div>
      </div>
    </div>
    <!-- Selection rectangle (visible only during dragging) -->
    <div
      v-if="isSelecting && dragDistanceExceeded"
      class="selection-rect"
      :style="selectionStyle"
    ></div>
  </div>
</template>

<script>
import champions from '@/assets/champions.json'
import interact from 'interactjs'
import { CURRENT_PATCH } from '@/globals'

export default {
  data() {
    return {
      searchTerm: '',
      currentChampions: Object.keys(champions),
      disabledChampions: [],
      isSelecting: false,
      dragDistanceExceeded: false,
      selectionStart: { x: 0, y: 0 },
      selectionEnd: { x: 0, y: 0 },
      selectionStyle: {
        left: '0px',
        top: '0px',
        width: '0px',
        height: '0px'
      }
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
      return `https://ddragon.leagueoflegends.com/cdn/${CURRENT_PATCH}/img/champion/${championName}.png`
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
    },
    onMouseDown(event) {
      this.isSelecting = true
      this.selectionStart.x = event.clientX
      this.selectionStart.y = event.clientY
      this.selectionEnd = { x: event.clientX, y: event.clientY }
      this.selectionStyle = {
        left: `${this.selectionStart.x}px`,
        top: `${this.selectionStart.y}px`,
        width: `0px`,
        height: `0px`
      }
      this.clearHoveredIcons()
      this.dragDistanceExceeded = false
    },
    onMouseMove(event) {
      if (this.isSelecting) {
        this.selectionEnd.x = event.clientX
        this.selectionEnd.y = event.clientY

        const dx = Math.abs(this.selectionEnd.x - this.selectionStart.x)
        const dy = Math.abs(this.selectionEnd.y - this.selectionStart.y)
        this.dragDistanceExceeded = dx > 5 || dy > 5

        if (this.dragDistanceExceeded) {
          this.updateSelectionRect()
          this.updateHoveredIcons()
        }
      }
    },
    onMouseUp(event) {
      const dx = Math.abs(this.selectionEnd.x - this.selectionStart.x)
      const dy = Math.abs(this.selectionEnd.y - this.selectionStart.y)
      const dragThreshold = 50

      if (this.dragDistanceExceeded) {
        this.selectItemsInsideRect()
        this.clearHoveredIcons()
      }
      this.isSelecting = false
      this.dragDistanceExceeded = false
    },
    updateSelectionRect() {
      const x = Math.min(this.selectionStart.x, this.selectionEnd.x)
      const y = Math.min(this.selectionStart.y, this.selectionEnd.y)
      const width = Math.abs(this.selectionStart.x - this.selectionEnd.x)
      const height = Math.abs(this.selectionStart.y - this.selectionEnd.y)
      this.selectionStyle = {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`
      }
    },
    selectItemsInsideRect() {
      const rect = {
        x: Math.min(this.selectionStart.x, this.selectionEnd.x),
        y: Math.min(this.selectionStart.y, this.selectionEnd.y),
        width: Math.abs(this.selectionStart.x - this.selectionEnd.x),
        height: Math.abs(this.selectionStart.y - this.selectionEnd.y)
      }

      this.currentChampions.forEach((championName) => {
        const iconElement = this.$el.querySelector(`[data-champion='${championName}'] img`)
        const iconRect = iconElement.getBoundingClientRect()

        const isInside =
          iconRect.right > rect.x &&
          iconRect.left < rect.x + rect.width &&
          iconRect.bottom > rect.y &&
          iconRect.top < rect.y + rect.height

        if (isInside) {
          this.toggleBan(championName)
        }
      })
    },

    updateHoveredIcons() {
      this.currentChampions.forEach((championName) => {
        const iconElement = this.$el.querySelector(`[data-champion='${championName}'] img`)
        const iconRect = iconElement.getBoundingClientRect()

        const rect = {
          x: Math.min(this.selectionStart.x, this.selectionEnd.x),
          y: Math.min(this.selectionStart.y, this.selectionEnd.y),
          width: Math.abs(this.selectionStart.x - this.selectionEnd.x),
          height: Math.abs(this.selectionStart.y - this.selectionEnd.y)
        }

        const isInside =
          iconRect.right > rect.x &&
          iconRect.left < rect.x + rect.width &&
          iconRect.bottom > rect.y &&
          iconRect.top < rect.y + rect.height

        if (isInside) {
          iconElement.classList.add('hovered')
        }
      })
    },

    clearHoveredIcons() {
      const icons = this.$el.querySelectorAll('.champion-icon img')
      icons.forEach((icon) => {
        icon.classList.remove('hovered')
      })
    }
  },
  mounted() {
    interact(this.$refs.container).on('down', this.onMouseDown)
    interact(this.$refs.container).on('move', this.onMouseMove)
    interact(this.$refs.container).on('up', this.onMouseUp)
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
  height: calc(100vh - 5rem);
  overflow-y: auto;
  align-items: flex-start;
  align-content: flex-start;
}

.champion-icon {
  text-align: center;
  margin: 2px;
  flex: 0 0 auto;
  height: 75px;
}

.champion-icon img {
  width: 75px;
  height: 75px;
  margin: 0 auto;
  display: block;
  object-fit: cover;
  transition:
    transform 0.2s,
    filter 0.2s;
}

.champion-icon img.selected {
  filter: grayscale(100%);
}

.champion-icon img:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.champion-icon img.selected:hover {
  filter: grayscale(100%);
}

.champion-icon img:not(.selected):hover {
  filter: grayscale(10%) brightness(130%);
}

.champion-icon img:active {
  transform: scale(0.97);
}

.selection-rect {
  position: absolute;
  border: 4px solid #333;
  background-color: rgba(169, 169, 169, 0.2);
  pointer-events: none;
}
</style>
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
  height: calc(100vh - 5rem);
  overflow-y: auto;
  align-items: flex-start;
  align-content: flex-start;
}

.champion-icon {
  text-align: center;
  margin: 2px;
  flex: 0 0 auto;
  height: 75px;
}

.champion-icon img {
  width: 75px;
  height: 75px;
  margin: 0 auto;
  display: block;
  object-fit: cover;
  transition:
    transform 0.2s,
    filter 0.2s;
}

.champion-icon img.selected {
  filter: grayscale(100%);
}

.champion-icon img:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.champion-icon img.selected:hover {
  filter: grayscale(100%);
}

.champion-icon img:not(.selected):hover {
  filter: grayscale(10%) brightness(130%);
}

.champion-icon img:active {
  transform: scale(0.97);
}

.champion-icon img.hovered {
  filter: grayscale(10%) brightness(130%);
  transform: scale(1.05);
}

.selection-rect {
  position: absolute;
  border: 4px solid #333;
  background-color: rgba(169, 169, 169, 0.2);
  pointer-events: none;
}
</style>
