const express = require('express');
const siteController = require('./SiteController');


const router = express.Router();

router.get('/home', siteController.renderHomePage);
router.get('/about', siteController.renderAboutPage);
router.get('/shop', siteController.renderShopPage);

module.exports = router;