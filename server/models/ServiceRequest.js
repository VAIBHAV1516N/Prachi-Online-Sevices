const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  adminNote: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ServiceRequest', requestSchema);
