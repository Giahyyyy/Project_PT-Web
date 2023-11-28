const { ObjectId } = require('mongoose').Schema.Types;
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  img: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: ObjectId,
    ref: 'Category', // Tham chiếu đến mô hình Category
  },
});

module.exports = mongoose.model('Product', ProductSchema);
