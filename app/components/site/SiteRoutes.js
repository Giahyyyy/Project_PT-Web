const express = require('express');
const siteController = require('./SiteController');


const router = express.Router();

router.get('/', siteController.renderHomePage);
router.get('/', siteController.renderAboutPage);

module.exports = router;