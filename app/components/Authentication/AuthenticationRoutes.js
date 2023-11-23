const express = require('express');
const authenticationController = require('./AuthenticationController');

const router = express.Router();

router.get('/login', authenticationController.renderLoginPage);
router.get('/register', authenticationController.renderRegisterPage);

module.exports = router;