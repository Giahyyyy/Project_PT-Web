const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  category_name: {
    type: String,
    required: true,
  },
});

const Category = model('Category', CategorySchema);
module.exports = Category;
