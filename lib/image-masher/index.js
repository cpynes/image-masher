const Modes = require('./modes')
const { ImageMasher } = require('./image-base')
/**
 *
 * @typedef {Object} CreateImageMasherSettings
 * @property {Modes} mode - The composition formula to use when combining images
 * @property {number} sourceOpacity
 * @property {number} destOpacity
 * @property {number} distortionStrength - Indicates how much distortion to apply. The higher the value, the more distorted
 * @property {string} inputFolder - The folder where the images live.
 * @property {string} outputFolder - The folder where writing of generated images to be
 * @property {string[]} images - A list of images to work with
*/

/**
 * Creates an imageMasher object
 *
 * @param {CreateImageMasherSettings} settings
 */
const createImageMasher = (settings) => new ImageMasher(settings)

module.exports = {
  createImageMasher,
  Modes
}