const express = require('express');
const router = express.Router();
const ProductsController = require('./ProductsController');
const updateProductsController = require('./updateProductController');

router.get('/', ProductsController.renderForm);
router.post('/uploadProduct',ProductsController.createProduct);
router.delete('/delete/:id', ProductsController.deleteProduct);

//update

router.get('/edit/:id',updateProductsController.renderEditForm );

module.exports = router;