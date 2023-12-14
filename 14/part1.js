import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')

const transpose = a => a[0].split('').map((_, colIndex) => a.map(row => row[colIndex]).join(''))

const lines = transpose(input.split(EOL))

console.log(lines.map(l => {
  let current = l
  for (let i = 0; i < l.length; i++) {
    if (l.at(i) == 'O') {
      let c = i
      while (c > 0 && current.at(c-1) == '.') {
        c--
      }
      if (c >= 0 && c < i) current = current.slice(0, c) + 'O' + current.slice(c+1, i) + '.' + current.slice(i+1)
    }
  }
  return current
}).reduce(((s, line) => line.split('').map((c, i) => c == 'O' ? line.length-i : 0).reduce((sum, x) => sum + x, s)), 0))