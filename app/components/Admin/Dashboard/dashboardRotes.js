// routes/Admin.js
const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboardController');

router.get('/', dashboardController.renderDashboard);





module.exports = router;