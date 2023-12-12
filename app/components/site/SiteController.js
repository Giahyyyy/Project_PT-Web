

const renderHomePage =   (req, res) => {

    if (req.isAuthenticated()) {
        res.render('home', { user: req.user });
      } else {
        res.render('home', { user: null });
      }
};

const renderAboutPage =  (req, res) => {
    if (req.isAuthenticated()) {
        res.render('about', { user: req.user });
      } else {
        res.render('about', { user: null });
      }
};



module.exports = {
    renderHomePage,
    renderAboutPage,
    
  };