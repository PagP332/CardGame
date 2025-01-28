export const Empty = "border-gray-500/50"
export const Tier1 = "border-gray-500"
export const Tier2 = "border-green-500"
export const Tier3 = "border-sky-500"
export const Tier4 = "border-violet-500 drop-shadow-[0_0_0.9rem_#8b5cf6]"
export const Tier5 = "border-amber-500 drop-shadow-[0_0_0.9rem_#f59e0b]"
export const colorList = [Empty, Tier1, Tier2, Tier3, Tier4, Tier5]

export function debug_genRandomColor() {
  const rand = Math.floor(Math.random() * 6)
  return colorList[rand]
}

export function colorIndex(i) {
  return colorList[i]
}
