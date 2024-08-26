<template>
  <div class="flex items-center">
    <label
      for="class"
      class="w-32 dark:text-gray-400 text-gray-700 font-bold text-right flex-shrink-0"
    >
      Class:
    </label>
    <select
      v-model="selectedClass"
      @change="updateClass"
      id="class"
      name="class"
      class="block w-full mx-2 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white cursor-pointer flex-grow"
    >
      <option value="">Select Class</option>
      <option value="Assassin">Assassin</option>
      <option value="Fighter">Fighter</option>
      <option value="Mage">Mage</option>
      <option value="Marksman">Marksman</option>
      <option value="Support">Support</option>
      <option value="Tank">Tank</option>
    </select>

    <button
      @click="resetClass"
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
  name: 'ClassFilter',
  data() {
    return {
      selectedClass: ''
    }
  },
  methods: {
    updateClass() {
      this.$emit('update-filter', { class: this.selectedClass })
    },
    resetClass() {
      this.selectedClass = ''
      this.updateClass()
    }
  }
}
</script>
