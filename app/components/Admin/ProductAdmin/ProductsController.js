const Product = require('../../../model/ProductSchema');
const Category = require('../../../model/CategorySchema');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
mongoose.plugin(mongoosePaginate);

mongoosePaginate.paginate.options = {
  limit: 12, // Số sản phẩm trên mỗi trang
};



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //D:/Project_PT-Web/app/public/uploads
    const uploadPath = path.resolve('D:/Project_PT-Web/app/public/uploads'); // Folder to store uploaded files
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

const uploadProduct = upload.single('img');

// Controller function for handling product creation
const createProduct = async (req, res) => {
  try {
    uploadProduct(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.log('Error uploading file:', err);
        return res.status(500).json({ message: 'Lỗi tải lên file' });
      } else if (err) {
        console.log('Unknown error uploading file:', err);
        return res.status(500).json({ message: 'Lỗi tải lên file' });
      }

      // File uploaded successfully, process other form data
      const { product_name, description, price, discount, category } = req.body;
      const img = req.file.filename; // Filename of the uploaded file

      // Create a new product
      const newProduct = new Product({
        product_name,
        description,
        price,
        discount,
        img,
        category,
      });

      // Save the new product to the database
      const savedProduct = await newProduct.save();

      res.redirect(req.get('referer'));
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getShopData = async (req) => {
  let sortOptions = {};
  let filterOptions = {};
  const page = parseInt(req.query.page) || 1;

  // SORT
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

  // FILTER GIÁ
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

  // FILTER CATEGORY
  const selectedCategory = req.query.category;
  if (selectedCategory) {
    if (!mongoose.Types.ObjectId.isValid(selectedCategory)) {
      console.log('ObjectId không hợp lệ cho selectedCategory:', selectedCategory);
    } else {
      filterOptions.category = selectedCategory;
    }
  }

  // Lấy danh sách sản phẩm và danh mục từ cơ sở dữ liệu
  const products = await Product.find(filterOptions).sort(sortOptions).populate('category');
  const categories = await Category.find();

  return {
    products: products,
    totalPages: 1,  // Bạn có thể cần cập nhật dữ liệu phân trang tùy thuộc vào số lượng sản phẩm và số sản phẩm trên mỗi trang
    currentPage: page,
    sortBy: sortBy,
    selectedCategory: selectedCategory,
    categories: categories,
  };
};

const renderForm = async (req, res) => {
  try {
    // Truy xuất danh sách sản phẩm và danh mục từ cơ sở dữ liệu
    const shopData =  await getShopData(req);

    console.log(shopData);
    res.render('product/index', shopData);

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
};




module.exports = {
  createProduct,
  renderForm,
  deleteProduct
  
};