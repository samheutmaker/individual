const express = require('express');
const jsonParser = require('body-parser').json();

// Model
const Image = require(__dirname + '/../models/image');
const handleError = require(__dirname + '/../lib/handle-error').handleError;

// Router
const imageRouter = module.exports = exports = express.Router();

// Get all images
imageRouter.get('/', (req, res) => {
  try {
    Image.find({}, (err, images) => {
      // Error
      if (err) return handleError(err, res);
      // No Images
      if (!images.length) {
        return res.status(200).json({
          msg: 'No images found'
        });
      }
      // Respond w/ images
      res.status(200).json(images);
    });
  } catch (e) {
    res.status(500).json({
      msg: 'Error.'
    });
  }
});

// Post new image
imageRouter.post('/new', jsonParser, (req, res) => {
  try {
    var newImage = new Image();
    newImage.url = req.body.url;
    newImage.content = req.body.content;
    newImage.save((err, savedImage) => {
      // Check error or no images
      if (err || !savedImage) return handleError(err, res);
      // Respond w/ images
      res.status(200).json(savedImage);
    });
  } catch (e) {
  	res.status(500).json({
  		msg: 'Error.'
  	});
  }
});