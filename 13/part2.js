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

const originalVals = []

for (let p of input) {
  let found = false
  for (let i = 0; i < p.length-1; i++) {
    if (!found && isMirroredAfter(i, p)) {
      originalVals.push(100 * (i+1))
      found = true
    }
  }
  const pt = transpose(p)
  for (let j = 0; j < pt.length-1; j++) {
    if (!found && isMirroredAfter(j, pt)) {
      originalVals.push(j+1)
      found = true
    }
  }
}

let sum = 0
let idx = 0

for (let p of input) {
  let found = false
  for (let y=0;y<p.length;y++) {
    for (let x=0;x<p[0].length;x++) {
      const v = p.map(x => x)
      v[y] = v[y].slice(0, x) + (v[y][x] == '.' ? '#' : '.') + v[y].slice(x+1)
      for (let i = 0; i < v.length-1; i++) {
        if (!found && 100 * (i+1) !== originalVals[idx] && isMirroredAfter(i, v)) {
          sum += 100 * (i+1)
          found = true
        }
      }
      const vt = transpose(v)
      for (let j = 0; j < vt.length-1; j++) {
        if (!found && (j+1) !== originalVals[idx] && isMirroredAfter(j, vt)) {
          sum += (j+1)
          found = true
        }
      }
    }
  }
  idx++
}

console.log(sum)