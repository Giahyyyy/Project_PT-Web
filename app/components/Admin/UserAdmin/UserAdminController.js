const bcrypt = require('bcryptjs');
const render = (req, res) => {
    
    if (req.isAuthenticated()) {
      res.render('UserAdmin/index', {user: req.user});
    }
    else {
      // Người dùng chưa xác thực, có thể chuyển hướng hoặc xử lý theo logic khác
      res.redirect('/authen/login'); // Chẳng hạn, chuyển hướng đến trang đăng nhập
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const user = req.user; // Người dùng đang đăng nhập
    

    // Kiểm tra xem người dùng đã thay đổi thông tin nào và cập nhật trong cơ sở dữ liệu
    if (first_name && first_name !== user.first_name) {
      user.first_name = first_name;
    }

    if (last_name && last_name !== user.last_name) {
      user.last_name = last_name;
    }

    // Lưu các thay đổi vào cơ sở dữ liệu
    await user.save();

    // Trả về thông báo thành công trực tiếp trong phản hồi
    return res.status(200).json({ message: 'Profile updated successfully.' });
  } catch (error) {
    console.error("Error: ", error);

    // Trả về thông báo lỗi trực tiếp trong phản hồi
    return res.status(500).json({ error: 'An error occurred while updating the profile.' });
  }
};

const changePassword = async (req, res) => {
  try {
    const {oldPassword, newPassword} = req.body;
    const user = req.user; // Người dùng đang đăng nhập

    console.log(oldPassword, newPassword);
    

    // Kiểm tra mật khẩu cũ
    const isOldPasswordCorrect = user.verifyPassword(oldPassword);
    if (!isOldPasswordCorrect) {
      return res.status(400).json({ success: false, message: 'Incorrect old password.' });
    }

    

    // Thay đổi mật khẩu
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password=hashedPassword;
    user.save();
    

    
    return res.json({ success: true, message: 'Password changed successfully.' });
    
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while changing the password.' });
  }
};
module.exports = {

  render,
  updateAdminProfile,
  changePassword


};