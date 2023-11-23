const express = require('express');
const authenticationController = require('./AuthenticationController');

const router = express.Router();

router.get('/', authenticationController.renderLoginPage);
router.get('/', authenticationController.renderRegisterPage);

module.exports = router;