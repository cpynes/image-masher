const { resolve } = require('path')
const imageBase = require('jimp')
const Modes = require('./modes')


class Image extends imageBase {}

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
 * 
 * @typedef {Object | String | Promise<ImageType> | Image} ImageType
*/

/**
 *
 *
 * @class ImageMasher
 */
class ImageMasher {  
  /**
   * Creates an instance of ImageMasher.
   * @param {CreateImageMasherSettings} settings
   * @memberof ImageMasher
   */
  constructor(settings) {
    this.applySettings(settings)
  }


  /**
   *
   * 
   * @param {ImageType} image1
   * @param {ImageType} image2
   * @memberof ImageMasher
   */
  composite = async (image1, image2) => {
    const [i1, i2] = await this.resolveImages(image1, image2)
    return i1.composite(i2, 0, 0, {
      mode: this._mode,
      opacityDest: this._destOpacity,
      opacitySource: this._sourceOpacity
    })
  }

  /**
   *
   *
   * @param {ImageMasher~reduceCallback} cb
   * @memberof ImageMasher
   */
  pipeline = async (cb) => {
    const start = this.images[0]
    return this.images.slice(1).reduce(async (result, image, idx) => {
      const [resultImg, img] = await this.resolveImages(result, image)
      return cb(resultImg, img, idx)
    }, start)
  }

  /**
   *
   *
   * @param {ImageType} image
   * @memberof ImageMasher
   */
  distort = async (image, tries = 0) => {
    try {
      const img = await this.resolveImage(image)
      
      const buffer = await img.getBufferAsync(Image.MIME_JPEG)
      
      const scrambleStart = 10
      const scrambleEnd = buffer.byteLength - 10
      
      for (let i = 0; i < this._distortionStrength; i++) {
        
        const posA = this.getRandomBetween(scrambleStart, scrambleEnd)
        const posB = this.getRandomBetween(scrambleStart, scrambleEnd)
        
        const tmp = buffer[posA]
        buffer[posA] = buffer[posB]
        buffer[posB] = tmp
      }
      
      const result = await Image.read(buffer)
      return result
    } catch(err) {
      if (tries > 20) {
        throw err
      }
      return this.distort(image, tries + 1)
    }
  }

  /**
   *
   * @param {ImageType} image
   * @returns {Promise<Image>}
   * @memberof ImageMasher
   */
  resolveImage = async (image) => {
    if (typeof image === 'string') {
      return Image.read(image)
    }
    if (image instanceof Image) return image
    if (image instanceof Promise) {
      return this.resolveImage(await image)
    }
    
    return new Image(image)
  }

  resolveImages = async (...images) => Promise.all(images.map(this.resolveImage))


  /**
   *
   *
   * @param {number} min
   * @param {number} max
   * @return {number} 
   * @memberof ImageMasher
   */
  getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }


  /**
   *
   *
   * @param {String} filename
   * @param {ImageType} image
   * @memberof ImageMasher
   */
  write = async (filename, image) => {
    const i = await this.resolveImage(image)
    const result = i.write(this.outputFileName(filename))
    return result
  }

  outputFileName = (filename) => resolve(this.outputFolder, filename)

  /**
   *
   * @private
   * @param {CreateImageMasherSettings} settings
   * @memberof ImageMasher
   */
  applySettings(settings) {
    Object.entries(settings).forEach(([key, value]) => {
      this[`_${key}`] = value || defaultSettings[key]
    })

    this.inputFolder = resolve(settings.inputFolder)
    this.outputFolder = resolve(settings.outputFolder)
    const images = settings.images.map(filename => resolve(this.inputFolder, filename))
    this.images = images
  }
}

module.exports = {
  Image,
  ImageMasher
}


/** @type {CreateImageMasherSettings} */
const defaultSettings = {
  images: [],
  inputFolder: 'inputs',
  outputFolder: 'outputs',
  destOpacity: 0.8,
  sourceOpacity: 0.8,
  distortionStrength: 5,
  mode: Modes.LIGHTEN,
}


/**
 * 
 * @callback ImageMasher~reduceCallback
 * @param {ImageType} result
 * @param {ImageType} image
 * @param {number} index
 */