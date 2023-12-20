import { EOL } from 'os'
import { readFileSync } from 'fs'

const getInput = () => {
  const i = readFileSync('input.txt', 'utf8')
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

  i.rx = {connections: []}

  Object.entries(i).forEach(([k, {connections}]) => {
    connections.forEach(dest => {
      if (dest == 'output' || !i[dest]) return
      if (!i[dest].inputs) i[dest].inputs = []
      i[dest].inputs.push(k)
      if (i[dest].type === '&') i[dest].state[k] = 0
    })
  })

  return i
}

console.log(getInput().broadcaster.connections.reduce((p, sNode) => {
  let input = getInput()

  let i = 0
  let toProcess = []
  let mC = 0

  const eNode = input['rx'].inputs[0]

  while (true) {
    if (toProcess.length == 0) {
      i++
      toProcess.push(['broadcaster', 0, 'button'])
      continue
    }

    const [m, freq, from] = toProcess.shift()

    if (m === eNode) {
      if (freq == 1) {
        break
      }
      continue
    }

    const mod = input[m]

    if (mod.type === 'broadcaster') {
      toProcess.push([sNode, freq, m])
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

  //technically lcm
  return p * i
}, 1))