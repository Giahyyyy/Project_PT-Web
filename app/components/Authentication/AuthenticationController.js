const User = require('../../model/UserSchema');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../../src/config');





const postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (!user) {
      console.log("Không tìm thấy người dùng:", info.message);
      req.flash('error', info.message || 'Authentication failed.');
      return res.redirect('/authen/login');
    }

    // Hash the password received from the form
    const { password } = req.body;
    const isPasswordCorrect = user.verifyPassword(password);

    if (!isPasswordCorrect) {
      console.log("Không tìm thấy người dùng:", "Incorrect password.");
      req.flash('error', 'Incorrect password.');
      return res.redirect('/authen/login');
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      console.log("Đăng nhập thành công");
      return res.redirect('/shop');
    });
  })(req, res, next);
};




const renderLoginPage = async (req, res) => {
  try {
    res.render('login/index');
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  res.render('login/index');
};

const renderRegisterPage = (req, res) => {
  res.render('register/index');
};

const registerUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const { email, password, first_name, last_name } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      req.flash('error', 'Email already exists');
      return res.redirect('/authen/register');
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ email, password: hashedPassword, first_name, last_name });

    // Save the new user to the database
    await newUser.save();

    console.log("User registered successfully:", newUser);
    return res.redirect('/authen/login');
  } catch (error) {
    console.error('Error during registration:', error);
    req.flash('error', 'Error during registration');
    
    return res.redirect('/authen/register');
    
  }
};


module.exports = {
  renderLoginPage,
  renderRegisterPage,
  registerUser,
  postLogin,
  
};
