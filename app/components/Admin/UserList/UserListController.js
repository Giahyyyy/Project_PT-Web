const User = require('../../../model/UserSchema');

// Hàm renderUsers để hiển thị danh sách người dùng
const renderUsers = async (req, res) => {
  try {
    // Truy xuất danh sách người dùng từ cơ sở dữ liệu
    const users = await User.find();

    // Render trang với danh sách người dùng
    res.render('users/index', { users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  renderUsers,
};

