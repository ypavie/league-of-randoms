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
    <div v-if="showFilters" class="grid grid-cols-2 gap-4 pt-4">
      <div v-for="(filterValues, filterName) in filters" :key="filterName">
        <div class="flex items-center">
          <label :for="filterName" class="block w-24 dark:text-gray-400 text-gray-700 font-bold"
            >{{ filterName }}:</label
          >
          <!-- SELECT MENU -->
          <select
            v-model="currentFilters[filterName]"
            @change="udpateSelect(filterName)"
            :id="filterName"
            :name="filterName"
            class="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white cursor-pointer"
          >
            <option value="">Select {{ filterName }}</option>
            <option v-for="value in filterValues" :key="value" :value="value">{{ value }}</option>
          </select>

          <!-- RESET BUTTON -->
          <button
            @click="resetFilter(filterName)"
            class="ml-2 p-1 text-red-500 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
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
      </div>
      <!-- <div class="flex items-center">
        <ReleaseYearFilter ref="releaseYear" />
      </div> -->
    </div>
  </div>
</template>

<script>
import ReleaseYearFilter from './ReleaseYearFilter.vue'

export default {
  name: 'AdvancedFilters',
  components: {
    ReleaseYearFilter
  },
  data() {
    return {
      showFilters: false,
      currentFilters: {},
      currentFilterTypes: ['summs', 'roles', 'runes', 'items'],
      filters: {
        Gender: ['Female', 'Male', 'Other'],
        Mana: ['Mana', 'Manaless'],
        Class: ['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'],
        Range: ['Melee', 'Range'],
        Species: [
          'Aspect',
          'Celestial',
          'Chemically Altered',
          'Cyborg',
          'Darkin',
          'Demon',
          'God',
          'God-Warrior',
          'Golem',
          'Human',
          'Iceborn',
          'Magically Altered',
          'Magicborn',
          'Revenant',
          'Spirit',
          'Spiritualist',
          'Undead',
          'Unknown',
          'Vastayan',
          'Void-Being',
          'Yordle'
        ],
        Region: [
          'Bandle City',
          'Bilgewater',
          'Camavor',
          'Demacia',
          'Freljord',
          'Icathia',
          'Ionia',
          'Ixtal',
          'Noxus',
          'Piltover',
          'Runeterra',
          'Shadow Isles',
          'Shurima',
          'Targon',
          'Void',
          'Zaun'
        ]
        // Skinlines: [
        //   'Academy',
        //   'Albion',
        //   'Anima Squad',
        //   'Arcade: Battle Bosses',
        //   'Arcade: Heroes',
        //   'Arcana',
        //   'Arcane',
        //   'Arcanists',
        //   'Arclight',
        //   'Ashen Knights',
        //   'Astronauts',
        //   'Battle Academia',
        //   'Battle Queens',
        //   'Battle of the God-Kings',
        //   'Battlecast',
        //   'Bees!',
        //   'Beta',
        //   'Bewitching',
        //   'Bilgewater: Burning Tides',
        //   'Bilgewater: Curse of the Drowned',
        //   'Bilgewater: Mercs',
        //   'Black Rose Group',
        //   'Blackfrost',
        //   'Blood Moon',
        //   'Bloodstone',
        //   'Broken Covenant',
        //   'Cafe Cuties',
        //   'Cats Versus Dogs',
        //   'Challenger',
        //   'Chronicle',
        //   "Collector's Edition",
        //   'Commando',
        //   'Conqueror',
        //   'Cops and Robbers',
        //   'Cosmic',
        //   'Cottontail',
        //   'Coven',
        //   'Crime City',
        //   'Crime City Nightmare',
        //   'Crimson Elite',
        //   'Crystal Rose',
        //   'Crystalis Indomitus',
        //   'Crystalis Motus',
        //   'Culinary Masters',
        //   'Curse of the Void',
        //   'Cyber Pop',
        //   'DJ',
        //   'Dark Star',
        //   'Dawnbringer',
        //   'Day Job',
        //   'Death Blossom',
        //   'Death Sworn',
        //   'Debonair',
        //   'Definitely Not',
        //   'Demacia Vice',
        //   'Demonic',
        //   'Dragon World',
        //   'Dragonmancers',
        //   'Dreadknights',
        //   'Dreadnova',
        //   'Dunkmaster',
        //   'Eclipse',
        //   'Elderwood',
        //   'Elementalist',
        //   'Empyrean',
        //   'Eternum',
        //   'Fables',
        //   'Faerie Court',
        //   'Forgotten Depths',
        //   'Freljord',
        //   'Fright Night',
        //   'Galactic',
        //   'Glacial',
        //   'Goth',
        //   'Guardian of the Sands',
        //   'HEARTSTEEL',
        //   'Headhunter',
        //   'Heartbreakers',
        //   'Heartthrobs and Heartaches',
        //   'Heavenscale',
        //   'Heavy Metal',
        //   'Hextech',
        //   'High Noon',
        //   'High Society',
        //   'Highstakes',
        //   'Immortal Journey',
        //   'Infernal',
        //   'Inkshadow',
        //   'Invaders',
        //   'Justicar',
        //   'K/DA',
        //   'Kaiju',
        //   'Ilusión',
        //   'Lancer',
        //   'Legacy',
        //   'Luchador',
        //   'Lunar Beast',
        //   'Lunar Revel',
        //   'Lunar Revel: Firecracker',
        //   'Lunar Revel: Warring Kingdoms',
        //   'Mad Scientists',
        //   'Marauder',
        //   'Mecha',
        //   'Mecha Kingdoms',
        //   'Medieval',
        //   'Monster Tamers',
        //   'Mythmaker',
        //   'Nightbringer',
        //   'Nightbringer and Dawnbringer',
        //   'Ocean Song',
        //   'Odyssey',
        //   'Omega Squad',
        //   'Omen of the Dark',
        //   'Order of the Lotus',
        //   'Otherroads',
        //   'PAX',
        //   'PROJECT',
        //   'Papercraft',
        //   'Pentakill',
        //   'Pentakill III: The Lost Chapter',
        //   'Pharaoh',
        //   'Phoenixmancers',
        //   'Piltover Customs',
        //   'Pool Party',
        //   'Popstar',
        //   'Porcelain',
        //   'Praetorian',
        //   'Prehistoric Hunters',
        //   'Primal Ambush',
        //   'Program',
        //   'PsyOps',
        //   'Pulsefire',
        //   'Rift Hospital',
        //   'Rift Quest',
        //   'Riot',
        //   'Road Warrior',
        //   'Ruination',
        //   'Ruined',
        //   'Sentinels of Light',
        //   'Shan Hai Scrolls',
        //   'Shockblade',
        //   'Silver Age',
        //   'Snow Day',
        //   'Snow Moon',
        //   'Snowdown Showdown',
        //   'Soccer Cup',
        //   'Soul Fighter',
        //   'Soulstealer',
        //   'Space Groove',
        //   'Spirit Blossom',
        //   'Spirit Guard',
        //   'Star Guardian Season 1',
        //   'Star Guardian Season 2',
        //   'Star Guardian Season 3',
        //   'Star Guardian Season 4',
        //   'Steel Legion',
        //   'Steel Valkyries',
        //   'Storybook',
        //   'Street Demons',
        //   'Sugar Rush',
        //   'Super Galaxy',
        //   'Surprise Party',
        //   'Three Honors',
        //   'Thunder Lord',
        //   'Toy Box',
        //   'Traditional',
        //   'Trick-or-Treat',
        //   'Triumphant',
        //   'True Damage',
        //   'True Warrior',
        //   'Urf the Manatee',
        //   'Vandal',
        //   'Victorious',
        //   'Warden',
        //   'Winter Sports',
        //   'Winter Wonder',
        //   'Winterblessed',
        //   'Withered Rose',
        //   'Woad',
        //   'Wonders of the World',
        //   'World Champions: 2011',
        //   'World Champions: 2012',
        //   'World Champions: 2013',
        //   'World Champions: 2014',
        //   'World Champions: 2015',
        //   'World Champions: 2016',
        //   'World Champions: 2017',
        //   'World Champions: 2018',
        //   'World Champions: 2019',
        //   'World Champions: 2020',
        //   'World Champions: 2021',
        //   'World Champions: 2022',
        //   'World Championship',
        //   'Worldbreaker',
        //   'Zenith Games',
        //   'Zombies VS Slayers',
        //   'arcticops'
        // ]
      }
    }
  },
  mounted() {
    this.currentFilters = Object.keys(this.filters).reduce((acc, filterName) => {
      acc[filterName] = ''
      return acc
    }, {})
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    resetFilter(filterName) {
      this.currentFilters[filterName] = ''
      document.getElementById(filterName).selectedIndex = 0
      this.udpateSelect(filterName)
    },
    getFilters() {
      const filters = Object.keys(this.currentFilters).reduce((acc, filterName) => {
        acc[filterName.toLowerCase()] = this.currentFilters[filterName]
        return acc
      }, {})

      return filters
    },
    udpateSelect(filterName) {
      this.currentFilters[filterName] = document.getElementById(filterName).value
      this.$emit('update-filter', this.getFilters())
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
