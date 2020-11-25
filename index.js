const { createImageMasher, Modes, textMasher } = require('./lib')

// Example text masher
// ==================================
const strength = 30

const inputText = `An essay is, generally, a piece of writing that gives the author's own argument — but the definition is vague, overlapping with those of a letter, a paper, an article, a pamphlet, and a short story. Essays have traditionally been sub-classified as formal and informal. Formal essays are characterized by "serious purpose, dignity, logical organization, length," whereas the informal essay is characterized by "the personal element (self-revelation, individual tastes and experiences, confidential manner), humor, graceful style, rambling structure, unconventionality or novelty of theme," etc.[1]
Essays are commonly used as literary criticism, political manifestos, learned arguments, observations of daily life, recollections, and reflections of the author. Almost all modern essays are written in prose, but works in verse have been dubbed essays (e.g., Alexander Pope's An Essay on Criticism and An Essay on Man). While brevity usually defines an essay, voluminous works like John Locke's An Essay Concerning Human Understanding and Thomas Malthus's An Essay on the Principle of Population are counterexamples.`

const distortionText = `The personal and the autobiographical: The essayists that feel most comfortable in this pole "write fragments of reflective autobiography and look at the world through the keyhole of anecdote and description".`

const resultText = textMasher(inputText, distortionText, strength)

textMasher.write('distorted-text.txt', resultText)

// ===================================
// Examples for imageMasher Below
// ===================================

// const imageMasher = createImageMasher({
//   mode: Modes.LIGHTEN,
//   sourceOpacity: 0.8,
//   destOpacity: 0.8,
//   distortionStrength: 5, // The higher this number the more time it will take and the more likely it will fail
//   inputFolder: 'inputs', // relative to the folder this file lives in
//   outputFolder: 'outputs', // relative to the folder this file lives in
//   images: [
//     'photo1.jpg',
//     'photo2.jpg',
//   ], // Put a list of filenames in here that you want to mash (the order is the order they will run in)
// })

// // Example for distorting manually
// // =======================================
// const result1 = imageMasher.composite(
//   imageMasher.images[0],
//   imageMasher.images[1]
// )

// const result2 = imageMasher.distort(result1)
// imageMasher.write('result.jpg', result2)


// // Example for looping over all the images
// // ========================================

// // Use the `.reduce` method to get access to all the images
// const finalResult = imageMasher.pipeline((result, image, idx) => { // Don't edit this line, just play with the pieces inside it
//   // Generate the composition of the last result and the current image (starts with the first 2 images in the list)
//   const combined = imageMasher.composite(
//     result,
//     image
//   )

//   // Distort the combined result
//   const nextResult = imageMasher.distort(combined)
//   // Write this result to a file
//   const filename = `result_${idx + 1}.jpg`
//   imageMasher.write(filename, nextResult)

//   // Return the distorted result for the next cycle
//   return nextResult
// })

// imageMasher.write(`final_result.jpg`, finalResult)
