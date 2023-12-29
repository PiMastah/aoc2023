import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(' @ ').map(c => c.split(', ').map(x => +x)))

const line_intersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  let ua, ub, denom = (y4-y3)*(x2-x1) - (x4-x3)*(y2-y1)

  if (denom == 0) {
      return null
  }

  ua = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / denom
  ub = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / denom

  return {
      x: x1 + ua * (x2-x1),
      y: y1 + ua * (y2-y1),
  }
}

const lb = 200000000000000
const ub = 400000000000000

console.log(input.reduce((count_is, l1, i1) => count_is + input.slice(i1+1).filter(l2 => {
  const is = line_intersect(
    l1[0][0], l1[0][1],
    l1[0][0] + l1[1][0], l1[0][1] + l1[1][1],
    l2[0][0], l2[0][1],
    l2[0][0] + l2[1][0], l2[0][1] + l2[1][1]
  )

  return is !== null
    && (Math.sign(l1[1][0]) == 1 ? is.x > l1[0][0] : is.x < l1[0][0])
    && (Math.sign(l2[1][0]) == 1 ? is.x > l2[0][0] : is.x < l2[0][0])
    && lb <= is.x && is.x <= ub && lb <= is.y && is.y <= ub
}).length, 0))
