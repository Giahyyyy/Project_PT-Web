const express = require('express');
const siteController = require('./SiteController');


const router = express.Router();

router.get('/home', siteController.renderHomePage);
router.get('/about', siteController.renderAboutPage);


module.exports = router;