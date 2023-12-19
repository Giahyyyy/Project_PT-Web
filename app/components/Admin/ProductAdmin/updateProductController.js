const Product = require('../../../model/ProductSchema');
const Category = require('../../../model/CategorySchema');

const renderEditForm = async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch product and categories from the database
    const product = await Product.findById(productId);
    const categories = await Category.find();

    res.render('updateProduct/index', { product, categories });
  } catch (error) {
    console.error('Error rendering edit form:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  renderEditForm,
};
