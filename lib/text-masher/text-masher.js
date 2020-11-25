const { getRandomBetween } = require('../utils')
const { writeFileSync } = require('fs')

/**
 *
 *
 * @param {string} inuptText
 * @param {string} modulation
 * @param {number} strength
 * @return {string} 
 */
const textMasher = (inuptText, modulation, strength) => {
  const input = Buffer.from(inuptText, 'utf-8')
  const mod = Buffer.from(modulation, 'utf-8')
  for (let i = 0; i < strength; i++) {
    const randA = getRandomBetween(0, input.length)
    const randB = getRandomBetween(0, input.length)
    const modRand = getRandomBetween(1, mod.length)

    
    const tmp = input[randA] % modRand
    input[randA] = (input[randB] + modRand) % 255
    input[randB] = tmp
  }

  return input.toString('utf-8')
}
textMasher.write = (filename, data) => {
  return writeFileSync(filename, data)
}

module.exports.textMasher = textMasher
