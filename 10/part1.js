import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split(''))

let start

const map = input.reduce((m, l, y) => {
  m[y] = l.reduce((o, c, x) => {
    if (c !== '.') o[x] = c
    if (o[x] === 'S') start = [x, y]
    return o
  }, {})
  return m
}, {})

const connects = (x, y, nx, ny) => {
  const s1 = map[y] && map[y][x]
  const s2 = map[ny] && map[ny][nx]

  if (!s1 || !s2) return false

  if (y == ny) {
    if (nx-x == 1) return ['-', 'L', 'S', 'F'].includes(s1) && ['-', 'J', 'S', '7'].includes(s2)
    if (nx-x == -1) return ['-', 'L', 'S', 'F'].includes(s2) && ['-', 'J', 'S', '7'].includes(s1)
  } else if (x == nx) {
    if (ny-y == 1) return ['|', '7', 'S', 'F'].includes(s1) && ['|', 'J', 'S', 'L'].includes(s2)
    if (ny-y == -1) return ['|', '7', 'S', 'F'].includes(s2) && ['|', 'J', 'S', 'L'].includes(s1)
  }
  return false
}

const visited = new Set()
const dists = {}

const toCheck = [[start, 0]]

while (toCheck.length > 0) {
  const [[x, y], d] = toCheck.shift()

  const s = `${x}/${y}`

  if (visited.has(s)) continue

  visited.add(s)
  dists[s] = d

  const neighbours = [[x-1, y],[x+1, y],[x, y-1],[x, y+1]].filter(([nx, ny]) => {
    let ns = `${nx}/${ny}`

    return !visited.has(ns) && undefined !== map[ny] && undefined !== map[ny][nx] && connects(x, y, nx, ny)
  })

  toCheck.push(...neighbours.map(n => [n, d+1]))
}

console.log(Math.max.apply([], Object.values(dists)))