import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(',')

const hash = s => s.split('').reduce(((sum, c) => ((sum + c.charCodeAt(0)) * 17) & 255), 0)

console.log(input.reduce((sum, s) => sum + hash(s), 0))