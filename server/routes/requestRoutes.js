const express = require('express');
const router = express.Router();
const { submitRequest } = require('../controllers/requestController');

router.post('/request', submitRequest);

module.exports = router;
