export const Empty = "border-gray-500/50"
export const Tier1 = "border-gray-500"
export const Tier2 = "border-green-500"
export const Tier3 = "border-sky-500"
export const Tier4 = "border-violet-500 drop-shadow-[0_0_0.3rem_#8b5cf6]"
export const Tier5 = "border-amber-500 drop-shadow-[0_0_0.9rem_#f59e0b]"
export const colorList = [Tier1, Tier2, Tier3, Tier4, Tier5]
export const textColor = [
  "text-white-500",
  "text-green-500",
  "text-sky-500",
  "text-violet-500 drop-shadow-[0_0_0.3rem_#8b5cf6]",
  "text-amber-500 drop-shadow-[0_0_0.9rem_#f59e0b]",
]

export function debug_genRandomColor() {
  const rand = Math.floor(Math.random() * 5)
  return colorList[rand]
}

export function colorIndex(i) {
  return colorList[i]
}
