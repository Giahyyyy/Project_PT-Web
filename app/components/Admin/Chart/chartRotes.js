// routes/Admin.js
const express = require('express');
const router = express.Router();
const chartController = require('./chartController');

router.get('/', chartController.renderChart);





module.exports = router;