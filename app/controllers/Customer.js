// controllers/Customer.js
const path = require('path'); // Sử dụng module 'path' để xử lý đường dẫn tệp

// Định nghĩa phương thức để xử lý yêu cầu cho trang khách hàng
const renderAboutPage = (req, res) => {
  const aboutPagePath = path.join(__dirname, '../views/about.html');
  res.sendFile(aboutPagePath);
};

module.exports = {
  renderAboutPage,
};
