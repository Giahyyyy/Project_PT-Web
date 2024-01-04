const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    billing: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      companyName: { type: String },
      streetAddress: { type: String, required: true },
      provinceCity: { type: String, required: true },
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
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        subtotal: { type: Number, required: true },
      },
    ],
    paymentMethod: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ['Xác nhận', 'Đang vận chuyển', 'Hoàn thành'], default: 'Xác nhận' }, // Thêm trường status

  },
  { timestamps: true },
  
);

const Order = model('Order', orderSchema);

module.exports = Order;
