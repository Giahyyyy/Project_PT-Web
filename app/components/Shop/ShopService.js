// shopService.js
const Product = require('../../model/ProductSchema');
const Category = require('../../model/CategorySchema');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
mongoose.plugin(mongoosePaginate);

mongoosePaginate.paginate.options = {
  limit: 12, // Số sản phẩm trên mỗi trang
};

const getShopData = async (req) => {
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

    // paging
    const page = parseInt(req.query.page) || 1;
  



    // Kết hợp cả ba tùy chọn: sort, category, và price
    const result = await Product.paginate(filterOptions, 
      {
        sort: sortOptions,
        page: page,
      });
    // products = await Product.find(filterOptions).sort(sortOptions).populate('category');
    products = result.docs;
    const categories = await Category.find();

  return {
    products: result.docs,
    totalPages: result.totalPages,
    currentPage: page,
    sortBy,
    selectedCategory,
    categories,
  };
};

module.exports = {
  getShopData,
};
