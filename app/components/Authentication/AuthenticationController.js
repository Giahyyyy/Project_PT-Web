const User = require('../../model/UserSchema');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../../src/config');

const nodemailer = require('nodemailer');



const postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (!user) {
      
      req.flash('error', info.message || 'Authentication failed.');
      return res.redirect('/authen/login');
    }
    
    // Hash the password received from the form
    const { password } = req.body;
    const isPasswordCorrect = user.verifyPassword(password);

    if (!isPasswordCorrect) {
      
      req.flash('error', 'Incorrect password.');
      return res.redirect('/authen/login');
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      console.log("Đăng nhập thành công");
      
      console.log("User là: ",user.role)
      if (user.role === 'admin') {
        return res.redirect('/admin/dashboard');
      } else {
        return res.redirect('/shop');
      }
      
    });
  })(req, res, next);
};

const generateVerificationCode = () => {
  // Tạo mã xác nhận ngẫu nhiên, ví dụ: mã số ngẫu nhiên 6 chữ số
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationEmail = (email, verificationCode) => {
  
  // Gửi email chứa mã xác thực
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tourhoanuicamranh@gmail.com',
      pass: 'fbnk mqvm omll rjeb',
    },
  });

  const mailOptions = {
    from: 'tourhoanuicamranh@gmail.com',
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
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

const renderForgotPassPage = (req, res) => {
  res.render('login/forgotPass');
};

const renderResetPassPage = (req, res) => {
  
  res.render('login/resetPass' );
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = generateVerificationCode();
      user.verificationCode = token;
      await user.save();

      sendVerificationEmail(email, token);
      return res.status(200).json({ success: true, message: 'Đã gửi token' });
    } else {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword, confirmNewPassword } = req.body;

  try {
    const user = await User.findOne({ verificationCode: token });

    if (user) {
      if (newPassword === confirmNewPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.verificationCode = null;
        await user.save();
        // res.redirect(`/authen/login`);
        return res.status(200).json({ success: true, message: 'Password reset successfully' });
      } else {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
      }
    } else {
      return res.status(404).json({ success: false, message: 'Token not right' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const renderRegisterPage = (req, res) => {
  res.render('register/index');
};

const renderVerificationPage = (req, res) => {
  const { email } = req.params;
  
  // Hiển thị trang xác thực
  res.render('register/verify', { email });
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
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const verificationCode = generateVerificationCode();

    // Create a new user with the hashed password
    const newUser = new User({profileImage: "/uploads/user-img/default.png", email, password: hashedPassword, first_name, last_name,verificationCode });

    // Save the new user to the database
    await newUser.save();

    // Generate verification code
    

    // Send verification email
    sendVerificationEmail(email, verificationCode);

    console.log("User registered successfully:", newUser);
    return res.status(200).json({ success: true, message: 'Registration successful' });

    
  } catch (error) {
    // console.error('Error during registration:', error);
    // req.flash('error', 'Error during registration');
    
    
    console.error('Error during registration:', error);

    if (error.message.includes('Invalid request body')) {
      return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    return res.status(500).json({ success: false, message: 'Error during registration' });

    
  }
};

const getUserVerificationData = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', email);
      return null;
    }

    return {
      email: user.email,
      verificationCode: user.verificationCode,
    };
  } catch (error) {
    console.error('Error fetching user verification data:', error);
    throw error;
  }
};



const verifyRegistration = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const userVerificationData = await getUserVerificationData(email);

    if (!userVerificationData) {
      return res.status(400).json({ success: false, message: 'User not found22' });
    }

    // Kiểm tra mã xác nhận từ người dùng
    if (verificationCode !== userVerificationData.verificationCode) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    // Cập nhật trạng thái xác nhận và xóa mã xác nhận
    const user = await User.findOne({ email });
    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    // Redirect hoặc trả về JSON thành công tùy thuộc vào yêu cầu của ứng dụng
    res.json({ success: true, message: 'Registration verified successfully' });
  } catch (error) {
    console.error('Error verifying registration:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return next()
  }
  res.redirect("/authen/login")
}

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return res.redirect("/contact")
  }
  next() 
}

const logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/authen/login");
  });
};

module.exports = {
  renderLoginPage,
  renderRegisterPage,
  renderForgotPassPage,
  renderResetPassPage,
  registerUser,
  postLogin,
  checkAuthenticated,
  checkNotAuthenticated,
  logout,
  renderVerificationPage,
  sendVerificationEmail,
  verifyRegistration,
  getUserVerificationData,
  forgotPassword,
  resetPassword
};
