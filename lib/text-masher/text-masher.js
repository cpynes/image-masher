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
    input[randA] = mod[randA]
    input[randB] = mod[randB]
  }

  return input.toString('utf-8')
}
textMasher.write = (filename, data) => {
  return writeFileSync(filename, data)
}

module.exports.textMasher = textMasher
