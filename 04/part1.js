import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')

const cards = input.split(EOL).map(l => l.slice(8).split(' | ').map(p => p.split(' ').filter(x => x !== '').map(x => +x)))

console.log(cards.reduce((points, [winning, actual]) => {
  const matches = actual.filter(x => winning.includes(x)).length

  return points + (matches == 0 ? 0 : 2 ** (matches-1))
}, 0))