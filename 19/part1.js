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

const objects = input[1].split(EOL).map(s => s.slice(1, -1).split(',').reduce((o, p) => {
  const a = p.split('=')
  o[a[0]] = +a[1]
  return o
},{}))

const check = function (rule) {
  return eval(rule)
}

let sum = 0

for (let o of objects) {
  let current = 'in'

  while (current !== 'A' && current !== 'R') {
    for (let r of rules[current]) {
      if (r.length === 1) {
        current = r[0]
        break
      }
      if (check.call(o, 'this.'+r[0])) {
        current = r[1]
        break
      }
    }
  }

  if (current == 'A') sum += Object.values(o).reduce((s, c) => s+c,0)
}

console.log(sum)