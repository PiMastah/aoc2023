import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)

const galaxies = input.reduce((m, l, y) => {
  m.push([])
  return l.split('').reduce((o, c, x) => {
    if (c === '#') o[y].push(x)
    return o
  }, m)
}, [])

const emptyY = []
const emptyX = []

for (let y=0; y < galaxies.length; y++) {
  if (galaxies[y].length === 0) emptyY.push(y)
}

for (let x=0; x < input[0].length; x++) {
  if (!galaxies.find(a => a.includes(x))) emptyX.push(x)
}

const f = 1000000-1
const expanded = galaxies.flatMap((g, y) => g.map(x => [x+emptyX.filter(ex => ex < x).length*f, y+emptyY.filter(ey => ey < y).length*f]))

console.log(expanded.reduce((t, c, i) => expanded.slice(i+1).reduce((s, o) => s + Math.abs(o[0]-c[0]) + Math.abs(o[1]-c[1]), t), 0))