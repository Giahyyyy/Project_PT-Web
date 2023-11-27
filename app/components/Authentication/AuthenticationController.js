const renderLoginPage = (req, res) => {
    res.render('login/index')
};

const renderRegisterPage = (req, res) => {
    res.render('register/index')
};

module.exports = {
    renderLoginPage,
    renderRegisterPage,

  };