const renderCheckoutPage = (req, res) => {
    const userCart = req.session.cart || { items: [], total: 0 };
    
    // Log thông tin giỏ hàng
    console.log('userCart:', userCart);

    // Log thông tin từng sản phẩm trong giỏ hàng
    userCart.items.forEach((item, index) => {
        console.log(`Product ${index + 1}:`);
        console.log('  Name:', item.product.product_name);
        console.log('  Quantity:', item.quantity);
        console.log('  Price:',  item.product.price);
        console.log('  Total:', item.quantity * item.price);
    });

    res.render('checkout/index', { cart: userCart });
};

module.exports = {

    renderCheckoutPage,

  };