const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, upload.single('image'), (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('No image file provided in the payload.');
    }

    res.status(200).json({
      success: true,
      message: 'Image successfully uploaded to CDN.',
      imageUrl: req.file.path 
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;