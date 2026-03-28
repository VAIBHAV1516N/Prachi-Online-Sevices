const ServiceRequest = require('../models/ServiceRequest');

// @desc  Submit a service request (public)
// @route POST /api/request
const submitRequest = async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;
    if (!name || !phone || !service)
      return res.status(400).json({ success: false, message: 'Name, phone, and service are required' });

    const request = await ServiceRequest.create({ name, phone, email, service, message });
    res.status(201).json({ success: true, message: 'Request submitted successfully!', data: request });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get all requests (admin)
// @route GET /api/admin/requests
const getAllRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const total = await ServiceRequest.countDocuments(filter);
    const requests = await ServiceRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, data: requests, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Update request status (admin)
// @route PUT /api/admin/request/:id
const updateRequest = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status, adminNote },
      { new: true, runValidators: true }
    );
    if (!request)
      return res.status(404).json({ success: false, message: 'Request not found' });

    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Delete a request (admin)
// @route DELETE /api/admin/request/:id
const deleteRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findByIdAndDelete(req.params.id);
    if (!request)
      return res.status(404).json({ success: false, message: 'Request not found' });
    res.json({ success: true, message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Dashboard stats (admin)
// @route GET /api/admin/stats
const getDashboardStats = async (req, res) => {
  try {
    const total = await ServiceRequest.countDocuments();
    const pending = await ServiceRequest.countDocuments({ status: 'Pending' });
    const inProgress = await ServiceRequest.countDocuments({ status: 'In Progress' });
    const completed = await ServiceRequest.countDocuments({ status: 'Completed' });
    const cancelled = await ServiceRequest.countDocuments({ status: 'Cancelled' });

    // Recent 5 requests
    const recent = await ServiceRequest.find().sort({ createdAt: -1 }).limit(5);

    res.json({ success: true, data: { total, pending, inProgress, completed, cancelled, recent } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitRequest, getAllRequests, updateRequest, deleteRequest, getDashboardStats };
