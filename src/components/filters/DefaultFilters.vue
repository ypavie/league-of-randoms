<template>
  <div class="container mx-auto p-4">
    <div
      class="flex flex-wrap md:flex-row md:flex-wrap items-center justify-center space-y-4 md:space-y-0 md:space-x-4"
    >
      <div class="flex space-x-4 order-1 mb-4 md:mb-0">
        <img
          v-for="(role, index) in roles"
          :key="index"
          :src="role.icon"
          :class="[
            'custom-icon',
            'cursor-pointer',
            'h-12 w-12',
            'transform scale-110',
            { 'filter grayscale': !role.isSelected }
          ]"
          @click="toggleSelectedLane(index)"
          alt="Role Image"
        />
      </div>
      <div class="order-2 mb-4 md:mb-0">
        <input
          type="text"
          class="border border-gray-300 dark:border-gray-700 rounded-md pl-6 pr-4 py-2 w-full sm:w-64 md:w-auto focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="Champion name..."
          v-model="searchText"
          @input="updateSearchText"
        />
      </div>
      <!-- <div class="flex space-x-4 order-3 mb-4 md:mb-0">
        <button
          @click="selectAll"
          class="custom-button bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-bold py-2 px-4 rounded"
        >
          Select All
        </button>
        <button
          @click="unselectAll"
          class="custom-button bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-bold py-2 px-4 rounded"
        >
          Unselect All
        </button>
      </div> -->
    </div>
    <div class="flex justify-center mt-4">
      <button
        @click="generate"
        class="custom-button bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-bold py-3 px-8 rounded"
      >
        GENERATE CHAMPION
      </button>
    </div>
    <div class="pt-4">
      <div class="text-center">
        <button
          @click="toggleFilters"
          class="text-gray-700 dark:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {{ showFilters ? 'Less filters' : 'More filters' }}
        </button>
      </div>
      <div class="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4" v-if="showFilters">
        <RegionFilter @update-filter="updateFilterInput" />
        <SpeciesFilter @update-filter="updateFilterInput" />
        <SkinlinesFilter @update-filter="updateFilterInput" />
        <ClassFilter @update-filter="updateFilterInput" />

        <UltimateFilter @update-filter="updateFilterInput" />
        <RadioFilter label="Dots" name="dots" @update-filter="updateFilterInput" />
        <RadioFilter label="Execution" name="execution" @update-filter="updateFilterInput" />
        <RadioFilter label="Invocation" name="invocation" @update-filter="updateFilterInput" />
        <RadioFilter label="Stacks" name="stacks" @update-filter="updateFilterInput" />
        <RadioFilter label="Stealth" name="stealth" @update-filter="updateFilterInput" />
        <RadioFilter label="Yasuo Friend" name="yasuofriend" @update-filter="updateFilterInput" />
      </div>

      <div class="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4" v-if="showFilters">
        <ReleaseYearFilter @update-filter="updateFilterInputReleaseYear" />
      </div>
    </div>
  </div>
</template>

<script>
import filters from '@/assets/filters.json'

import ReleaseYearFilter from './Inputs/ReleaseYearFilter.vue'
import RadioFilter from './Inputs/RadioFilter.vue'

import RegionFilter from './Inputs/RegionFilter.vue'
import SpeciesFilter from './Inputs/SpeciesFilter.vue'
import SkinlinesFilter from './Inputs/SkinlinesFilter.vue'
import ClassFilter from './Inputs/ClassFilter.vue'
import UltimateFilter from './Inputs/UltimateFilter.vue'

export default {
  name: 'DefaultFilters',
  emits: ['update-filters', 'generate'],
  components: {
    ReleaseYearFilter,
    RegionFilter,
    SpeciesFilter,
    SkinlinesFilter,
    ClassFilter,
    RadioFilter,
    UltimateFilter
  },
  data() {
    return {
      roles: [
        {
          name: 'Top',
          icon: 'https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/lanes/top.png',
          isSelected: true
        },
        {
          name: 'Jungle',
          icon: 'https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/lanes/jungle.png',
          isSelected: true
        },
        {
          name: 'Middle',
          icon: 'https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/lanes/middle.png',
          isSelected: true
        },
        {
          name: 'Bottom',
          icon: 'https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/lanes/bottom.png',
          isSelected: true
        },
        {
          name: 'Support',
          icon: 'https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/lanes/support.png',
          isSelected: true
        }
      ],
      searchText: '',
      showFilters: true,
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
    generate() {
      this.selectAllClicked = false
      this.unselectAllClicked = false
      this.$emit('generate')
    },
    emitFilters() {
      this.$emit('update-filters')
    },
    toggleSelectedLane(index) {
      this.roles[index].isSelected = !this.roles[index].isSelected
      this.emitFilters()
    },
    updateSearchText() {
      this.selectAllClicked = false
      this.unselectAllClicked = false
      this.emitFilters()
    },
    selectAll() {
      this.selectAllClicked = true
      this.unselectAllClicked = false
      this.emitFilters()
    },
    unselectAll() {
      this.unselectAllClicked = true
      this.selectAllClicked = false
      this.emitFilters()
    },
    getFilters() {
      let filters = {
        lanes: this.getSelectedLanes(),
        searchText: this.searchText,
        selectAll: this.selectAllClicked,
        unselectAll: this.unselectAllClicked
      }
      const types = this.getSelectedFiltersTypes()
      Object.keys(types).forEach((type) => {
        filters[type] = types[type]
      })

      // if (this.$refs.advancedFilters.showFilters) {
      //   const advancedFilters = this.$refs.advancedFilters.getFilters()
      //   Object.keys(advancedFilters).forEach((key) => {
      //     filters[key] = advancedFilters[key]
      //   })
      // }
      return { ...filters, ...this.currentFilters }
    },
    getSelectedFiltersTypes() {
      return this.$refs.advancedFilters.getSelectedFiltersTypes()
    },
    getSelectedLanes() {
      return this.roles.filter((role) => role.isSelected).map((role) => role.name)
    },
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    resetFilter(filterName) {
      this.currentFilters[filterName] = ''
      this.updateFilterInput(filterName)
    },
    // getFilters() {
    //   const releaseYearFilter = this.currentFilters.releaseYear
    //   return { ...this.currentFilters, releaseYear: releaseYearFilter }
    // },
    updateFilterInput(payload) {
      console.log(payload)
      this.currentFilters = { ...this.currentFilters, ...payload }
      this.emitFilters()
    },
    updateFilterInputReleaseYear(payload) {
      this.currentFilters = {
        ...this.currentFilters,
        releaseYearMin: payload.ReleaseYearMin,
        releaseYearMax: payload.ReleaseYearMax
      }
      this.emitFilters()
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
  },
  watch: {
    searchText() {
      this.emitFilters()
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .flex-wrap {
    flex-wrap: wrap;
  }
  .space-y-4 {
    margin-bottom: 1rem;
  }
  .space-x-4 {
    margin-right: 1rem;
  }
}

@media (max-width: 1024px) and (min-width: 768px) {
  .order-1,
  .order-2,
  .order-3 {
    margin-bottom: 1rem;
  }
  .container > div {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

.custom-icon {
  cursor: pointer;
  transition: transform 0.3s ease;
  transform-origin: center;
}
.custom-icon:hover {
  transform: scale(1.1);
}

.custom-icon:active {
  transform: scale(0.9);
}

.custom-button {
  background-color: #ccc;
  color: #333;
  font-weight: bold;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.1s;
}

.custom-button:hover {
  background-color: #ddd;
  transform: scale(1.05);
}

.custom-button:active {
  transform: scale(0.95);
}
</style>
