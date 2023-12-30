const express = require('express');
const authenticationController = require('./AuthenticationController');
const router = express.Router();

 

router.get('/login', authenticationController.renderLoginPage);
router.get('/register', authenticationController.renderRegisterPage);

router.post('/register', authenticationController.registerUser);
router.post('/login', authenticationController.postLogin);

// router.get('/verify/:email', authenticationController.renderVerificationPage);
// router.post('/verify/:email', authenticationController.verifyRegistration);

router.get('/verify/:email', authenticationController.renderVerificationPage);
router.post('/verify', authenticationController.verifyRegistration);

// router.get('/verify/email', authenticationController.getUserEmail);

router.delete('/logout',authenticationController.logout)


// Định nghĩa một endpoint để xử lý yêu cầu kích hoạt
//router.get('/activate/:activationCode', authenticationController.activateAccount);



module.exports = router;