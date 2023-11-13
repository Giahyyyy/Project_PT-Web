// routes/Admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/Admin');

router.get('/dashboard', adminController.renderDashboard);

router.get('/chart', adminController.renderChart);

router.get('/email', adminController.renderEmail);

router.get('/form', adminController.renderForm);

router.get('/table-basic', adminController.renderTable);



module.exports = router;