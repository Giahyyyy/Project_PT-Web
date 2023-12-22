const express = require('express');
const authenticationController = require('./AuthenticationController');
const router = express.Router();

 

router.get('/login',authenticationController.checkNotAuthenticated, authenticationController.renderLoginPage);
router.get('/register',authenticationController.checkNotAuthenticated, authenticationController.renderRegisterPage);

router.post('/register',authenticationController.checkNotAuthenticated, authenticationController.registerUser);
router.post('/login',authenticationController.checkNotAuthenticated, authenticationController.postLogin);

router.delete('/logout',authenticationController.logout)



module.exports = router;