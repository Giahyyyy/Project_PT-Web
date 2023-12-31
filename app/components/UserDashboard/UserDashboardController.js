const bcrypt = require('bcryptjs');
const Order = require('../../model/OrderSchema');

const renderUserDashboardPage = (req, res) => {
    
    if (req.isAuthenticated()) {
        res.render('UserDashboard/index', { user: req.user });
      } else {
        res.redirect('/authen/login');
      }
};

const renderUserSettingPage = (req, res) => {
    
  if (req.isAuthenticated()) {
      res.render('UserDashboard/accountSetting', { user: req.user });
    } else {
      res.redirect('/authen/login');
    }
};

const renderUserOrderPage =async  (req, res) => {
    
  if (req.isAuthenticated()) {
    const userOrders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

      res.render('UserDashboard/oderHistory', { user: req.user ,orders : userOrders});
    } else {
      res.redirect('/authen/login');
    }
};

const updateUserProfile = async (req, res) => {
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
    console.error("hihi", error);

    // Trả về thông báo lỗi trực tiếp trong phản hồi
    return res.status(500).json({ error: 'An error occurred while updating the profile.' });
  }
};


const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = req.user; // Người dùng đang đăng nhập

    console.log(oldPassword, newPassword, confirmPassword);
    

    // Kiểm tra mật khẩu cũ
    const isOldPasswordCorrect = user.verifyPassword(oldPassword);
    if (!isOldPasswordCorrect) {
      return res.status(400).json({ success: false, message: 'Incorrect old password.' });
    }

    // Kiểm tra xác nhận mật khẩu mới
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'New password and confirm password do not match.' });
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



const uploadAvatar = async (req, res) => {
  try {
    const user = req.user; // Người dùng đang đăng nhập
    user.profileImage = '/uploads/user-img/' + req.file.filename;
    await user.save();

    res.json({ success: true, avatarPath: user.profileImage });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ success: false, message: 'An error occurred while updating the avatar.' });
  }
}



module.exports = {

    renderUserDashboardPage,
    renderUserSettingPage,
    renderUserOrderPage,
    uploadAvatar,
    changePassword,
    updateUserProfile

  };