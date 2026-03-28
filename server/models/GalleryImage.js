const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  caption: {
    type: String,
    required: [true, 'Caption is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['Customer Service', 'Documentation', 'Government', 'Banking', 'Education', 'Insurance', 'Other'],
    default: 'Other'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
