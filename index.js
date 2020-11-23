const { createImageMasher, Modes } = require('./lib')

const imageMasher = createImageMasher({
  mode: Modes.LIGHTEN,
  sourceOpacity: 0.8,
  destOpacity: 0.8,
  distortionStrength: 5, // The higher this number the more time it will take and the more likely it will fail
  inputFolder: 'inputs', // relative to the folder this file lives in
  outputFolder: 'outputs', // relative to the folder this file lives in
  images: [
    'photo1.jpg',
    'photo2.jpg',
  ], // Put a list of filenames in here that you want to mash (the order is the order they will run in)
})

// Example for distorting manually
// =======================================
const result1 = imageMasher.composite(
  imageMasher.images[0],
  imageMasher.images[1]
)

const result2 = imageMasher.distort(result1)
imageMasher.write('result.jpg', result2)


// Example for looping over all the images
// ========================================

// Use the `.reduce` method to get access to all the images
const finalResult = imageMasher.pipeline((result, image, idx) => { // Don't edit this line, just play with the pieces inside it
  // Generate the composition of the last result and the current image (starts with the first 2 images in the list)
  const combined = imageMasher.composite(
    result,
    image
  )

  // Distort the combined result
  const nextResult = imageMasher.distort(combined)
  // Write this result to a file
  const filename = `result_${idx + 1}.jpg`
  imageMasher.write(filename, nextResult)

  // Return the distorted result for the next cycle
  return nextResult
})

imageMasher.write(`final_result.jpg`, finalResult)
