<template>
  <div class="container mt-2">
    <div class="content flex items-center">
      <label class="w-32 dark:text-gray-400 text-gray-700 font-bold text-right flex-shrink-0">
        Release Year :
      </label>
      <div class="flex-grow mx-2 flex items-center">
        <input
          type="number"
          v-model.number="currentMinYear"
          @input="validateMinYear"
          :min="minYear"
          :max="currentMaxYear"
          class="border border-white rounded-md p-1 w-20 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <div v-if="!isSmallScreen" class="flex-grow mx-2">
          <div class="range-slider" @click="onSliderClick">
            <span
              class="range-selected"
              :style="{ left: minPercent + '%', right: 100 - maxPercent + '%' }"
            ></span>
          </div>
          <div class="range-input">
            <input
              type="range"
              class="min cursor-pointer"
              :min="minYear"
              :max="maxYear"
              v-model.number="currentMinYear"
              step="1"
              @input="updateMinYear"
            />
            <input
              type="range"
              class="max cursor-pointer"
              :min="minYear"
              :max="maxYear"
              v-model.number="currentMaxYear"
              step="1"
              @input="updateMaxYear"
            />
          </div>
        </div>
        <input
          type="number"
          v-model.number="currentMaxYear"
          @input="validateMaxYear"
          :min="currentMinYear"
          :max="maxYear"
          class="border border-white rounded-md p-1 w-20 text-center ml-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          @click="reset"
          class="ml-4 p-1 text-red-500 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 5.293a1 1 0 0 1 1.414 1.414L10 11.414l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293a1 1 0 1 1-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 12 5.293 8.707a1 1 0 0 1 0-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReleaseYearFilter',
  emits: ['update-filter'],
  data() {
    return {
      minYear: 2009,
      maxYear: 2024,
      currentMinYear: 2009,
      currentMaxYear: 2024,
      isSmallScreen: false
    }
  },
  computed: {
    minPercent() {
      return ((this.currentMinYear - this.minYear) / (this.maxYear - this.minYear)) * 100
    },
    maxPercent() {
      return ((this.currentMaxYear - this.minYear) / (this.maxYear - this.minYear)) * 100
    }
  },
  watch: {
    currentMinYear() {
      this.adjustRange()
      this.emitUpdateFilter()
    },
    currentMaxYear() {
      this.adjustRange()
      this.emitUpdateFilter()
    }
  },
  methods: {
    getReleaseYear() {
      return {
        ReleaseYearMin: this.currentMinYear,
        ReleaseYearMax: this.currentMaxYear
      }
    },
    adjustRange() {
      if (this.currentMinYear > this.currentMaxYear) {
        ;[this.currentMinYear, this.currentMaxYear] = [this.currentMaxYear, this.currentMinYear]
      }
    },
    validateMinYear() {
      if (this.currentMinYear < this.minYear) {
        this.currentMinYear = this.minYear
      }
      if (this.currentMinYear > this.currentMaxYear) {
        this.currentMinYear = this.currentMaxYear
      }
      this.emitUpdateFilter()
    },
    validateMaxYear() {
      if (this.currentMaxYear > this.maxYear) {
        this.currentMaxYear = this.maxYear
      }
      if (this.currentMaxYear < this.currentMinYear) {
        this.currentMaxYear = this.currentMinYear
      }
      this.emitUpdateFilter()
    },
    reset() {
      this.currentMinYear = this.minYear
      this.currentMaxYear = this.maxYear
      this.emitUpdateFilter()
    },
    emitUpdateFilter() {
      this.$emit('update-filter', this.getReleaseYear())
    },
    onSliderClick(event) {
      const slider = this.$el.querySelector('.range-slider')
      const rect = slider.getBoundingClientRect()
      const clickX = event.clientX - rect.left
      const clickPercent = (clickX / rect.width) * 100
      const clickYear = Math.round(
        this.minYear + (clickPercent / 100) * (this.maxYear - this.minYear)
      )

      const minDiff = Math.abs(clickYear - this.currentMinYear)
      const maxDiff = Math.abs(clickYear - this.currentMaxYear)

      if (minDiff < maxDiff) {
        this.currentMinYear = clickYear
      } else {
        this.currentMaxYear = clickYear
      }
    },
    checkScreenSize() {
      this.isSmallScreen = window.innerWidth < 768
    },
    updateMinYear() {
      this.adjustRange()
      this.emitUpdateFilter()
    },
    updateMaxYear() {
      this.adjustRange()
      this.emitUpdateFilter()
    }
  },
  mounted() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize)
  }
}
</script>

<style scoped>
.range-slider {
  height: 5px;
  transform: translateY(50%);
}

.range-selected {
  position: absolute;
  border: 3px solid #e1e9f6;
}

.range-input {
  position: relative;
}

.range-input input {
  position: absolute;
  width: 100%;
  transform: translateY(-50%);
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input::-webkit-slider-thumb {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: 3px solid #a0aec0;
  background-color: #ffffff;
  pointer-events: auto;
  -webkit-appearance: none;
  cursor: pointer;
}

input::-moz-range-thumb {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 3px solid #a0aec0;
  background-color: #ffffff;
  pointer-events: auto;
  -moz-appearance: none;
  cursor: pointer;
  margin-top: 30%;
}
</style>
