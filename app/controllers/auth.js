// Trong controllers/authController.js

const User = require('../model/UserSchema');
const bcrypt = require('bcrypt');

const loginGet = (req, res) => {
  res.render('login/index'); // Đặt tên file hoặc template của trang đăng nhập
};

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        req.session.userId = user._id;
        return res.redirect('/dashboard');
      }
    }

    res.render('login', { error: 'Email hoặc mật khẩu không đúng' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi server');
  }
};

module.exports = { loginGet, loginPost };
