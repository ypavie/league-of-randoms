<template>
  <div class="pt-4">
    <div class="text-center">
      <button
        @click="toggleFilters"
        class="text-gray-700 dark:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {{ showFilters ? 'Less filters' : 'More filters' }}
      </button>
    </div>
    <div v-if="showFilters" class="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(filterValues, filterName) in filters"
        :key="filterName"
        class="flex items-center"
      >
        <label
          :for="filterName"
          class="w-32 dark:text-gray-400 text-gray-700 font-bold text-right flex-shrink-0"
        >
          {{ filterName }} :
        </label>
        <select
          v-model="currentFilters[filterName]"
          @change="udpateSelect(filterName)"
          :id="filterName"
          :name="filterName"
          class="block w-full mx-2 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white cursor-pointer flex-grow"
        >
          <option value="">Select {{ filterName }}</option>
          <option v-for="value in filterValues" :key="value" :value="value">{{ value }}</option>
        </select>
        <button
          @click="resetFilter(filterName)"
          class="p-1 text-red-500 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
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
      <div class="flex items-center">
        <ReleaseYearFilter ref="releaseYear" @update-filter="updateReleaseYearFilter()" />
      </div>
    </div>
  </div>
</template>

<script>
import ReleaseYearFilter from './ReleaseYearFilter.vue'
import filters from '@/assets/filters.json'

export default {
  name: 'AdvancedFilters',
  components: {
    ReleaseYearFilter
  },
  data() {
    return {
      showFilters: false,
      currentFilters: {},
      currentFilterTypes: ['summs', 'roles', 'runes', 'items'],
      filters: filters
    }
  },
  mounted() {
    this.currentFilters = Object.keys(this.filters).reduce((acc, filterName) => {
      acc[filterName] = ''
      return acc
    }, {})
    Object.keys(this.filters).forEach((filterName) => {
      this.filters[filterName].sort()
    })
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    resetFilter(filterName) {
      this.currentFilters[filterName] = ''
      document.getElementById(filterName).selectedIndex = 0
      this.udpateSelect(filterName)
    },
    getFilters() {
      const filters = Object.keys(this.currentFilters).reduce((acc, filterName) => {
        acc[filterName.toLowerCase()] = this.currentFilters[filterName]
        return acc
      }, {})

      const releaseYearFilter = this.$refs.releaseYear.getReleaseYear()
      return { ...filters, ...releaseYearFilter }
    },
    udpateSelect(filterName) {
      this.currentFilters[filterName] = document.getElementById(filterName).value
      this.$emit('update-filter', this.getFilters())
    },
    updateReleaseYearFilter() {
      console.log('Release year filter updated')
      this.$emit('update-filter', this.getFilters())
    },
    toggleFilterType(type) {
      if (this.isSelected(type)) {
        this.currentFilterTypes = this.currentFilterTypes.filter((item) => item !== type)
      } else {
        this.currentFilterTypes.push(type)
      }
    },
    isSelected(type) {
      return this.currentFilterTypes.includes(type)
    },
    getSelectedFiltersTypes() {
      return this.currentFilterTypes.reduce((acc, type) => {
        acc[type] = this.isSelected(type)
        return acc
      }, {})
    }
  }
}
</script>

<style scoped>
.custom-button {
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.1s;
}

.custom-button:hover {
  transform: scale(1.05);
}
</style>
