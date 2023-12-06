import { EOL } from 'os'
import { readFileSync } from 'fs'

const input =
  readFileSync('input.txt', 'utf8').split(EOL)

const [time, distance] = input.map(l => l.replace(/ +/g, '').split(":").slice(1).map(x => +x)).map(x => x[0])

const getDistanceTravelled = buttonPressedTime => Math.max(0, (time-buttonPressedTime)) * buttonPressedTime

let minToBeat
let maxTravelled = 0
let maxTravelledIndex = 0
let i = 1
let isDoublePeak = false
let d

while ((d = getDistanceTravelled(i)) >= maxTravelled) {
    if (d == maxTravelled) isDoublePeak = true
    maxTravelled = d
    maxTravelledIndex = i
    if (maxTravelled >= distance && minToBeat === undefined) minToBeat = i
    i++
}

console.log((maxTravelledIndex - minToBeat)*2 + (isDoublePeak ? 0 : 1))