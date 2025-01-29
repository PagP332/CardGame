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
  }
  // console.log(rarity.RarityList[chooseRarity(rarityChance)])
  return card
}
