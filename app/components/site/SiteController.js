const Product = require('../../model/ProductSchema')


const renderHomePage =   (req, res) => {

    res.render('home/index');

  

};

const renderAboutPage =  (req, res) => {
    res.render('about/index')
};
const renderShopPage = async (req, res) => {
  try {
    let products;

    let sortOptions = {};

    const sortBy = req.query.sort;
    if (sortBy) {
      switch (sortBy) {
        case 'product_name':
          sortOptions = { product_name: 1 };
          break;
        case 'price':
          sortOptions = { price: 1 };
          break;
        case 'discount':
            sortOptions = { discount: 1 };
            break;
        // Thêm các trường sắp xếp khác nếu cần
        default:
          // Mặc định sắp xếp theo _id hoặc các tiêu chí khác
          sortOptions = { _id: 1 };
          break;
      }
    }
    console.log('sortOptions:', sortOptions);
    console.log('products:', products);


    // Sử dụng sortOptions để sắp xếp dữ liệu
    products = await Product.find().sort(sortOptions);

    res.render('shop/index', { products, sortBy });
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