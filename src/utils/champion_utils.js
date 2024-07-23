import champions from '@/assets/champions.json'
import summonerSpells from '@/assets/summonerSpells.json'
import runes from '@/assets/runes.json'

import { generateItemBuild, generateStarterItem } from '@/utils/item_utils'

function getRandomRunes() {
  let random_runes = {}
  const rune_keys = Object.keys(runes)
  const random_main_tree_index = Math.floor(Math.random() * (rune_keys.length - 1))

  const main_tree = rune_keys[random_main_tree_index]
  const main_tree_data = runes[main_tree]

  random_runes.rune_main_tree = [main_tree, main_tree_data.icon]
  let randomIndex = Math.floor(Math.random() * 3)
  random_runes.rune_main_keystone = [
    main_tree_data.slots[0].runes[randomIndex].key,
    main_tree_data.slots[0].runes[randomIndex].icon
  ]
  randomIndex = Math.floor(Math.random() * 3)
  random_runes.rune_main_1 = [
    main_tree_data.slots[1].runes[randomIndex].key,
    main_tree_data.slots[1].runes[randomIndex].icon
  ]
  randomIndex = Math.floor(Math.random() * 3)
  random_runes.rune_main_2 = [
    main_tree_data.slots[2].runes[randomIndex].key,
    main_tree_data.slots[2].runes[randomIndex].icon
  ]
  randomIndex = Math.floor(Math.random() * 3)
  random_runes.rune_main_3 = [
    main_tree_data.slots[3].runes[randomIndex].key,
    main_tree_data.slots[3].runes[randomIndex].icon
  ]

  let random_secondary_tree_index = Math.floor(Math.random() * (rune_keys.length - 1))
  while (random_secondary_tree_index === random_main_tree_index) {
    random_secondary_tree_index = Math.floor(Math.random() * (rune_keys.length - 1))
  }

  const secondary_tree = rune_keys[random_secondary_tree_index]
  const secondary_tree_data = runes[secondary_tree]

  random_runes.rune_secondary_tree = [secondary_tree, secondary_tree_data.icon]
  randomIndex = Math.floor(Math.random() * 3)
  random_runes.rune_secondary_1 = [
    secondary_tree_data.slots[1].runes[randomIndex].key,
    secondary_tree_data.slots[1].runes[randomIndex].icon
  ]
  randomIndex = Math.floor(Math.random() * 3)
  random_runes.rune_secondary_2 = [
    secondary_tree_data.slots[2].runes[randomIndex].key,
    secondary_tree_data.slots[2].runes[randomIndex].icon
  ]

  const shard_tree = rune_keys[rune_keys.length - 1]
  const shard_tree_data = runes[shard_tree]

  randomIndex = Math.floor(Math.random() * 3)
  random_runes.rune_shard_1 = [
    shard_tree_data.slots[0].runes[randomIndex].key,
    shard_tree_data.slots[0].runes[randomIndex].icon
  ]
  randomIndex = Math.floor(Math.random() * 3)
  random_runes.rune_shard_2 = [
    shard_tree_data.slots[1].runes[randomIndex].key,
    shard_tree_data.slots[1].runes[randomIndex].icon
  ]
  randomIndex = Math.floor(Math.random() * 3)
  random_runes.rune_shard_3 = [
    shard_tree_data.slots[2].runes[randomIndex].key,
    shard_tree_data.slots[2].runes[randomIndex].icon
  ]

  return random_runes
}

function getSummonerSpells(role) {
  role = role.toLowerCase()
  const summoner_spell_keys = Object.keys(summonerSpells)
  let randomIndex1, randomIndex2

  if (role === 'jungle') {
    randomIndex1 = summoner_spell_keys.indexOf('smite')
    randomIndex2 = Math.floor(Math.random() * summoner_spell_keys.length)
    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * summoner_spell_keys.length)
    }
  } else {
    randomIndex1 = Math.floor(Math.random() * summoner_spell_keys.length)
    while (summoner_spell_keys[randomIndex1] === 'smite') {
      randomIndex1 = Math.floor(Math.random() * summoner_spell_keys.length)
    }
    randomIndex2 = Math.floor(Math.random() * summoner_spell_keys.length)
    while (summoner_spell_keys[randomIndex2] === 'smite' || randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * summoner_spell_keys.length)
    }
  }

  const summoner_spell_1 = summonerSpells[summoner_spell_keys[randomIndex1]]
  const summoner_spell_2 = summonerSpells[summoner_spell_keys[randomIndex2]]

  const summoner_spells = {
    summoner_spell_1: [summoner_spell_1.name, summoner_spell_1.icon],
    summoner_spell_2: [summoner_spell_2.name, summoner_spell_2.icon]
  }

  return summoner_spells
}
function getRole(roles) {
  if (!roles || roles.length === 0) {
    roles = ['top', 'jungle', 'middle', 'bottom', 'support']
  } else {
    roles = roles.map((role) => role?.toLowerCase())
  }
  const randomIndex = Math.floor(Math.random() * roles.length)
  return [
    roles[randomIndex],
    'https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/lanes/' +
      roles[randomIndex] +
      '.png'
  ]
}

function getSpellToMax(spells) {
  // const spell = spells?.[0] || 'defaultSpell'
  // random from 0 to 2
  const randomIndex = Math.floor(Math.random() * 3)
  return [
    randomIndex,
    'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/spell/' + spells[randomIndex] + '.png'
  ]
}

function getItems(role) {
  const build = generateItemBuild('', role) || []
  const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.14.1/img/item/'

  return build.map((item) => [item?.name || 'defaultItem', `${baseUrl}${item?.id || '0'}.png`])
}

function getStarterItem(role) {
  const item = generateStarterItem(role) || 'defaultItem'
  return [item, `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/item/${item}.png`]
}

export function getChampionNamesFromFilters(filters) {
  let championsList = Object.keys(champions)
  if (filters !== undefined) {
    if (filters.gender !== '') {
      championsList = championsList.filter((key) => champions[key].gender === filters.gender)
    }
    if (filters.mana !== '') {
      championsList = championsList.filter((key) => champions[key].mana === filters.mana)
    }
    if (filters.class !== '') {
      championsList = championsList.filter((key) => champions[key].class.includes(filters.class))
    }
    if (filters.range !== '') {
      championsList = championsList.filter((key) => champions[key].range.includes(filters.range))
    }
    if (filters.species !== '') {
      championsList = championsList.filter((key) =>
        champions[key].species.includes(filters.species)
      )
    }
    if (filters.region !== '') {
      championsList = championsList.filter((key) => champions[key].region.includes(filters.region))
    }
    return championsList.map((key) => champions[key].name)
  }
}

export function getRandomChampion(searchText, filters) {
  let championsList = Object.keys(champions)
  if (filters !== undefined) {
    if (filters.gender !== '') {
      championsList = championsList.filter((key) => champions[key].gender === filters.gender)
    }
    if (filters.mana !== '') {
      championsList = championsList.filter((key) => champions[key].mana === filters.mana)
    }
    if (filters.class !== '') {
      championsList = championsList.filter((key) => champions[key].class.includes(filters.class))
    }
    if (filters.range !== '') {
      championsList = championsList.filter((key) => champions[key].range.includes(filters.range))
    }
    if (filters.species !== '') {
      championsList = championsList.filter((key) =>
        champions[key].species.includes(filters.species)
      )
    }
    if (filters.region !== '') {
      championsList = championsList.filter((key) => champions[key].region.includes(filters.region))
    }
    // if (filters.skinlines !== '') {
    //   championsList = championsList.filter(
    //     (key) => champions[key].skinlines && champions[key].skinlines.includes(filters.skinlines)
    //   )
    // }
    // championsList = championsList.filter(
    //   (key) =>
    //     champions[key].year >= filters.releaseyearmin &&
    //     champions[key].year <= filters.releaseyearmax
    // )

    const randomIndex = Math.floor(Math.random() * championsList.length)
    return champions[championsList[randomIndex]]
  }

  if (championsList.length === 0) {
    const randomIndex = Math.floor(Math.random() * Object.keys(champions).length)
    return champions[Object.keys(champions)[randomIndex]]
  }

  const randomIndex = Math.floor(Math.random() * championsList.length)
  return champions[championsList[randomIndex]]
}

export function getChampion_tofix(filters) {
  let champion = getRandomChampion(filters.searchText, filters)
  champion.runes = getRandomRunes()
  champion.role = getRole(filters.lanes)
  champion.starter_item = getStarterItem(champion.role[0])
  champion.spell_to_max = getSpellToMax(champion.spells)
  champion.icon = `https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/${champion.id}.png`

  const summoner_spells = getSummonerSpells(champion.role[0])
  champion.summoner_spell_1 = summoner_spells.summoner_spell_1
  champion.summoner_spell_2 = summoner_spells.summoner_spell_2

  const items = getItems(champion.role[0])
  champion.item_1 = items[0]
  champion.item_2 = items[1]
  champion.item_3 = items[2]
  champion.item_4 = items[3]
  champion.item_5 = items[4]
  champion.item_6 = items[5]

  return champion
}

// export function getChampion_tofix() {
//   let champion = getRandomChampion()

//   champion.runes = getRandomRunes()
//   champion.role = getRole()
//   champion.starter_item = getStarterItem(champion.role[0])
//   champion.spell_to_max = getSpellToMax(champion.spells)
//   champion.icon = `https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/${champion.id}.png`

//   const summoner_spells = getSummonerSpells(champion.role[0])
//   champion.summoner_spell_1 = summoner_spells.summoner_spell_1
//   champion.summoner_spell_2 = summoner_spells.summoner_spell_2

//   const items = getItems(champion.role[0])
//   champion.item_1 = items[0]
//   champion.item_2 = items[1]
//   champion.item_3 = items[2]
//   champion.item_4 = items[3]
//   champion.item_5 = items[4]
//   champion.item_6 = items[5]

//   return champion
// }

export function getChampions() {
  return champions
}
