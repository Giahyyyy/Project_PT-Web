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
router.get('/forgot-pass', authenticationController.renderForgotPassPage);
router.post('/forgot-pass', authenticationController.forgotPassword);

//reset pass
router.get('/reset-pass', authenticationController.renderResetPassPage);
router.post('/reset-pass', authenticationController.resetPassword);


router.delete('/logout',authenticationController.logout)






module.exports = router;