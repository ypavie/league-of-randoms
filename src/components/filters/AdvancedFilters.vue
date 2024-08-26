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
    <div class="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4" v-if="showFilters">
      <RegionFilter v-model="currentFilters.region" @update-filter="updateSelect" />
      <!-- <SpeciesFilter v-model="currentFilters.species" @update-filter="updateSelect('species')" />
      <SkinlinesFilter
        v-model="currentFilters.skinlines"
        @update-filter="updateSelect('skinlines')"
        />
      <ClassFilter v-model="currentFilters.class" @update-filter="updateSelect('class')" />
      <UltimateFilter v-model="currentFilters.ultimate" @update-filter="updateSelect('ultimate')" />
      <DotsFilter v-model="currentFilters.dots" @update-filter="updateSelect('dots')" />
      <ExecutionFilter
        v-model="currentFilters.execution"
        @update-filter="updateSelect('execution')"
      />
      <InvocationFilter
        v-model="currentFilters.invocation"
        @update-filter="updateSelect('invocation')"
      />
      <StacksFilter v-model="currentFilters.stacks" @update-filter="updateSelect('stacks')" />
      <StealthFilter v-model="currentFilters.stealth" @update-filter="updateSelect('stealth')" />
      <YasuoFriendFilter
        v-model="currentFilters.yasuofriend"
        @update-filter="updateSelect('yasuofriend')"
      />
      <ReleaseYearFilter
        v-model="currentFilters.releaseYear"
        @update-filter="updateReleaseYearFilter"
      /> -->
    </div>
  </div>
</template>

<script>
import filters from '@/assets/filters.json'

import ReleaseYearFilter from './Inputs/ReleaseYearFilter.vue'

import RegionFilter from './Inputs/RegionFilter.vue'
import SpeciesFilter from './Inputs/SpeciesFilter.vue'
import SkinlinesFilter from './Inputs/SkinlinesFilter.vue'
import DotsFilter from './Inputs/DotsFilter.vue'
import ExecutionFilter from './Inputs/ExecutionFilter.vue'
import InvocationFilter from './Inputs/InvocationFilter.vue'
import StacksFilter from './Inputs/StacksFilter.vue'
import StealthFilter from './Inputs/StealthFilter.vue'
import UltimateFilter from './Inputs/UltimateFilter.vue'
import YasuoFriendFilter from './Inputs/YasuoFriendFilter.vue'
import ClassFilter from './Inputs/ClassFilter.vue'

export default {
  name: 'AdvancedFilters',
  components: {
    ReleaseYearFilter,
    RegionFilter,
    SpeciesFilter,
    SkinlinesFilter,
    DotsFilter,
    ExecutionFilter,
    InvocationFilter,
    StacksFilter,
    StealthFilter,
    UltimateFilter,
    YasuoFriendFilter,
    ClassFilter
  },
  data() {
    return {
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
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    resetFilter(filterName) {
      this.currentFilters[filterName] = ''
      this.updateSelect(filterName)
    },
    getFilters() {
      const releaseYearFilter = this.currentFilters.releaseYear
      return { ...filters, releaseYear: releaseYearFilter }
    },
    updateSelect(payload) {
      this.currentFilters[payload] = value
      this.$emit('update-filter')
    },
    updateReleaseYearFilter() {
      this.$emit('update-filter')
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
