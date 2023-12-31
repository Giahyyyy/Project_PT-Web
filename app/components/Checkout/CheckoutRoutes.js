const express = require('express');
const CheckoutController = require('./CheckoutController');

const router = express.Router();

router.get('/', CheckoutController.renderCheckoutPage);
router.post('/createOrder', CheckoutController.createOrder);

module.exports = router;