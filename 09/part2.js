import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split(' ').map(x => +x))

const findNext = seq => {
  const sequences = [seq]

  let current = seq

  while (!current.every(x => x == 0)) {
    const next = current.slice(1).map((x, idx) => x - current[idx])

    sequences.push(next)

    current = next
  }

  let v = 0

  for (let i = sequences.length - 1; i >=0; i--) {
    v = sequences[i].at(0) - v
  }

  return v
}

console.log(input.reduce((s, c) => s+findNext(c), 0))