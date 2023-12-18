// routes/Admin.js
const express = require('express');
const router = express.Router();
const emailController = require('./emailController');

router.get('/', emailController.renderEmail);





module.exports = router;