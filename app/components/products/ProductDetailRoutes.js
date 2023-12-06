const express = require('express');
const PrductdetalsController = require('./PrductdetalsController');


const router = express.Router();

router.get('/product/:id', PrductdetalsController.getProductById);

module.exports = router;