const express = require('express');
const cartController = require('./CartController');

const router = express.Router();

router.get('/', cartController.renderCartPage);

module.exports = router;