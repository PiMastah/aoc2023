import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .reduce((o, l) => {
    const p = l.split(' -> ')
    const isBC = p[0] === 'broadcaster'
    o[isBC ? p[0] : p[0].slice(1)] = {
      type: isBC ? p[0] : p[0].at(0),
      connections: p[1].split(', '),
    }
    o[isBC ? p[0] : p[0].slice(1)].state = o[isBC ? p[0] : p[0].slice(1)].type == '%' ? 0 : {}
    return o
  }, {})

Object.entries(input).forEach(([k, {connections}]) => {
  connections.forEach(dest => {
    if (dest == 'output' || !input[dest]) return
    if (!input[dest].inputs) input[dest].inputs = []
    input[dest].inputs.push(k)
    if (input[dest].type === '&') input[dest].state[k] = 0
  })
})

const o = {
  0: 0,
  1: 0
}

let i = 0
const toProcess = []

while (i < 1001) {
  if (toProcess.length == 0) {
    i++
    toProcess.push(['broadcaster', 0, 'button'])
    continue
  }

  const [m, freq, from] = toProcess.shift()

  o[freq] = o[freq] + 1

  if (m === 'output' || !input[m]) {
    continue
  }

  const mod = input[m]

  if (mod.type === 'broadcaster') {
    toProcess.push(...mod.connections.map(c => [c, freq, m]))
    continue
  }

  if (mod.type === '%' && freq == 0) {
    mod.state = 1-mod.state
    toProcess.push(...mod.connections.map(c => [c, mod.state, m]))
    continue
  }

  if (mod.type === '&') {
    mod.state[from] = freq
    const allHigh = mod.inputs.every(c => mod.state[c] == 1)
    toProcess.push(...mod.connections.map(c => [c, allHigh ? 0 : 1, m]))
    continue
  }
}

console.log(o[0] * o[1])