const Category = require('../../../model/CategorySchema');

const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    // Check if the category already exists
    const existingCategory = await Category.findOne({ category_name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Danh mục đã tồn tại' });
    }

    // Create a new category
    const newCategory = new Category({
      category_name,
    });

    // Save the new category to the database
    const savedCategory = await newCategory.save();

    res.status(201).json({ message: 'Danh mục đã được tạo thành công', category: savedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
  }
};



const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('categories/index', { categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const renderCategory = async (req, res) => {
  try {
    // Fetch categories from the server
    const categories = await Category.find();

    // Render the page with the retrieved categories
    res.render('categories/index', { categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  renderCategory,
  createCategory,
  getAllCategories,
};
