const Product = require('../../../model/ProductSchema');
const Category = require('../../../model/CategorySchema');
const multer = require('multer');
const path = require('path');

const renderUpdateForm = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    const categories = await Category.find();

    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Render the update form with the retrieved product and categories
    res.render('updateProduct/index', { product, categories });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Internal Server Error');
  }
};



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve('C:/Users/kient/Downloads/Project_PT-Web-b8ef8380294627744409c37bc5765550bef7a70c/Project_PT-Web-b8ef8380294627744409c37bc5765550bef7a70c/app/public/uploads'); // Folder to store uploaded files
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadProduct = upload.single('img');

// Controller function for handling product update
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Process uploaded file if available
    uploadProduct(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.log('Error uploading file:', err);
        return res.status(500).json({ message: 'File upload error' });
      } else if (err) {
        console.log('Unknown error uploading file:', err);
        return res.status(500).json({ message: 'File upload error' });
      }

      // Update other form data
      const { product_name, description, price, discount, category } = req.body;

      // Update product fields
      existingProduct.product_name = product_name;
      existingProduct.description = description;
      existingProduct.price = price;
      existingProduct.discount = discount;
      existingProduct.category = category;

      // Update image only if a new file is uploaded
      if (req.file) {
        existingProduct.img = req.file.filename;
      }

      // Save the updated product to the database
      await existingProduct.save();

      return res.status(200).json({ message: 'Product updated successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Other functions (renderForm, deleteProduct) remain unchanged



module.exports = {
  renderUpdateForm,
  updateProduct,
};
