import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL+EOL)

const rules = input[0].split(EOL).reduce((o, l) => {
  const p = l.slice(0,-1).split('{')
  o[p[0]] = p[1].split(',').map(s => s.split(':'))
  return o
}, {})

const toCheck = [['in', {x:1,m:1,a:1,s:1}, {x:4000,m:4000,a:4000,s:4000}]]

let accepted = 0

while (toCheck.length > 0) {
  const [current, min, max] = toCheck.pop()

  if (current == 'R') continue

  if (current == 'A') {
    accepted += (max.x - min.x + 1) * (max.m - min.m + 1) * (max.a - min.a + 1) * (max.s - min.s + 1)
    continue
  }

  const ruleList = rules[current]

  for (let r of ruleList) {
    if (r.length == 1) {
      toCheck.push([r[0], min, max])
      break
    }

    const c = r[0]
    const prop = c.charAt(0)
    const cond = c.charAt(1)
    const v = +c.slice(2)

    const newMin = Object.assign({}, min)
    const newMax = Object.assign({}, max)

    if (cond == '<') {
      newMax[prop] = v-1
      min[prop] = v
      toCheck.push([r[1], newMin, newMax])
      continue
    }
    if (cond == '>') {
      newMin[prop] = v+1
      max[prop] = v
      toCheck.push([r[1], newMin, newMax])
      continue
    }
  }
}

console.log(accepted)