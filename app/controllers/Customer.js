// controllers/Customer.js



 // Định nghĩa phương thức để xử lý yêu cầu cho trang khách hàng

const renderCartPage = (req, res) => {
    res.render('cart/index')
};

const renderCheckoutPage = (req, res) => {
    res.render('checkout/index')
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