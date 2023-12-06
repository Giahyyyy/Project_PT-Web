const express = require('express');
const authenticationController = require('./AuthenticationController');

const router = express.Router();

router.get('/login', authenticationController.renderLoginPage);
router.get('/register', authenticationController.renderRegisterPage);
router.post('/register', authenticationController.registerUser)
router.post('/login',authenticationController.loginUser)

module.exports = router;