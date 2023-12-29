import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(' @ ').map(c => c.split(', ').map(x => +x)))

const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n)

const cross = (a, b) => [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]]

const relativeShift = input[0].map(a => a.map(x => -x))
const relativeMovements = input.slice(1).map((a) => a.map((x, i) => x.map((v, j) => v + relativeShift[i][j])))

const v1 = relativeMovements[0][0]
const v2 = relativeMovements[0][1]

const normal = cross(v1, v2)

const nx = normal[1] * normal[2]
const ny = normal[0] * normal[2]
const nz = normal[0] * normal[1]

const timeStamps = relativeMovements.slice(1,3).map(rm => {
  const [[px, py, pz], [vx, vy, vz]] = rm

  return Math.round(- (ny*nz*px + nx*nz*py + nx*ny*pz) / (ny*nz*vx + nx*nz*vy + nx*ny*vz))
})

const t1 = timeStamps[0]
const t2 = timeStamps[1]

const tDelta = t1 - t2

const c1 = input[2][0].map((c, i) => c + t1 * input[2][1][i])
const c2 = input[3][0].map((c, i) => c + t2 * input[3][1][i])

const delta = c1.map((x, i) => x - c2[i])

const answer = c1.map((v, i) => v - delta[i] / tDelta * t1).reduce((s, x) => s + x, 0)

console.log(answer)