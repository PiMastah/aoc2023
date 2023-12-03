import { EOL } from 'os'
import { readFileSync } from 'fs'

const output =
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(x => x.split('').map(x => +x).filter(x => !isNaN(x)))
  .map(x => +('' + x.at(0) + x.at(-1)))
  .reduce((s, x) => s + x, 0)

console.log(output)