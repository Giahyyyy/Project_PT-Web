// routes/Admin.js
const express = require('express');
const router = express.Router();
const checkoutController = require('./checkoutController');

router.get('/', checkoutController.renderCheckout);
router.post('/:orderId/delete', checkoutController.deleteOrder);





module.exports = router;