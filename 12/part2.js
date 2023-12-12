import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => {
    const parts  = l.split(' ')

    return [(parts[0]+'?').repeat(4)+parts[0], ((parts[1]+',').repeat(4)+parts[1]).split(',').map(x => +x)]
  })

const c = {}

const countVariations = (s, nums) => {
  const k = s + '/' + nums.join(',')
  if (c[k] !== undefined) return c[k]
  switch (true) {
    case s.length < nums.reduce((m, x) => m+x, 0) + nums.length-1:
      c[k] = 0
      return c[k]
    case s.at(0) == '.':
      c[k] = countVariations(s.slice(1), nums)
      return c[k]
    case s.at(-1) == '.':
      c[k] = countVariations(s.slice(0, -1), nums)
      return c[k]
    case nums.length == 1 && s.indexOf('?') == -1 && s.indexOf('.') == -1 && nums[0] == s.length:
      c[k] = 1
      return c[k]
    case nums.length == 0 && s.indexOf('#') == -1:
      c[k] = 1
      return c[k]
    case nums.length == 0 && s.indexOf('#') > -1:
      c[k] = 0
      return c[k]
    case s.startsWith('#'.repeat(nums[0])+'.'):
      c[k] = countVariations(s.slice(nums[0]+1), nums.slice(1))
      return c[k]
    case s.slice(0, nums[0]).split('').every(c => ['#', '?'].includes(c)) && ['.', '?'].includes(s.at(nums[0])):
      const a = countVariations(s.slice(nums[0]+1), nums.slice(1))
      const b = s.at(0) == '?' ? countVariations(s.slice(1), nums) : 0
      c[k] = a+b
      return c[k]
    case s.slice(0, nums[0]).split('').every(c => ['#', '?'].includes(c)) && s.at(nums[0]) == '#':
      c[k] = s.at(0) == '?' ? countVariations(s.slice(1), nums) : 0
      return c[k]
    case s.slice(0, nums[0]).split('').every(c => ['#', '?'].includes(c)) && nums.length == 1:
      const l = countVariations(s.slice(nums[0]), nums.slice(1))
      const r = s.at(0) == '?' ? countVariations(s.slice(1), nums) : 0
      c[k] = l+r
      return c[k]
    case s.at(0) == '?':
      c[k] = countVariations(s.slice(1), nums)
      return c[k]
    case s.indexOf('.') < nums[0]:
      c[k] = 0
      return c[k]
    default:
      console.log("UNHANDLED", s, nums)
      process.exit()
  }
}

let total = 0

for (const [s, nums] of input) {
  const x = countVariations(s, nums)
  total += x
}

console.log(total)