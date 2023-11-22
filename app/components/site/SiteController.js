const renderHomePage = (req, res) => {
    res.render('home/index');
};

const renderAboutPage = (req, res) => {
    res.render('about/index')
};

module.exports = {
    renderHomePage,
    renderAboutPage,
  };