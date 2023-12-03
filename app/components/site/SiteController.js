const Product = require('../../model/ProductSchema')
const Category = require('../../model/CategorySchema')




const renderHomePage =   (req, res) => {

    res.render('home/index');

  

};

const renderAboutPage =  (req, res) => {
    res.render('about/index')
};



const filterProductsByPriceRange = async (priceRange) => {
  try {
    let minPrice, maxPrice;

    // Chuyển đổi giá trị từ dropdown menu thành khoảng giá tương ứng
    switch (priceRange) {
      case '01':
        minPrice = 5;
        maxPrice = 10;
        break;
      case '02':
        minPrice = 10;
        maxPrice = 20;
        break;
      case '03':
        minPrice = 20;
        maxPrice = 100;
        break;
      default:
        break;
    }

    // Kiểm tra nếu cả hai giá trị minPrice và maxPrice đều tồn tại
    let query = {};
    if (minPrice && maxPrice) {
      query = { price: { $gte: minPrice, $lte: maxPrice } };
    }

    const products = await Product.find(query);
    return products;
  } catch (error) {
    console.error('Lỗi khi lọc sản phẩm theo khoảng giá:', error);
    throw error;
  }
};


const renderShopPage = async (req, res) => {
  try {
    let products;
    let categories;

    // Lấy danh sách danh mục từ cơ sở dữ liệu
    categories = await Category.find();

    let sortOptions = {};
    let filterOptions = {};

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

    const selectedCategory = req.query.category;
    if (selectedCategory) {
      filterOptions.category = selectedCategory;
    }

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
        // Thêm các tùy chọn lọc giá khác nếu cần
        default:
          // Không áp dụng bộ lọc giá nếu giá trị không hợp lệ
          break;
      }
    }

    // Kết hợp cả ba tùy chọn: sort, category, và price
    products = await Product.find(filterOptions).sort(sortOptions);

    res.render('shop/index', { products, sortBy, selectedCategory, categories });
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    res.status(500).send(`Lỗi Server: ${error.message}`);
  }
};


  


module.exports = {
    renderHomePage,
    renderAboutPage,
    renderShopPage,
    
  };