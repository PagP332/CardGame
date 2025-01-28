export function generateList(list, number) {
  const result = []
  for (let i = 0; i < number; i++) {
    const randomIndex = Math.floor(Math.random() * list.length)
    result.push(list[randomIndex])
  }

  return result
}
