import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')
  .split(EOL)

const top=0,parent=t=>(t+1>>>1)-1,left=t=>(t<<1)+1,right=t=>t+1<<1;class PriorityQueue{constructor(t=(t,e)=>t>e){this._heap=[],this._comparator=t}size(){return this._heap.length}isEmpty(){return 0==this.size()}peek(){return this._heap[top]}push(...t){return t.forEach(t=>{this._heap.push(t),this._siftUp()}),this.size()}pop(){let t=this.peek(),e=this.size()-1;return e>top&&this._swap(top,e),this._heap.pop(),this._siftDown(),t}replace(t){let e=this.peek();return this._heap[top]=t,this._siftDown(),e}_greater(t,e){return this._comparator(this._heap[t],this._heap[e])}_swap(t,e){[this._heap[t],this._heap[e]]=[this._heap[e],this._heap[t]]}_siftUp(){for(let t=this.size()-1;t>top&&this._greater(t,parent(t));)this._swap(t,parent(t)),t=parent(t)}_siftDown(){for(let t,e=top;left(e)<this.size()&&this._greater(left(e),e)||right(e)<this.size()&&this._greater(right(e),e);)t=right(e)<this.size()&&this._greater(right(e),left(e))?right(e):left(e),this._swap(e,t),e=t}}

const grid = input.reduce((map, line, y) => line.split('').reduce((m, c, x) => {
  m[`${x}/${y}`] = +c
  return m
}, map), {})

const visited = new Map()

const neighbors = [[-1, 0, 'W'], [1, 0, 'E'], [0, -1, 'N'], [0, 1, 'S']]

const reverse = {'N':'S', 'S':'N', 'W':'E','E':'W'}

const toExplore = new PriorityQueue((a, b) => a[0] < b[0])

toExplore.push([0, 0, 0, '', ''])

const mX = input[0].length - 1
const mY = input.length - 1

let min = Infinity
let path

while (toExplore.size() > 0) {

  const [d, x, y, m, p] = toExplore.pop()

  if (d >= min) continue

  const s = `${x}/${y}`

  if (visited.get(`${s}/${m}`) <= d) continue

  visited.set(`${s}/${m}`, d)

  if (m.length === 4 || x < 0 || y < 0 || x> mX || y > mY) continue

  if (x == mX && y == mY) {
    min = Math.min(min, d)
    if (d == min) path = p

    console.log(min)
    break
  }

  toExplore.push(...neighbors.filter(n => n[2] !== reverse[m.at(0)])
    .map(([nX, nY, nD]) => [d + grid[`${x+nX}/${y+nY}`], x+nX, y+nY, m.at(0) === nD ? m + nD : nD, p+nD])
    .filter(n => !isNaN(n[0]))
  )
}