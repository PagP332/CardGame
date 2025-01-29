import * as rarity from "./rarity"

export const cardSuits = ["A", "♥", "♠", "♣", "♦", "J", "Q", "K"]
export const tableDeck_size = 10
export const handDeck_size = 8

const defaultRarityChance = rarity.RollChance
export const emptyCard = (index) => {
  return {
    index: index,
    rarity: rarity.Empty,
    suit: " ",
    combinations: 0,
    multiplier: null,
  }
}

export function generateList(number, empty = false, rarityChance) {
  const result = []
  for (let i = 0; i < number; i++) {
    // const randomIndex = Math.floor(Math.random() * list.length)
    result.push(!empty ? createCard(i, rarityChance) : emptyCard(i))
  }
  return result
}

// Rejection Sampling based generation
// https://stackoverflow.com/questions/8435183/generate-a-weighted-random-number
function chooseRarity(rarityChance = defaultRarityChance) {
  var i,
    j,
    table = []
  for (i in rarityChance) {
    for (j = 0; j < rarityChance[i] * 10; j++) {
      table.push(i)
    }
  }
  return table[Math.floor(Math.random() * table.length)]
}

export function createCard(index, rarityChance = defaultRarityChance) {
  const card = {
    index: index,
    rarity: rarity.RarityList[chooseRarity(rarityChance)],
    suit: cardSuits[Math.floor(Math.random() * cardSuits.length)],
    combinations: 0,
    multiplier: 1,
  }
  // console.log(rarity.RarityList[chooseRarity(rarityChance)])
  return card
}

function findTriplets(list) {
  const map = new Map()

  for (var i = 0; i < list.length; i++) {
    const card = list[i]
    if (card.rarity.value !== 0) {
      const key = `${card.rarity.value}-${card.suit}-${card.multiplier}`

      if (!map.has(key)) {
        map.set(key, [])
      }

      map.get(key).push(i)

      if (map.get(key).length === 3) {
        return map.get(key).sort((a, b) => a - b)
      }
    }
  }

  return null
}

export function combineCards(list) {
  const triplets = findTriplets(list)
  if (triplets) {
    console.log("Triplets found on index ", triplets)
  }
  return triplets
}

export function getMultiplier(combinations) {
  const multi = [1, 1.1, 1.3, 1.5, 2, 3, 5, 10]
  if (combinations < multi.length) return multi[combinations]
  else return multi[multi.length]
}
