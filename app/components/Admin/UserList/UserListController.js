const User = require('../../../model/UserSchema');

// Hàm renderUsers để hiển thị danh sách người dùng
// Trong file controllers/userController.js

const renderUsers = async (req, res) => {
  try {
    // Trích xuất các giá trị filter và sort từ query parameters
    const filterType = req.query.filterType;
    const filterValue = req.query.filterValue;
    const sortType = req.query.sortType;

    // Xử lý logic tìm kiếm và sắp xếp người dùng
    let query = {};

    if (filterType && filterValue) {
      // Thêm điều kiện filter vào query
      query[filterType] = new RegExp(filterValue, 'i'); // Sử dụng RegExp để thực hiện tìm kiếm không phân biệt chữ hoa/chữ thường
    }

    const users = await User.find(query).sort(sortType);

    // Render trang với danh sách người dùng
    
    if (req.isAuthenticated()) {
      res.render('users/index', {user: req.user,users});
    }
    else {
      // Người dùng chưa xác thực, có thể chuyển hướng hoặc xử lý theo logic khác
      res.redirect('/authen/login'); // Chẳng hạn, chuyển hướng đến trang đăng nhập
  }
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

