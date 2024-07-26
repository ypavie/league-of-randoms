<template>
  <div class="container mt-2">
    <div class="content flex items-center">
      <label class="w-32 dark:text-gray-400 text-gray-700 font-bold text-right flex-shrink-0"
        >Release Year :</label
      >
      <div class="relative flex-grow mx-2">
        <div class="range-slider">
          <span
            class="range-selected"
            :style="{ left: minPercent + '%', right: 100 - maxPercent + '%' }"
          ></span>
        </div>
        <div class="range-input">
          <input
            type="range"
            class="min"
            :min="minYear"
            :max="maxYear"
            v-model.number="currentMinYear"
            step="1"
          />
          <input
            type="range"
            class="max"
            :min="minYear"
            :max="maxYear"
            v-model.number="currentMaxYear"
            step="1"
          />
        </div>
        <div class="range-price">
          <label for="min" class="text-gray-700 dark:text-gray-400">Min</label>
          <input
            type="number"
            name="min"
            v-model.number="currentMinYear"
            @input="validateMinYear"
            :min="minYear"
            :max="currentMaxYear"
            class="ml-1 p-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <label for="max" class="text-gray-700 dark:text-gray-400 ml-4">Max</label>
          <input
            type="number"
            name="max"
            v-model.number="currentMaxYear"
            @input="validateMaxYear"
            :min="currentMinYear"
            :max="maxYear"
            class="ml-1 p-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
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
      currentMaxYear: 2024
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
    currentMinYear(newVal) {
      this.adjustRange()
      this.emitUpdateFilter()
    },
    currentMaxYear(newVal) {
      this.adjustRange()
      this.emitUpdateFilter()
    }
  },
  methods: {
    getReleaseYear() {
      return {
        releaseYearMin: this.currentMinYear,
        releaseYearMax: this.currentMaxYear
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
      this.$emit('update-filter')
    }
  }
}
</script>

<style scoped>
.range-slider {
  height: 5px;
  position: relative;
  background-color: #e1e9f6;
  border-radius: 2px;
}
.range-selected {
  height: 100%;
  position: absolute;
  border-radius: 5px;
  background-color: #1b53c0;
}
.range-input {
  position: relative;
  margin-bottom: 0.5rem;
}
.range-input input {
  position: absolute;
  width: 100%;
  height: 5px;
  top: -7px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.range-input input::-webkit-slider-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 3px solid #1b53c0;
  background-color: #fff;
  pointer-events: auto;
  -webkit-appearance: none;
}
.range-input input::-moz-range-thumb {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  border: 3px solid #1b53c0;
  background-color: #fff;
  pointer-events: auto;
  -moz-appearance: none;
}
.range-price {
  align-items: center;
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
}
.range-price label {
  margin-right: 5px;
}
.range-price input {
  width: 70px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.range-price input:first-of-type {
  margin-right: 15px;
}
</style>
