import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')

const parts = input.split(EOL+EOL)

const directions = parts[0].split('')

const map = parts[1].split(EOL).reduce((m, l) => {
  m[l.slice(0, 3)] = {"L": l.slice(7, 10), "R": l.slice(12, 15)}
  return m
}, {})

let steps = 0
let current = 'AAA'

while (current !== 'ZZZ') {
  current = map[current][directions[steps % directions.length]]
  steps++
}

console.log(steps)