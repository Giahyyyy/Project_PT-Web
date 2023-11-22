const express = require('express');
const contactController = require('./ContactController');

const router = express.Router();

router.get('/', contactController.renderContactPage);

module.exports = router;