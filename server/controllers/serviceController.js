const Service = require('../models/Service');

// @desc  Get all active services (public)
// @route GET /api/services
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get all services (admin)
// @route GET /api/admin/services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Create a service
// @route POST /api/admin/service
const createService = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    if (!name || !price || !description)
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });

    const service = await Service.create({ name, price, description, category });
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Update a service
// @route PUT /api/admin/service/:id
const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service)
      return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Delete a service
// @route DELETE /api/admin/service/:id
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service)
      return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getServices, getAllServices, createService, updateService, deleteService };
