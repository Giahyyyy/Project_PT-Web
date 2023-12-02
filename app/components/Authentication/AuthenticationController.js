const User = require('../../model/UserSchema')


const renderLoginPage = async (req, res) => {
    try {
        
    } catch (err) {

    }
    res.render('login/index')
};

const renderRegisterPage = (req, res) => {
    res.render('register/index')
};

const registerUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const { email, password, first_name, last_name } = req.body;

    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Tạo người dùng mới
    const newUser = new User({ email, password, first_name, last_name });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


  
  module.exports = {
    registerUser,
  };
  
  

module.exports = {
    renderLoginPage,
    renderRegisterPage,
    registerUser
  };