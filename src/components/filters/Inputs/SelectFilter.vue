<template>
  <div class="flex items-center">
    <label
      :for="name"
      class="w-32 dark:text-gray-400 text-gray-700 font-bold text-right flex-shrink-0"
    >
      {{ label }}:
    </label>
    <select
      v-model="selectedOption"
      @change="updateFilter"
      :id="name"
      :name="name"
      class="block w-full mx-2 p-2 border border-white rounded-md shadow-sm dark:bg-gray-700 dark:border-white text-gray-700 dark:text-white cursor-pointer flex-grow"
    >
      <option value="">{{ `Select ${label}` }}</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <button
      @click="resetFilter"
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
</template>

<script>
export default {
  name: 'SelectFilter',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedOption: ''
    }
  },
  methods: {
    updateFilter() {
      if (this.selectedOption !== '') {
      }
      this.$emit('update-filter', { [this.name]: this.selectedOption })
    },
    resetFilter() {
      this.selectedOption = ''
      this.updateFilter()
    }
  }
}
</script>
