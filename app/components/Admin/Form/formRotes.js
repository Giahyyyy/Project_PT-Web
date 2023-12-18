// routes/Admin.js
const express = require('express');
const router = express.Router();
const formController = require('./formController');

router.get('/', formController.renderForm);





module.exports = router;