const Product = require('../../model/ProductSchema');
const Category = require('../../model/CategorySchema');

const mongoose = require('mongoose');



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
    let filterOptions = {};
 ///SORT
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
        default:
          sortOptions = { _id: 1 };
          break;
      }
    }
//filter giá
    const priceFilter = req.query.price;
    if (priceFilter) {
      switch (priceFilter) {
        case '1':
          filterOptions.price = { $gte: 5, $lte: 10 };
          break;
        case '2':
          filterOptions.price = { $gte: 10, $lte: 20 };
          break;
        case '3':
          filterOptions.price = { $gte: 20, $lte: 100 };
          break;
        default:
          break;
      }
    }
//filter category
    const selectedCategory = req.query.category;
    if (selectedCategory) {
      if (!mongoose.Types.ObjectId.isValid(selectedCategory)) {
        console.log('ObjectId không hợp lệ cho selectedCategory:', selectedCategory);
      } else {
        filterOptions.category = selectedCategory;
      }
    }


    // Kết hợp cả ba tùy chọn: sort, category, và price
    products = await Product.find(filterOptions).sort(sortOptions).populate('category');
    const categories = await Category.find();
    console.log('MongoDB Query:', filterOptions);

    console.log('MongoDB []:', products);

    res.render('shop/index', { products, sortBy, selectedCategory, categories });
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