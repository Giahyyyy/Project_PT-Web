const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  billing: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  additionalInformation: {
    notes: { type: String },
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true },
      subtotal: { type: Number, required: true },
    },
  ],
  paymentMethod: { type: String, required: true },
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  total: { type: Number, required: true }, 
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
