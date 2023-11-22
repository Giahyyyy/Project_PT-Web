const express = require('express');
const homeController = require('./SiteController');
const aboutController = require('./SiteController');

const router = express.Router();

router.get('/', homeController.renderHomePage);
router.get('/', homeController.renderAboutPage);

module.exports = router;