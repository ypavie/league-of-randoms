<template>
  <div class="flex items-center">
    <label
      for="dots"
      class="w-32 dark:text-gray-400 text-gray-700 font-bold text-right flex-shrink-0"
    >
      Dots:
    </label>
    <div class="flex-grow mx-2 flex">
      <div
        v-for="(option, index) in options"
        :key="option"
        :class="{
          'grow mr-2': index < options.length - 1,
          grow: index === options.length - 1
        }"
      >
        <input
          type="radio"
          :id="'dots_' + option"
          :value="option"
          v-model="selectedOption"
          @change="updateDots"
          name="stacks"
          class="hidden"
        />
        <label
          :for="'dots_' + option"
          class="cursor-pointer block px-4 w-full py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white flex items-center justify-center"
          :class="{ 'bg-blue-500 text-white': selectedOption === option }"
        >
          {{ option }}
        </label>
      </div>
    </div>
    <button
      @click="resetDots"
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
  name: 'DotsFilter',
  data() {
    return {
      options: ['Yes', 'No'],
      selectedOption: ''
    }
  },
  methods: {
    updateDots() {
      // this.$emit('update-filter', { dots: this.selectedOption })
      // emit true or false
      this.$emit('update-filter', { dots: this.selectedOption === 'Yes' })
    },
    resetDots() {
      this.selectedOption = ''
      this.updateDots()
    }
  }
}
</script>
