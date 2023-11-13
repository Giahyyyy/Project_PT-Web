// controllers/Customer.js
 // Sử dụng module 'path' để xử lý đường dẫn tệp

// Định nghĩa phương thức để xử lý yêu cầu cho trang khách hàng
const renderAboutPage = (req, res) => {
    res.render('about/index')
};

module.exports = {
  renderAboutPage,
};