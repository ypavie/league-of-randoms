<template>
  <div class="flex items-center">
    <label
      for="region"
      class="w-32 dark:text-gray-400 text-gray-700 font-bold text-right flex-shrink-0"
    >
      Region:
    </label>
    <select
      v-model="selectedRegion"
      @change="updateRegion"
      id="region"
      name="region"
      class="block w-full mx-2 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white cursor-pointer flex-grow"
    >
      <option value="">Select Region</option>
      <option value="Bandle City">Bandle City</option>
      <option value="Bilgewater">Bilgewater</option>
      <option value="Camavor">Camavor</option>
      <option value="Demacia">Demacia</option>
      <option value="Freljord">Freljord</option>
      <option value="Ionia">Ionia</option>
      <option value="Ixtal">Ixtal</option>
      <option value="Noxus">Noxus</option>
      <option value="Piltover">Piltover</option>
      <option value="Runeterra">Runeterra</option>
      <option value="Shadow Isles">Shadow Isles</option>
      <option value="Shurima">Shurima</option>
      <option value="Targon">Targon</option>
      <option value="Void">Void</option>
      <option value="Zaun">Zaun</option>
    </select>

    <button
      @click="resetRegion"
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
  name: 'RegionFilter',
  data() {
    return {
      selectedRegion: ''
    }
  },
  methods: {
    updateRegion() {
      this.$emit('update-filter', { region: this.selectedRegion })
    },
    resetRegion() {
      this.selectedRegion = ''
      this.updateRegion()
    }
  }
}
</script>
