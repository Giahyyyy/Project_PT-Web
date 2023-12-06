const express = require('express');
const shopController = require('./ShopController');


const router = express.Router();


router.get('/', shopController.renderShopPage);

module.exports = router;