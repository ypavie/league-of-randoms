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
        :key="option.value"
        :class="{
          'grow mr-2': index < options.length - 1,
          grow: index === options.length - 1
        }"
      >
        <input
          type="radio"
          :id="name + '_' + option.value"
          :value="option.value"
          v-model="selectedOption"
          @change="updateOption(option.value)"
          :name="name"
          class="hidden"
        />
        <label
          :for="name + '_' + option.value"
          :class="[
            'cursor-pointer block px-4 py-2 border rounded-md shadow-sm flex items-center justify-center',
            selectedOption === option.value
              ? 'bg-gray-300 text-gray-700'
              : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-white'
          ]"
          @click="updateOption(option.value)"
        >
          {{ option.label }}
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
    },
    options: {
      type: Array,
      default: () => [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    }
  },
  data() {
    return {
      selectedOption: this.modelValue
    }
  },
  methods: {
    updateOption(value) {
      if (this.selectedOption === value) {
        this.selectedOption = ''
      } else {
        this.selectedOption = value
      }

      let valueToEmit
      if (this.selectedOption === 'Yes') {
        valueToEmit = true
      } else if (this.selectedOption === 'No') {
        valueToEmit = false
      } else {
        valueToEmit = this.selectedOption
      }

      this.$emit('update-filter', { [this.name]: valueToEmit })
    },
    resetOption() {
      this.selectedOption = ''
      this.updateOption('')
    }
  }
}
</script>
