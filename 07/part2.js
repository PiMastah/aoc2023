import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')

const ranks = [
  c => c[0] == 5,
  c => c[0] == 4,
  c => c[0] == 3 && c[1] == 2,
  c => c[0] == 3 && c[1] == 1,
  c => c[0] == 2 && c[1] == 2,
  c => c[0] == 2 && c[1] == 1,
  c => c[0] == 1,
]

const hands = input.split(EOL).map(l => l.split(' '))

const getRank = h => {
  const counts = h[0].split('').reduce((o, c) => {
    if (o[c] == undefined) o[c] = 0
    o[c] +=1
    return o
  }, {})

  const jokerCount = counts['J'] || 0

  delete counts['J']

  const sorted = Object.values(counts).sort((a, b) => b-a)

  sorted[0] = (sorted[0] || 0) + jokerCount

  return ranks.findIndex(fn => fn(sorted))
}

const cardRanks = ['A','K','Q','T','9','8','7','6','5','4','3','2','J']

const strcomp = (s1, s2) => {
  for (let i = 0; i < 5; i++) {
    if (cardRanks.indexOf(s1[i]) > cardRanks.indexOf(s2[i])) return -1
    if (cardRanks.indexOf(s1[i]) < cardRanks.indexOf(s2[i])) return 1
  }
}

hands.sort((h1, h2) => {
  const r1 = getRank(h1)
  const r2 = getRank(h2)

  if (r1 == r2) return strcomp(h1[0], h2[0])

  return r2 - r1
})

console.log(hands.reduce((a, h, i) => a+(+h[1])*(i+1), 0))