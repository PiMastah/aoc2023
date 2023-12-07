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

const getRank = h => ranks.findIndex(fn => fn(Object.values(h[0].split('').reduce((o, c) => {
    if (o[c] == undefined) o[c] = 0
    o[c] +=1
    return o
  }, {})).sort((a, b) => b-a)))

const cardRanks = ['A','K','Q','J','T','9','8','7','6','5','4','3','2']

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