// routes/Admin.js
const express = require('express');
const router = express.Router();
const tableController = require('./tableController');

router.get('/', tableController.renderTable);





module.exports = router;