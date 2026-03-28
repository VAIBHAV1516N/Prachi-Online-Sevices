const express = require('express');
const router = express.Router();
const { getGalleryImages } = require('../controllers/galleryController');

// Public route
router.get('/gallery', getGalleryImages);

module.exports = router;
