    // Import necessary modules and schemas
    const Product = require('../../model/ProductSchema');
    const Review = require('../../model/ReviewSchema');

    const getProductById = async (req, res) => {
        try {
            const productId = req.params.id.toString();

            // Find the product and populate the category
            const product = await Product.findOne({ _id: productId }).populate('category');

            if (!product) {
                console.log('Sản phẩm không tồn tại.');
                return res.status(404).send('Sản phẩm không tồn tại.');
            }

            console.log('Thông tin sản phẩm:', product);

            // Find reviews directly from the Review model
            const reviews = await Review.find({ product: productId }).populate('user', 'first_name last_name');

            console.log('Đánh giá sản phẩm:', reviews);

            // Find related products
            const categoryId = product.category._id;
            const relatedProducts = await Product.find({ category: categoryId, _id: { $ne: productId } }).limit(10);

            console.log('Sản phẩm liên quan:', relatedProducts);

            if (req.isAuthenticated()) {
                // Nếu đã xác thực, render template UserDashboard
                res.render('details/index', { user: req.user, product, reviews, relatedProducts });
            } else {
                // Nếu chưa xác thực, render template thông thường
                res.render('details/index', { product, reviews, relatedProducts });
            }

            
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).send('Đã xảy ra lỗi.');
        }
    };

    const requireAuth = (req, res, next) => {
        if (req.isAuthenticated()) {
            res.render('details/index', {product, reviews, relatedProducts , user: req.user });
        } else {
            res.redirect('/authen/login');
            req.session.returnTo = req.originalUrl;
        }
    };

    // Post a review for a product
    const postReview = async (req, res) => {
        try {
            const { user , comment } = req.body;
            const productId = req.params.id.toString();

            console.log("check " , req.body )
            // Create a new review
            const newReview = new Review({
                user,
                comment,
                product: productId,
            });

            // Save the review to the database
            await newReview.save();

            res.status(201).send('Đã đăng đánh giá thành công.');
        } catch (error) {
            console.error('Đã xảy ra lỗi khi đăng đánh giá:', error);
            res.status(500).send('Đã xảy ra lỗi khi đăng đánh giá.');
        }
    };

    module.exports = {
        getProductById,
        postReview,
        requireAuth
    };
