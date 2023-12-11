// ShopController.js
const shopService = require('./ShopService');

const renderShopPage = async (req, res) => {
  try {
    const shopData = await shopService.getShopData(req);
    shopData.user=req.user;
    console.log(shopData.user);
    res.render('shop/index', shopData);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    res.status(500).send('Lỗi Server');
  }
};

module.exports = {
  renderShopPage,
};
