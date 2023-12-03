const { Schema, model, Types } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new Schema({
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
    type: Types.ObjectId,
    ref: 'Category', // Tham chiếu đến mô hình Category
  },
});
ProductSchema.plugin(mongoosePaginate);
const Product = model('Product', ProductSchema);
module.exports = Product;
