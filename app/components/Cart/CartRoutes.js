const express = require('express');
const cartController = require('./CartController');

const router = express.Router();

router.get('/', cartController.renderCartPage);
router.post('/add-to-cart', cartController.addToCart);

// Add a route for updating the subtotal
router.post('/update-subtotal', cartController.updateSubtotal);

// Add a route for removing an item from the cart
router.post('/remove-item', cartController.removeItem);
module.exports = router;