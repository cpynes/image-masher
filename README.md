# Image Masher Tool

This is a tool used to compose and manipulate images together.

## Getting Setup

1. First thing you should do is run `npm install` in the terminal to install the dependencies of this project.
2. Play around with and edit the `index.js` file to set up your pipline.
3. The `inputs` folder is where the script will look for images and the `outputs` folder is where the results will be put.
4. Run the command `node index.js` to run the script.

## Using the image masher

To use the image masher first construct a new instance using the `createImageMasher` function.

Then you can play around with the `imageMasher` instance and create your own pipelines.

### Methods

`read` - takes a path (String) to a file and reads it. Returns an `ImageType`
`write` - takes a filename (String) and an image (`ImageType`) and writes that image to a file.
`composite` - takes 2 images `ImageType` and combines them together. Returns an `ImageType`.
`distort` - takes a single `ImageType` as input and returns a new `ImgeType` with the bytes distorted.
`pipeline` - takes a callback that will be called for each image `ImageType` in the masher in succession. Returns an `ImageType`. This is useful when wanting to compose and combine all the images in the `inputs` folder.