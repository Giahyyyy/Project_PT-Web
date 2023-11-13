// controllers/Customer.js
 // Sử dụng module 'path' để xử lý đường dẫn tệp
 // Định nghĩa phương thức để xử lý yêu cầu cho trang khách hàng
 const renderHomePage = (req, res) => {
    res.render('home/index')
};

 const renderAboutPage = (req, res) => {
    res.render('about/index')
};

const renderCartPage = (req, res) => {
    res.render('cart/index')
};

const renderCheckoutPage = (req, res) => {
    res.render('checkout/index')
};

const renderContactPage = (req, res) => {
    res.render('contact/index')
};

const renderLoginPage = (req, res) => {
    res.render('login/index')
};

const renderRegisterPage = (req, res) => {
    res.render('register/index')
};




module.exports = {
  renderAboutPage,
  renderCartPage,
  renderCheckoutPage,
  renderContactPage,
  renderLoginPage,
  renderRegisterPage,
  renderHomePage,
};