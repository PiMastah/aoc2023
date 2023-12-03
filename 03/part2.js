import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')

const grid = input.split(EOL)

const asterisks = []
const numbers = []

const re1 = /[0-9]+/g
const re2 = /\*/g
let m

grid.forEach((l, y) => {
  while ((m = re1.exec(l)) !== null) {
    numbers.push([m.index, y, m[0]])
  }
  while ((m = re2.exec(l)) !== null) {
    asterisks.push([+m.index, y])
  }
})

const solution = asterisks.reduce((sum, [x, y]) => {
  const adjacents = numbers.filter(([nx, ny, n]) => ny - 1 <= y
    && y <= ny + 1
    && nx - 1 <= x
    && x <= nx + n.length
  ).map(a => +a[2])

  if (adjacents.length == 2) sum += adjacents[0] * adjacents[1]

  return sum
}, 0)

console.log(solution)