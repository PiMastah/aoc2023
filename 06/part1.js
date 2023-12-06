import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8').split(EOL)

const [times, distances] = input.map(l => l.split(/ +/g).slice(1).map(x => +x))

const getDistanceTravelled = (totalTime, buttonPressedTime) => Math.max(0, (totalTime-buttonPressedTime)) * buttonPressedTime

console.log(
  times
    .map((t, raceIndex) =>
      Array(t+1)
        .fill()
        .map((_,i) => getDistanceTravelled(t, i))
        .filter(distanceTravelled => distanceTravelled > distances[raceIndex])
    ).reduce((p, c)=> p*c.length, 1)
)