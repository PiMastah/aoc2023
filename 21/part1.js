import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)

let start
const walls = input.reduce((m, l, y) => l.split('').reduce((mm, c, x) => {
  if (c === '#') mm.add(`${x}/${y}`)
  if (c === 'S') start = [x, y]
  return mm
}, m), new Set())

const maxSteps = 64

const visited = new Map()
const toExplore = [[0, ...start]]

const n = [[-1, 0], [1, 0], [0, -1], [0, 1]]

while (toExplore.length > 0) {
  const [d, x, y] = toExplore.shift()

  if (d > maxSteps) continue

  const s = `${x}/${y}`

  if (walls.has(s) || visited.get(s) !== undefined) continue

  visited.set(s, d)

  toExplore.push(...n.map(([nx, ny]) => [d+1, x+nx, y+ny]))
}

console.log([...visited].filter(([_, d]) => d%2 == 0).length)