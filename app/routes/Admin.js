// routes/Admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/Admin');

router.get('/dashboard', adminController.renderDashboard);

module.exports = router;