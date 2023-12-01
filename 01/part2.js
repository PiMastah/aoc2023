import { EOL } from 'os'
import { readFileSync } from 'fs'

const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

const output = 
  readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map((x, idx) => {
    const digits = x.split('').map((x, i) => [+x, i]).filter(([x]) => !isNaN(x))
    const digitIndices = digits.map(([_, i]) => i)
    const texts = numbers.map(t => [t, x.indexOf(t)]).filter(([t, i]) => i > -1)
    const lastTexts = numbers.map(t => [t, x.lastIndexOf(t)]).filter(([t, i]) => i > -1)
    const textIndices = texts.map(([_, i]) => i)
    const lastIndices = lastTexts.map(([_, i]) => i)

    const firstIndex = Math.min.apply([], [].concat(digitIndices, textIndices))
    const lastIndex = Math.max.apply([], [].concat(digitIndices, lastIndices))

    const x1 = textIndices.indexOf(firstIndex) > -1 ? numbers.indexOf(texts.find(([t, i]) => i == firstIndex)[0])+1 : +x[firstIndex]
    const x2 = lastIndices.indexOf(lastIndex) > -1 ? numbers.indexOf(lastTexts.find(([t, i]) => i == lastIndex)[0])+1 : +x[lastIndex]

    return x1*10 + x2
  })
.reduce((s, x) => s + x, 0)

console.log(output)