import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')

const grid = input.split(EOL)

const re = /[0-9]+/g
let m
let sum = 0

const allowed = Array(10).fill().map((_, i) => `${i}`).concat(['.'])

grid.map((l, y) => {
  while ((m = re.exec(l)) !== null) {
    const positions = []
    if (m.index > 0) {
      positions.push([-1, 0])
      if (y > 0) positions.push([-1, -1])
      if (y < grid.length-1) positions.push([-1, 1])
    }
    if (y > 0) positions.push(...Array(m[0].length).fill().map((_, i) => [i, -1]))
    if (y < grid.length-1) positions.push(...Array(m[0].length).fill().map((_, i) => [i, 1]))
    if (m.index < l.length - 2) {
      positions.push([m[0].length, 0])
      if (y > 0) positions.push([m[0].length, -1])
      if (y < grid.length-1) positions.push([m[0].length, 1])
    }

    if (positions.some(([xO, yO]) => !allowed.includes(grid[y + yO][m.index + xO]))) {
      sum += +m
    }
  }
})

console.log(sum)