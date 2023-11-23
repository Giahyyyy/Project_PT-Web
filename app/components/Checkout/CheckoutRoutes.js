const express = require('express');
const contactController = require('./CheckoutController');

const router = express.Router();

router.get('/', contactController.renderCheckoutPage);

module.exports = router;