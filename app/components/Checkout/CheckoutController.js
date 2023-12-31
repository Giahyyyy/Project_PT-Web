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

    // Đoạn code xử lý dữ liệu từ form ở đây
    // ...

    // In ra kiểm tra dữ liệu nhận được
    console.log('Received form data:', {
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
    });

    // Trả về kết quả cho client hoặc thực hiện các thao tác khác dựa trên logic của bạn
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