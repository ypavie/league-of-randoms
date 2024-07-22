import items from '@/assets/items.json'

const starter_passive = [
  'STARTER_NON_JUNGLE',
  'STARTER_JUNGLE',
  'STARTER_SUPPORT',
  'BOOTS',
  'SUPPORT'
]

function getItemsByUniquePassive(uniquePassive) {
  const itemsByUniquePassive = {}
  for (const key in items) {
    const item = items[key]
    if (item.unique_passive) {
      if (item.unique_passive.includes(uniquePassive)) {
        itemsByUniquePassive[key] = item
      }
    } else {
      if (uniquePassive === '') {
        itemsByUniquePassive[key] = item
      }
    }
  }
  return itemsByUniquePassive
}

function getDefaultItems() {
  const defaultItems = {}
  for (const key in items) {
    const item = items[key]
    if (
      !item.unique_passive ||
      !item.unique_passive.some((passive) => starter_passive.includes(passive))
    ) {
      defaultItems[key] = item
    }
  }
  return defaultItems
}

//TODO: Managed to get double hullbreaker, need to be fixed
function getRandomItemDefault(itemBuild, starterItem) {
  const defaultItems = getDefaultItems()
  const defaultKeys = Object.keys(defaultItems)
  const darkSealKey = '1082'
  const mejaisKey = '3041'
  while (true) {
    const randomKey = defaultKeys[Math.floor(Math.random() * defaultKeys.length)]

    if (starterItem === darkSealKey && randomKey === mejaisKey) {
      continue
    }

    if (itemBuild.includes(randomKey)) {
      continue
    }

    const item = defaultItems[randomKey]
    if (item.unique_passive) {
      if (!item.unique_passive.some((passive) => itemBuild.includes(passive))) {
        return randomKey
      }
    } else {
      return randomKey
    }
  }
}
function getRandomSupportItem() {
  const supportItems = getItemsByUniquePassive('SUPPORT')
  const supportKeys = Object.keys(supportItems)
  return supportKeys[Math.floor(Math.random() * supportKeys.length)]
}

function getStarterSupportItem() {
  const supportItems = getItemsByUniquePassive('STARTER_SUPPORT')
  const supportKeys = Object.keys(supportItems)
  return supportKeys[Math.floor(Math.random() * supportKeys.length)]
}

function getRandomStarterItem() {
  const starters = getItemsByUniquePassive('STARTER_NON_JUNGLE')
  const starterKeys = Object.keys(starters)
  return starterKeys[Math.floor(Math.random() * starterKeys.length)]
}

function getRandomJungleItem() {
  const jungleItems = getItemsByUniquePassive('STARTER_JUNGLE')
  const jungleKeys = Object.keys(jungleItems)
  return jungleKeys[Math.floor(Math.random() * jungleKeys.length)]
}

function getRandomBoot() {
  const boots = getItemsByUniquePassive('BOOTS')
  const bootsKeys = Object.keys(boots)
  return bootsKeys[Math.floor(Math.random() * bootsKeys.length)]
}

function getItemNameById(itemId) {
  return items[itemId].name
}

export function generateStarterItem(championRole) {
  if (championRole === 'jungle') {
    return getRandomJungleItem()
  } else if (championRole === 'support') {
    return getStarterSupportItem()
  } else {
    return getRandomStarterItem()
  }
}

export function generateItemBuild(championName, role) {
  let itemsBuild = []
  const buildPathSize = 6

  if (championName !== 'Cassiopeia') {
    itemsBuild.push(getRandomBoot())
  }

  // if support, get support item
  if (role === 'support') {
    itemsBuild.push(getRandomSupportItem())
  }

  while (itemsBuild.length < buildPathSize) {
    itemsBuild.push(getRandomItemDefault(itemsBuild, itemsBuild[0]))
  }

  return itemsBuild.map((itemId) => {
    return {
      id: itemId,
      name: getItemNameById(itemId)
    }
  })
}
