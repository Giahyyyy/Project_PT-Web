const Product = require('../../model/ProductSchema')


const renderHomePage =  (req, res) => {

    res.render('home/index');
};

const renderAboutPage = (req, res) => {
    res.render('about/index')
};
const renderShopPage = async (req, res) => {
    try {
      const products = await Product.find();
      res.render('shop/index', { products });
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      res.status(500).send('Lỗi Server');
    }
  };
  


module.exports = {
    renderHomePage,
    renderAboutPage,
    renderShopPage,
  };