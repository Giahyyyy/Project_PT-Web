const Product = require('../../model/ProductSchema');

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const sessionId = req.session.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let userCart = req.session.cart || { items: [], total: 0 };

        const existingItem = userCart.items.find(item => item.product.toString() === productId.toString());

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.subtotal = existingItem.quantity * product.price;
        } else {
            const productDetails = await Product.findById(productId);
            userCart.items.push({
                product: productDetails,
                quantity: quantity,
                subtotal: quantity * productDetails.price,
            });
        }

        userCart.total = userCart.items.reduce((total, item) => total + item.subtotal, 0);

        req.session.cart = userCart;

        res.status(200).json({ message: 'Product added to cart', cart: userCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const renderCartPage = (req, res) => {
    const userCart = req.session.cart || { items: [], total: 0 };

    console.log('User Cart:', userCart);

    const productInfoArray = userCart.items.map(item => ({
        productName: item.product.product_name,
        price: item.product.price,
    }));

    console.log('Product Information:', productInfoArray);

    res.render('cart/index', { cart: userCart });
};

// Inside your controller file

// ... (other code) ...
const updateSubtotal = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        console.log('Received request data:', req.body);

        // Lấy giỏ hàng của người dùng từ session
        let userCart = req.session.cart || { items: [], total: 0 };

        // Tìm sản phẩm trong giỏ hàng
        const cartItem = userCart.items.find(item => item.product._id.toString() === productId.toString());

        // Cập nhật số lượng và subtotal
        if (cartItem) {
            cartItem.quantity = parseInt(quantity);
            cartItem.subtotal = cartItem.quantity * cartItem.product.price;

            // Cập nhật tổng giá trị trong giỏ hàng
            userCart.total = userCart.items.reduce((total, item) => total + item.subtotal, 0);
            
            // Cập nhật session
            req.session.cart = userCart;

            console.log('Updated userCart:', userCart);
            // Gửi giỏ hàng đã cập nhật như là phản hồi
            res.status(200).json({
                message: 'Cập nhật giỏ hàng thành công',
                cart: userCart,
                total: userCart.total,
                updatedProduct: cartItem, // Thêm thông tin sản phẩm đã cập nhật vào phản hồi
            });

        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
};

const removeItem = async (req, res) => {
    try {
        const { productId } = req.body;

        // Retrieve the user's cart from the session
        let userCart = req.session.cart || { items: [], total: 0 };

        // Find the index of the item in the cart
        const itemIndex = userCart.items.findIndex(item => item.product._id.toString() === productId.toString());

        // Remove the item from the cart if found
        if (itemIndex !== -1) {
            userCart.items.splice(itemIndex, 1);

            // Update the total in the cart
            userCart.total = userCart.items.reduce((total, item) => total + item.subtotal, 0);

            // Update the session
            req.session.cart = userCart;

            // Send the updated cart as a response
            res.status(200).json({ message: 'Item removed successfully', cart: userCart });
        } else {
            res.status(404).json({ message: 'Item not found in the cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};  

// Add this route to your Express app

  
  module.exports = {
    addToCart,
    renderCartPage,
    updateSubtotal,
    removeItem    
  };
  