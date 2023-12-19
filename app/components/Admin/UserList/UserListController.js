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
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
    }

    res.json({ success: true, message: 'Xóa người dùng thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};



module.exports = {
  renderUsers,
  deleteUser
};

