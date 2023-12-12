const renderContactPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('contact', { user: req.user });
      } else {
        res.render('contact', { user: null });
      }
};

module.exports = {

    renderContactPage,

  };