const Product = require('../../../model/ProductSchema');
const Category = require('../../../model/CategorySchema');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
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

      return res.status(200).json({ message: 'Tải lên sản phẩm thành công' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
  }
};

const renderForm = async (req, res) => {
  try {
    // Fetch categories from the server
    const categories = await Category.find();

    // Render the form with the retrieved categories
    res.render('product/index', { categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  createProduct,
  renderForm,
};
