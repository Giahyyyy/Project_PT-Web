const renderHomePage = (req, res) => {
    res.render('home/index');
};

const renderAboutPage = (req, res) => {
    res.render('about/index')
};
const renderShopPage = (req, res) => {
    res.render('shop/index')
};


module.exports = {
    renderHomePage,
    renderAboutPage,
    renderShopPage,
  };