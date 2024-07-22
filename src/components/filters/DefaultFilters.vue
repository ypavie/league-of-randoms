<template>
  <div class="container mx-auto p-4">
    <!-- Responsive flex container -->
    <div
      class="flex flex-wrap md:flex-row md:flex-wrap items-center justify-center space-y-4 md:space-y-0 md:space-x-4"
    >
      <!-- LANES ICON -->
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
      <!-- SEARCH -->
      <div class="order-2 mb-4 md:mb-0">
        <input
          type="text"
          class="border border-gray-300 dark:border-gray-700 rounded-md pl-6 pr-4 py-2 w-full sm:w-48 md:w-auto focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="Champion name..."
          @input="emitInput"
        />
      </div>
      <!-- SELECT ALL AND UNSELECT ALL BUTTONS -->
      <div class="flex space-x-4 order-3 mb-4 md:mb-0">
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
      </div>
    </div>
    <!-- GENERATE BUTTON -->
    <div class="flex justify-center mt-4">
      <button
        @click="generate"
        class="custom-button bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-bold py-2 px-4 rounded"
      >
        GENERATE
      </button>
    </div>
  </div>
  <AdvancedFilters ref="advancedFilters" @update-filter="updateFilter" />
</template>

<script>
import AdvancedFilters from '../filters/AdvancedFilters.vue'

export default {
  name: 'DefaultFilters',
  emits: ['update-filter', 'generate'],
  components: {
    AdvancedFilters
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
      ]
    }
  },
  methods: {
    generate() {
      const filters = {
        lanes: this.getSelectedLanes(),
        types: this.getSelectedFiltersTypes(),
        all: this.$refs.advancedFilters.getFilters()
      }
      this.$emit('generate', filters)
    },
    updateFilter(filter) {
      this.$emit('update-filter', filter)
    },
    toggleSelectedLane(index) {
      this.roles[index].isSelected = !this.roles[index].isSelected
    },
    getSelectedFiltersTypes() {
      return this.$refs.advancedFilters.getSelectedFiltersTypes()
    },
    getSelectedLanes() {
      return this.roles.filter((role) => role.isSelected).map((role) => role.name)
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
