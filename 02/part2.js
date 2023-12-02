import { EOL } from 'os'
import { readFileSync } from 'fs'

const input = 
  readFileSync('input.txt', 'utf8')

const games = input.split(EOL).map(l => {
  const parts = l.split(': ')

  return [+parts[0].slice(5), parts[1].split('; ').map(g => g.split(', ').map(m => m.split(' ').map((x, i) => i == 0 ? +x : x)))]
})

console.log(games.map(([id, game]) => game.reduce((o, draws) => {
  draws.reduce((i, [count, color]) => {
    i[color] = Math.max(i[color], count)
    return i
  }, o)
  return o
}, {
  red: 0,
  green: 0,
  blue: 0
})).map(counts => Object.values(counts).reduce((s, c) => s*c, 1))
.reduce((s,c) => s+c, 0))