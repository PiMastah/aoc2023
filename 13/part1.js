import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL+EOL)
  .map(p => p.split(EOL))

const transpose = a => a[0].split('').map((_, colIndex) => a.map(row => row[colIndex]).join(''))

const isMirroredAfter = (i, m) => {
  return m.slice(0, i+1).reverse().every((l, j, reversed) => {
    return (l == m[j+i+1]) || l === undefined || m[j+i+1] === undefined
  })
}

let sum = 0

for (let p of input) {
  let found = false
  for (let i = 0; i < p.length-1; i++) {
    if (!found && isMirroredAfter(i, p)) {
      sum += 100 * (i+1)
      found = true
    }
  }
  const pt = transpose(p)
  for (let j = 0; j < pt.length-1; j++) {
    if (!found && isMirroredAfter(j, pt)) {
      sum += (j+1)
      found = true
    }
  }
}

console.log(sum)