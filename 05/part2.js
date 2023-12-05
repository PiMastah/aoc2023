import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8')

const parts = input.split(EOL+EOL)

const seeds = parts.splice(0,1)[0].slice(7).split(/ +/g).map(x => +x).reduce((result, value, index, array) => {
  if (index % 2 === 0)
    result.push(array.slice(index, index + 2));
  return result;
}, []).map(([start, length]) => ({start, end: start + length -1}))

const maps = parts.map(m => m.split(EOL).slice(1).map(l => l.split(/ +/g).map(x => +x)).map(([dest,source,interval]) => ({dest,source,interval})).sort((a,b) => a.source - b.source))

let toIterate = seeds

for (let map of maps) {
  const nextRanges = []

  for (let item of toIterate) {
    let current = item.start

    while (current <= item.end) {
      const currentMap = map.find(({dest, source, interval}) => source <= current && current < source+interval)

      if (currentMap) {
        const maxCovered = Math.min(item.end-currentMap.source+currentMap.dest, currentMap.dest+currentMap.interval-1)
        const nextItem = {start: current-currentMap.source+currentMap.dest, end: maxCovered}
        nextRanges.push(nextItem)
        current = Math.min(item.end + 1, current + nextItem.end - nextItem.start+1)
      } else {
        const nextMap = map.find(({dest, source, interval}) => current < source && current + interval >= source)
        if (!nextMap) {
          nextRanges.push({start: current, end: item.end})
          current = item.end+1
        } else {
          nextRanges.push({start: current, end: nextMap.source-1})
          current = nextMap.source
        }
      }
    }
  }

  toIterate = nextRanges
}

console.log(Math.min.apply([], toIterate.map(x => x.start)))