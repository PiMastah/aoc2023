import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)

const map = input.reduce((m, l, y) => l.split('').reduce((map, c, x) => {
  if (c !== '.') map[`${x}/${y}`] = c
  return map
}, m), {})

const dirs = {
  'E': {
    '|': ['N', 'S'],
    '/': ['N'],
    '\\': ['S']
  },
  'W': {
    '|': ['N', 'S'],
    '/': ['S'],
    '\\': ['N']
  },
  'N': {
    '-': ['E', 'W'],
    '/': ['E'],
    '\\': ['W']
  },
  'S': {
    '-': ['E', 'W'],
    '/': ['W'],
    '\\': ['E']
  }
}

const visited = new Set()

const toCheck = [[0,0,'E']]

while (toCheck.length > 0) {
  const [x, y, dir] = toCheck.pop()

  if (x < 0 || x >= input[0].length || y < 0 || y >= input.length) continue

  if (visited.has(`${x}/${y}/${dir}`)) continue

  visited.add(`${x}/${y}/${dir}`)

  const newDirs = dirs[dir][map[`${x}/${y}`] || '.']

  if (!newDirs) {
    toCheck.push([x + (dir == 'E' ? 1 : dir == 'W' ? -1 : 0), y + (dir == 'S' ? 1 : dir == 'N' ? -1 : 0), dir])
    continue
  }

  for (let d of newDirs) {
    toCheck.push([x + (d == 'E' ? 1 : d == 'W' ? -1 : 0), y + (d == 'S' ? 1 : d == 'N' ? -1 : 0), d])
  }
}

console.log(new Set([...visited].map(s => s.slice(0, -2))).size)