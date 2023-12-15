import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(',')

const hash = s => s.split('').reduce(((sum, c) => ((sum + c.charCodeAt(0)) * 17) & 255), 0)

const m = new Map()

for (let s of input) {
  const p = parseInt(s.at(-1))
  const isAdd = s.indexOf('=') > -1

  let n

  if (isAdd) {
    n = s.split('=')[0]
  } else {
    n = s.slice(0, -1)
  }

  const b = hash(n)
  const v = m.get(b)

  if (!v) {
    if (isAdd) m.set(b, [[n, p]])
  } else {
    const i = v.findIndex(([oN]) => oN == n)
    if (i > -1) {
      if (isAdd) {
        v[i] = [n, p]
      } else {
        v.splice(i, 1)
        m.set(b, v)
      }
    } else {
      if (isAdd) v.push([n,p])
    }
  }
}

console.log([...m.entries()].reduce((sum, [idx, vals]) => vals.reduce((s, [n, v], i) => s + (idx+1) * v * (i+1), sum), 0))