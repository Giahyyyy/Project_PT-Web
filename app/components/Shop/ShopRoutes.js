const express = require('express');
const shopController = require('./ShopController');
const authenticationController=require('../Authentication/AuthenticationController')


const router = express.Router();


router.get('/', authenticationController.checkAuthenticated, shopController.renderShopPage);

module.exports = router;