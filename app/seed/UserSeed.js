// seed.js
const User = require('../model/UserSchema');
const db = require('../src/config');

db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB cho user:'));
db.once('open', async () => {
  try {
    // Kiểm tra xem có người dùng trong cơ sở dữ liệu không
    const existingUser = await User.findOne({});

    if (!existingUser) {
      // Nếu không có người dùng, thì thêm người dùng mới
      const newUser = new User({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'mat-khau-an-toan-cua-ban',
      });

      // Sử dụng await để đợi cho save hoàn thành
      await newUser.save();

      console.log('Người dùng đã được lưu thành công');
    } else {
      console.log('Cơ sở dữ liệu đã có người dùng, không cần thêm mới');
    }

    process.exit(); // Kết thúc quá trình Node.js sau khi seed dữ liệu
  } catch (error) {
    console.error('Lỗi khi lưu người dùng:', error);
  }
});
