const express = require('express');
const authenticationController = require('./AuthenticationController');
const passport = require('passport');
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;


router.get('/login', authenticationController.renderLoginPage);
router.get('/register', authenticationController.renderRegisterPage);
router.post('/register', authenticationController.registerUser);

router.get('/status',(req,res)=>{
    res.status(200).json({
        status:'success',
        message: "ok"
    })
})


router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({
            status: 'success',
            data: {
                name: "kien",
                age: 38,
                blog: "hihi"
            }
        });
    }
    res.status(200).json({
        status: 'failed',
        message: "Missing"
    });
});

//login
router.post('/login',passport.authenticate('local',{
    successRedirect:'/authen/profile',
    failureRedirect:'/authen/login',
}),(req, res, next) => {
    try {
        res.json({
            body:req.body
        })
    } catch (error) {
        res.json({
            error: error.stack

        })
    }
  });
  //data test
  const user ={
    username: '123',
    password: '123'
  }

  
  passport.use(new LocalStrategy((username,password,done)=>{
    console.log(`username: ${username},password: ${password}`);
    if(username===user.username&&password===user.password) {
        return done(null,{
            username,
            password,
            active: true
        })
    }
    done(null,false);
  }))
  passport.deserializeUser((username,done)=> {
  //check username
  console.log(`deserializeUser: ${username}`)
  if(username===user.username){
    return done(null,{
      username,
      active: true
  })
  }
  done(null,false);
})

  

  






module.exports = router;