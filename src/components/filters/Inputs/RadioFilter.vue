<template>
  <div class="flex items-center">
    <label
      :for="name"
      class="w-32 dark:text-gray-400 text-gray-700 font-bold text-right flex-shrink-0"
    >
      {{ label }}:
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
          :id="name + '_' + option"
          :value="option"
          v-model="selectedOption"
          @change="updateOption(option)"
          :name="name"
          class="hidden"
        />
        <label
          :for="name + '_' + option"
          class="cursor-pointer block px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white flex items-center justify-center"
          :class="{
            'bg-gray-100 dark:bg-gray-500 text-black dark:text-gray-300': selectedOption === option,
            'bg-blue-500 text-white': selectedOption !== option
          }"
          @click="updateOption(option)"
        >
          {{ option }}
        </label>
      </div>
    </div>
    <button
      @click="resetOption"
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
  name: 'RadioFilter',
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: ['Yes', 'No'],
      selectedOption: this.modelValue
    }
  },
  methods: {
    updateOption(option) {
      if (this.selectedOption === option) {
        this.selectedOption = ''
      } else {
        this.selectedOption = option
      }
      const value = this.selectedOption === 'Yes' ? true : this.selectedOption === 'No' ? false : ''
      this.$emit('update-filter', { [this.name]: value })
    },
    resetOption() {
      this.selectedOption = ''
      this.updateOption()
    }
  }
}
</script>
