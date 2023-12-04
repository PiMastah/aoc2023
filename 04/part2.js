import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')

const cards = input.split(EOL).map(l => l.slice(8).split(' | ').map(p => p.split(' ').filter(x => x !== '').map(x => +x)))

const counts = cards.reduce((m, [winning, actual], i) => {
  m[i+1] = actual.filter(x => winning.includes(x)).length

  return m
}, {})

const amounts = Array(cards.length).fill(1)

for (let i = 1; i < cards.length; i++) {
  let s = counts[i]

  while (s > 0) {
    amounts[i+s] += amounts[i]
    s--
  }
}

console.log(amounts.reduce((s,c) => s+c, 0))