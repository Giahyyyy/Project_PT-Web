const renderCartPage = (req, res) => {
    
    if (req.isAuthenticated()) {
        res.render('cart/index', { user: req.user });
      } else {
        res.render('cart/index', { user: null });
      }
};

module.exports = {

    renderCartPage,
  };