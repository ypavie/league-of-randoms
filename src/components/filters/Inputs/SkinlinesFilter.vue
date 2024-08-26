<template>
  <div class="flex items-center">
    <label
      for="skinlines"
      class="w-32 dark:text-gray-400 text-gray-700 font-bold text-right flex-shrink-0"
    >
      Skinlines:
    </label>
    <select
      v-model="selectedSkinline"
      @change="updateSkinline"
      id="skinlines"
      name="skinlines"
      class="block w-full mx-2 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white cursor-pointer flex-grow"
    >
      <option value="">Select Skinline</option>
      <option value="Academy">Academy</option>
      <option value="Anima Squad">Anima Squad</option>
      <option value="Arcade: Battle">Arcade: Battle</option>
      <option value="Arcade: Heroes">Arcade: Heroes</option>
      <option value="Arcana">Arcana</option>
      <option value="Arcane">Arcane</option>
      <option value="Arcanists">Arcanists</option>
      <option value="Arclight">Arclight</option>
      <option value="Arcticops">Arcticops</option>
      <option value="Ashen Knights">Ashen Knights</option>
      <option value="Astronauts">Astronauts</option>
      <option value="Battle Academia">Battle Academia</option>
      <option value="Battle Queens">Battle Queens</option>
      <option value="Battlecast">Battlecast</option>
      <option value="Bees!">Bees!</option>
      <option value="Bewitching">Bewitching</option>
      <option value="Bilgewater: Burning">Bilgewater: Burning</option>
      <option value="Black Rose">Black Rose</option>
      <option value="Blackfrost">Blackfrost</option>
      <option value="Blood Moon">Blood Moon</option>
      <option value="Bloodstone">Bloodstone</option>
      <option value="Cafe Cuties">Cafe Cuties</option>
      <option value="Cats Versus">Cats Versus</option>
      <option value="Commando">Commando</option>
      <option value="Conqueror">Conqueror</option>
      <option value="Cops and">Cops and</option>
      <option value="Cosmic">Cosmic</option>
      <option value="Coven">Coven</option>
      <option value="Crime City">Crime City</option>
      <option value="Culinary Masters">Culinary Masters</option>
      <option value="Dark Star">Dark Star</option>
      <option value="Day Job">Day Job</option>
      <option value="Death Sworn">Death Sworn</option>
      <option value="Debonair">Debonair</option>
      <option value="Definitely Not">Definitely Not</option>
      <option value="Demonic">Demonic</option>
      <option value="Dragon World">Dragon World</option>
      <option value="Dragonmancers">Dragonmancers</option>
      <option value="Eclipse">Eclipse</option>
      <option value="Elderwood">Elderwood</option>
      <option value="Empyrean">Empyrean</option>
      <option value="Fables">Fables</option>
      <option value="Faerie Court">Faerie Court</option>
      <option value="Forgotten Depths">Forgotten Depths</option>
      <option value="Freljord">Freljord</option>
      <option value="Fright Night">Fright Night</option>
      <option value="Guardian of">Guardian of</option>
      <option value="Headhunter">Headhunter</option>
      <option value="Heartbreakers">Heartbreakers</option>
      <option value="HEARTSTEEL">HEARTSTEEL</option>
      <option value="Heavenscale">Heavenscale</option>
      <option value="Heavy Metal">Heavy Metal</option>
      <option value="Hextech">Hextech</option>
      <option value="High Noon">High Noon</option>
      <option value="High Society">High Society</option>
      <option value="Highstakes">Highstakes</option>
      <option value="Immortal Journey">Immortal Journey</option>
      <option value="Infernal">Infernal</option>
      <option value="Inkshadow">Inkshadow</option>
      <option value="K/DA">K/DA</option>
      <option value="La Ilusión">La Ilusión</option>
      <option value="Legacy">Legacy</option>
      <option value="Lunar Beast">Lunar Beast</option>
      <option value="Lunar Revel">Lunar Revel</option>
      <option value="Marauder">Marauder</option>
      <option value="Mecha">Mecha</option>
      <option value="Medieval">Medieval</option>
      <option value="Mythmaker">Mythmaker</option>
      <option value="Nightbringer and">Nightbringer and</option>
      <option value="Ocean Song">Ocean Song</option>
      <option value="Odyssey">Odyssey</option>
      <option value="Omega Squad">Omega Squad</option>
      <option value="Omen of">Omen of</option>
      <option value="Otherroads">Otherroads</option>
      <option value="Pentakill">Pentakill</option>
      <option value="Pool Party">Pool Party</option>
      <option value="Porcelain">Porcelain</option>
      <option value="Prehistoric Hunters">Prehistoric Hunters</option>
      <option value="Program">Program</option>
      <option value="PROJECT">PROJECT</option>
      <option value="PsyOps">PsyOps</option>
      <option value="Pulsefire">Pulsefire</option>
      <option value="Rift Quest">Rift Quest</option>
      <option value="Riot">Riot</option>
      <option value="Road Warrior">Road Warrior</option>
      <option value="Ruined">Ruined</option>
      <option value="Sentinels of">Sentinels of</option>
      <option value="Shan Hai">Shan Hai</option>
      <option value="Silver Age">Silver Age</option>
      <option value="Snow Day">Snow Day</option>
      <option value="Snow Moon">Snow Moon</option>
      <option value="Snowdown Showdown">Snowdown Showdown</option>
      <option value="Soccer Cup">Soccer Cup</option>
      <option value="Soul Fighter">Soul Fighter</option>
      <option value="Space Groove">Space Groove</option>
      <option value="Spirit Blossom">Spirit Blossom</option>
      <option value="Star Guardian">Star Guardian</option>
      <option value="Steel Valkyries">Steel Valkyries</option>
      <option value="Storybook">Storybook</option>
      <option value="Street Demons">Street Demons</option>
      <option value="Sugar Rush">Sugar Rush</option>
      <option value="Super Galaxy">Super Galaxy</option>
      <option value="Toy Box">Toy Box</option>
      <option value="Trick-or-Treat">Trick-or-Treat</option>
      <option value="True Damage">True Damage</option>
      <option value="Vandal">Vandal</option>
      <option value="Victorious">Victorious</option>
      <option value="Warden">Warden</option>
      <option value="Winter Sports">Winter Sports</option>
      <option value="Winter Wonder">Winter Wonder</option>
      <option value="Winterblessed">Winterblessed</option>
      <option value="Woad">Woad</option>
      <option value="Wonders of">Wonders of</option>
      <option value="World Champions">World Champions</option>
      <option value="Worldbreaker">Worldbreaker</option>
      <option value="Zombies VS">Zombies VS</option>
    </select>

    <button
      @click="resetSkinline"
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
  name: 'SkinlinesFilter',
  data() {
    return {
      selectedSkinline: ''
    }
  },
  mounted() {
    const options = Array.from(this.$el.querySelectorAll('option')).slice(1)
    options.sort((a, b) => a.text.localeCompare(b.text))
    options.forEach((option) => this.$el.querySelector('select').appendChild(option))
  },
  methods: {
    updateSkinline() {
      this.$emit('update-filter', { skinlines: this.selectedSkinline })
    },
    resetSkinline() {
      this.selectedSkinline = ''
      this.updateSkinline()
    }
  }
}
</script>
