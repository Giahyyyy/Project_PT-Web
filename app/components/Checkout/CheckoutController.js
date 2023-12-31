const Order = require('../../model/OrderSchema'); // Điều chỉnh đường dẫn tùy thuộc vào cấu trúc dự án của bạn

const createOrder = async (req, res) => {
  try {
    const {
      billing: {
        firstName,
        lastName,
        companyName,
        streetAddress,
        provinceCity,
        district,
        email,
        phone,
      },
      paymentMethod,
      additionalInformation: { notes },
    } = req.body;

    const userCart = req.session.cart || { items: [], total: 0 };
    const productsInCart = userCart.items;

    // Tạo mảng sản phẩm cho đơn hàng từ giỏ hàng của người dùng
    const productsForOrder = productsInCart.map(item => ({
      product: item.product._id, // Lấy productId từ đối tượng product
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));

    // Tính tổng tiền của đơn hàng từ giỏ hàng của người dùng
    const totalAmount = userCart.total;

    // Tạo đối tượng đơn hàng
    const orderData = {
      billing: {
        firstName,
        lastName,
        companyName,
        streetAddress,
        provinceCity,
        district,
        email,
        phone,
      },
      paymentMethod,
      additionalInformation: { notes },
      products: productsForOrder,
      total: totalAmount,
    };

    const order = new Order(orderData);
    await order.save();

    req.session.cart = { items: [], total: 0 };

    res.json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Internal Server Error');
  }
};



const renderCheckoutPage = (req, res) => {
    const userCart = req.session.cart || { items: [], total: 0 };

    res.render('checkout/index', { cart: userCart });
};

module.exports = {

    renderCheckoutPage,
    createOrder

  };