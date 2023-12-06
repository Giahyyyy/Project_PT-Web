const express = require('express');
const PrductdetalsController = require('./PrductdetalsController');


const router = express.Router();

router.get('/', PrductdetalsController.renderProductPage);

module.exports = router;