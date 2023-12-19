const express = require('express');
const router = express.Router();
const ProductsController = require('./ProductsController');

router.get('/', ProductsController.renderForm);
router.post('/uploadProduct',ProductsController.createProduct);



module.exports = router;