const express = require('express');
const authenticationController = require('./AuthenticationController');
const router = express.Router();

 

router.get('/login', authenticationController.renderLoginPage);
router.get('/register', authenticationController.renderRegisterPage);

router.post('/register', authenticationController.registerUser);
router.post('/login', authenticationController.postLogin);

// verify
router.get('/verify/:email', authenticationController.renderVerificationPage);
router.post('/verify', authenticationController.verifyRegistration);

//forgot pass



router.delete('/logout',authenticationController.logout)






module.exports = router;