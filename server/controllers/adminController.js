const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET || 'prachi_secret', { expiresIn: '7d' });
};

// @desc  Login admin
// @route POST /api/admin/login
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ success: false, message: 'Please provide username and password' });

    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    res.json({
      success: true,
      token: generateToken(admin._id, admin.username),
      username: admin.username
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc  Register admin (use once for setup)
// @route POST /api/admin/register
const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const exists = await Admin.findOne({ username });
    if (exists)
      return res.status(400).json({ success: false, message: 'Admin already exists' });

    const admin = await Admin.create({ username, password });
    res.status(201).json({ success: true, message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = { loginAdmin, registerAdmin };
