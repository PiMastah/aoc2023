import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')

const parts = input.split(EOL+EOL)

const seeds = parts.splice(0,1)[0].slice(7).split(/ +/g).map(x => +x)

const maps = parts.map(m => m.split(EOL).slice(1).map(l => l.split(/ +/g).map(x => +x)))

let ids = [...seeds]

for (let map of maps) {
  ids = ids.map(s => {
    const mapping = map.find(([dest, source, interval]) => source <= s && s < source+interval)

    if (!mapping) return s

    return s - mapping[1] + mapping[0]
  })
}

console.log(Math.min.apply([], ids))