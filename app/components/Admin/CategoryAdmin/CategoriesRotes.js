// routes/Admin.js
const express = require('express');
const router = express.Router();
const CategoriesController = require('./CategoriesController');

router.get('/', CategoriesController.renderCategory);

router.post('/', CategoriesController.createCategory);




module.exports = router;