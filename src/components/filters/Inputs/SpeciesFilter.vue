<template>
  <div class="flex items-center">
    <label
      for="species"
      class="w-32 dark:text-gray-400 text-gray-700 font-bold text-right flex-shrink-0"
    >
      Species:
    </label>
    <select
      v-model="selectedSpecies"
      @change="updateSpecies"
      id="species"
      name="species"
      class="block w-full mx-2 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white cursor-pointer flex-grow"
    >
      <option value="">Select Species</option>
      <option value="Aspect">Aspect</option>
      <option value="Celestial">Celestial</option>
      <option value="Chemically Altered">Chemically Altered</option>
      <option value="Cyborg">Cyborg</option>
      <option value="Darkin">Darkin</option>
      <option value="Demon">Demon</option>
      <option value="God">God</option>
      <option value="God-Warrior">God-Warrior</option>
      <option value="Golem">Golem</option>
      <option value="Human">Human</option>
      <option value="Iceborn">Iceborn</option>
      <option value="Magically Altered">Magically Altered</option>
      <option value="Magicborn">Magicborn</option>
      <option value="Revenant">Revenant</option>
      <option value="Spirit">Spirit</option>
      <option value="Spiritualist">Spiritualist</option>
      <option value="Undead">Undead</option>
      <option value="Unknown">Unknown</option>
      <option value="Vastayan">Vastayan</option>
      <option value="Void-Being">Void-Being</option>
      <option value="Yordle">Yordle</option>
    </select>

    <button
      @click="resetSpecies"
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
  name: 'SpeciesFilter',
  data() {
    return {
      selectedSpecies: ''
    }
  },
  methods: {
    updateSpecies() {
      this.$emit('update-filter', { species: this.selectedSpecies })
    },
    resetSpecies() {
      this.selectedSpecies = ''
      this.updateSpecies()
    }
  }
}
</script>
