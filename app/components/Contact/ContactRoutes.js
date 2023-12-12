const express = require('express');
const contactController = require('./ContactController');
const authenticationController = require('../Authentication/AuthenticationController');

const router = express.Router();

router.get('/',authenticationController.checkNotAuthenticated, contactController.renderContactPage);

module.exports = router;