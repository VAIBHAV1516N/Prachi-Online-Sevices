const GalleryImage = require('../models/GalleryImage');

// @desc  Get active gallery images (public)
// @route GET /api/gallery
const getGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get all gallery images (admin)
// @route GET /api/admin/gallery
const getAllGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Add a gallery image
// @route POST /api/admin/gallery
const createGalleryImage = async (req, res) => {
  try {
    const { url, caption, category, isActive, order } = req.body;
    if (!url || !caption)
      return res.status(400).json({ success: false, message: 'URL and caption are required' });

    const image = await GalleryImage.create({ url, caption, category, isActive, order });
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Update a gallery image
// @route PUT /api/admin/gallery/:id
const updateGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!image)
      return res.status(404).json({ success: false, message: 'Image not found' });
    res.json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Delete a gallery image
// @route DELETE /api/admin/gallery/:id
const deleteGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!image)
      return res.status(404).json({ success: false, message: 'Image not found' });
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getGalleryImages, getAllGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage };
