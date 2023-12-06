const User = require('../../model/UserSchema')
const mongoose = require('mongoose')

const db = require('../../src/config');

db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB cho user:'));


const renderLoginPage = async (req, res) => {
    try {
        const users = await User.find()

        console.log('User data: ',users);
        res.render('login/index')

        //mongoose.connection.close();
    } catch (err) {
        console.error("lỗi không thấy người dùng:",error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    res.render('login/index')
};

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

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

    const hashedPassword = await bcrypt.hash(password, 10);
    // Tạo người dùng mới
    const newUser = new User({ email, password:hashedPassword, first_name, last_name });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


  
const getUserData = async() => {
  try {
      const users = await User.find()

      console.log('User data: ',users);

      mongoose.connection.close();
  } catch (error) {
      console.error("lỗi không thấy người dùng:",error);
      mongoose.connection.close();
  }
}
  
  

module.exports = {
    renderLoginPage,
    renderRegisterPage,
    registerUser,
    getUserData,
    loginUser
  };