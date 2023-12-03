import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')

const games = input.split(EOL).map(l => {
  const parts = l.split(': ')

  return [+parts[0].slice(5), parts[1].split('; ').map(g => g.split(', ').map(m => m.split(' ').map((x, i) => i == 0 ? +x : x)))]
})

const target = {
  red: 12,
  green: 13,
  blue: 14
}

console.log(
  games
    .filter(([id, game]) => game.every(draw => draw.every(([count, color]) => target[color] >= count)))
    .map(x => x[0])
    .reduce((s, x) => s+x, 0)
)