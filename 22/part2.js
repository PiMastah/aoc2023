import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split('~').map(c => c.split(','))).map(([p1, p2], i) => [{
    x: +p1[0],
    y: +p1[1],
    z: +p1[2]
  }, {
    x: +p2[0],
    y: +p2[1],
    z: +p2[2]
  }, i])

const overlapXY = (a, b, extraCondition = () => true) => {
  return (Math.max(a[0].x, b[0].x) <= Math.min(a[1].x, b[1].x)) && (Math.max(a[0].y, b[0].y) <= Math.min(a[1].y, b[1].y)) && extraCondition(a, b)
}

const overlaps = input.map((a, i) => input.filter((b, j) => a[2] !== b[2] 
    && overlapXY(a, b, (a, b) => Math.max(a[0].z, a[1].z) > Math.min(b[0].z, b[1].z)))
  .map(x => x[2]))

const minimal = new Set()

const toCheck = input.map((_, i) => i)

while (toCheck.length > 0) {
  const i = toCheck.shift()

  const [p1, p2] = input[i]

  const overlap = overlaps[i]

  if (overlap.length === 0 || overlap.every(x => minimal.has(x))) {
    minimal.add(i)
    const h = overlap.reduce((mH, i) => Math.max(mH, input[i][0].z, input[i][1].z), 0)
    const d = Math.abs(p1.z - p2.z)

    p1.z = h + 1 + Math.max(0, -d)
    p2.z = h + 1 + Math.max(0, d)
  } else {
    toCheck.push(i)
  }
}

const heldUpBy = input.map((a, i) => input.filter((b, j) => a[2] !== b[2]
    && overlapXY(a, b, (a, b) => Math.min(a[0].z, a[1].z) - 1 === Math.max(b[0].z, b[1].z)))
  .map(x => x[2]))

const movingBlockCounts = input.map((a, i) => {
  const falling = new Set()
  const toRemove = [i]

  while (toRemove.length > 0) {
    const r = toRemove.shift()

    if (falling.has(r)) continue

    falling.add(r)

    heldUpBy.forEach((heldBy, j) => {
      if (heldBy.length > 0 && !falling.has(j) && heldBy.every(x => falling.has(x))) {
        toRemove.push(j)
      }
    })
  }

  return falling.size - 1
})

console.log(movingBlockCounts.reduce((s, c) => s+c, 0))