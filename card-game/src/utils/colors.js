export const Empty = "border-gray-500/50"
export const Tier1 = "border-gray-500"
export const Tier2 = "border-green-500"
export const Tier3 = "border-sky-500"
export const Tier4 = "border-violet-500"
export const Tier5 = "border-amber-500"
export const colorList = [Empty, Tier1, Tier2, Tier3, Tier4, Tier5]

export function debug_genRandomColor() {
  const rand = Math.floor(Math.random() * 6)
  return colorList[rand]
}

export function colorIndex(i) {
  return colorList[i]
}
