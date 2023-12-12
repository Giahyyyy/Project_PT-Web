const express = require('express');
const contactController = require('./ContactController');
const authenticationController = require('../Authentication/AuthenticationController');

const router = express.Router();

router.get('/', contactController.renderContactPage);

module.exports = router;