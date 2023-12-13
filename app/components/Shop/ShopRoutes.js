const express = require('express');
const shopController = require('./ShopController');
const authenticationController=require('../Authentication/AuthenticationController')


const router = express.Router();


router.get('/', shopController.renderShopPage);

module.exports = router;