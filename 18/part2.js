import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(' ').slice(2)[0].slice(2, -1)).map(h => [parseInt(h.slice(0, -1), 16), +h.slice(-1)])

const n = {
  0: [1, 0],
  1: [0, 1],
  2: [-1, 0],
  3: [0, -1],
}

const edges = [[0,0]]

for (let [steps, dir] of input) {
  const o = n[dir]
  const current = edges.at(-1)
  const next = [current[0] + steps * o[0], current[1] + steps * o[1]]
  edges.push(next)
}

const areas = []

for (let i = 0; i < edges.length -2; i++) {
  areas.push(edges[i][0] * edges[i+1][1] - edges[i][1] * edges[i+1][0])
}

console.log((areas.reduce((s, a) => s+a, 0) + input.reduce((s, [d]) => s + d, 0))/2 + 1)