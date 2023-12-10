import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)

let start

const map = input.map(l => l.split('')).reduce((m, l, y) => {
  return l.reduce((o, c, x) => {
    if (c !== '.') o[`${x}/${y}`] = c
    if (c === 'S') start = [x, y]
    return o
  }, m)
}, {})

const connects = (x, y, nx, ny) => {
  const s1 = map[`${x}/${y}`]
  const s2 = map[`${nx}/${ny}`]

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

    return !visited.has(ns) && undefined !== map[`${nx}/${ny}`] && connects(x, y, nx, ny)
  })

  toCheck.push(...neighbours.map(n => [n, d+1]))
}

const filteredMap = Object.entries(map).filter(([c]) => visited.has(c)).reduce((m, [s, v]) => {
  m[s] = v
  return m
}, {})

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[0].length; x++) {
    if (!visited.has(`${x}/${y}`)) input[y] = input[y].slice(0, x) + '.' + input[y].slice(x+1)
  }
}

// specific for my input, couldn't be bothered to generalize this as it is both trivial and not required
input[start[1]] = input[start[1]].replace('S', '7')

const parts = input.map(l => l.split(/((?:\|)|(?:[FL]-*[7J]))/g).filter(s => s !== ''))

let count = 0

for (let line of parts) {
  let inside = false

  for (let part of line) {
    switch (true) {
      case part === '|':
      case part.length > 1 && (part[0] == 'F' && part.at(-1) == 'J' || part[0] == 'L' && part.at(-1) == '7'):
        inside = !inside
        break
      case part[0] === '.':
        if (inside) count += part.length
    }
  }
}

console.log(count)