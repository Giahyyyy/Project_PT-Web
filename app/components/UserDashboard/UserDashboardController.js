const renderUserDashboardPage = (req, res) => {
    
    if (req.isAuthenticated()) {
        res.render('UserDashboard/index', { user: req.user });
      } else {
        res.render('UserDashboard/index', { user: null });
      }
};

const renderUserSettingPage = (req, res) => {
    
  if (req.isAuthenticated()) {
      res.render('UserDashboard/accountSetting', { user: req.user });
    } else {
      res.render('UserDashboard/accountSetting', { user: null });
    }
};

module.exports = {

    renderUserDashboardPage,
    renderUserSettingPage

  };