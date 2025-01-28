import * as colors from "./colors"

export const Empty = { color: colors.Empty, value: 0 }
export const Tier1 = { color: colors.Tier1, value: 1 }
export const Tier2 = { color: colors.Tier2, value: 3 }
export const Tier3 = { color: colors.Tier3, value: 9 }
export const Tier4 = { color: colors.Tier4, value: 27 }
export const Tier5 = { color: colors.Tier5, value: 81 }
export const RarityList = [Tier1, Tier2, Tier3, Tier4, Tier5]

export const RollChance = [
  { level: 1, chances: { 0: 1, 1: 0, 2: 0, 3: 0, 4: 0 } },
  { level: 2, chances: { 0: 0.9, 1: 0.1, 2: 0, 3: 0, 4: 0 } },
  { level: 3, chances: { 0: 0.75, 1: 0.25, 2: 0, 3: 0, 4: 0 } },
  { level: 4, chances: { 0: 0.55, 1: 0.3, 2: 0.15, 3: 0, 4: 0 } },
  { level: 5, chances: { 0: 0.45, 1: 0.33, 2: 0.2, 3: 0.02, 4: 0 } },
  { level: 6, chances: { 0: 0.3, 1: 0.4, 2: 0.25, 3: 0.5, 4: 0 } },
  { level: 7, chances: { 0: 0.19, 1: 0.3, 2: 0.35, 3: 0.1, 4: 0.01 } },
  { level: 8, chances: { 0: 0.18, 1: 0.25, 2: 0.32, 3: 0.22, 4: 0.03 } },
  { level: 9, chances: { 0: 0.1, 1: 0.2, 2: 0.25, 3: 0.35, 4: 0.1 } },
  { level: 10, chances: { 0: 0.05, 1: 0.1, 2: 0.2, 3: 0.4, 4: 0.25 } },
]
