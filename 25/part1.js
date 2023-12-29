import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split(': '))
  .flatMap(([a, arr]) => arr.split(' ').map(b => [a, b, a, b]))

while (true) {
  let i = input.map(a => a.map(v => v))

  while (i.length > 3) {
    const randomEdgeIndex = Math.floor(Math.random()*i.length)
    const [a, b] = i.splice(randomEdgeIndex, 1)[0]

    i = i.map(e => [a == e[0] ? b : e[0], a == e[1] ? b : e[1], e[2], e[3]])
      .filter(e => e[0] !== e[1])
  }

  if (i.length === 3) {
    i.forEach(c => {
      const idx = input.findIndex(e => e[0] === c[2] && e[1] === c[3])

      input.splice(idx, 1)
    })

    const start = i[0][2]
    const visited = new Set()

    const toExplore = [start]

    while (toExplore.length > 0) {
      const current = toExplore.shift()

      if (visited.has(current)) continue

      visited.add(current)

      toExplore.push(...input.reduce((arr, edge) => {
        if (edge[0] === current) {
          arr.push(edge[1])
        }
        if (edge[1] === current) {
          arr.push(edge[0])
        }
        return arr
      }, []))
    }

    console.log(visited.size * (input.reduce((s, e) => {
          s.add(e[0])
          s.add(e[1])
          return s
        }, new Set()).size - visited.size))

    process.exit()
  }
}