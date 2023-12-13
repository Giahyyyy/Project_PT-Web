const renderUserDashboardPage = (req, res) => {
    
    if (req.isAuthenticated()) {
        res.render('UserDashboard/index', { user: req.user });
      } else {
        res.render('UserDashboard/index', { user: null });
      }
};

module.exports = {

    renderUserDashboardPage,

  };