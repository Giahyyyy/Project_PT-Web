const express = require('express');
const passport = require('passport')
const authenticationController = require('./AuthenticationController');
const router = express.Router();

 

router.get('/login', authenticationController.renderLoginPage);
router.get('/register', authenticationController.renderRegisterPage);

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/shop', // Redirect to dashboard on success
    failureRedirect: '/authen/login', // Redirect to login on failure
    failureFlash: true
  })
);





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