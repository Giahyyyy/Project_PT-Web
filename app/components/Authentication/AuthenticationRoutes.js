const express = require('express');
const authenticationController = require('./AuthenticationController');
const router = express.Router();


router.get('/login', authenticationController.renderLoginPage);
router.get('/register', authenticationController.renderRegisterPage);
router.post('/register', authenticationController.registerUser);

//login
router.post('/login',function(req,res){
    authenticationController.login;
})

router.post('/logout',function(req,res){
    authenticationController.logout;
})


module.exports = router;