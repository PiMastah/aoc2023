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

let startingPoints = Object.keys(map).filter(p => p.endsWith('A'))

let results = []

for (let point of startingPoints) {
  let steps = 0
  let visited = []
  let current = point

  while (true) {
    const offset = steps % directions.length

    if (offset == 0) {
      if (visited.find(v => v === offset+current)) break
      visited.push(offset+current)
    }

    current = map[current][directions[steps % directions.length]]
    steps++
  }

  results.push(steps)
}

const gcd = (a, b) => {
    while (b != 0){
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

const lcm = (a, b) => a * b / gcd(a, b)

const lcmm = args => {
    if (args.length == 2){
        return lcm(args[0], args[1])
    } else {
        let arg0 = args[0]
        args.shift()
        return lcm(arg0, lcmm(args))
    }
}

console.log(lcmm(results.map(x => x-directions.length)))