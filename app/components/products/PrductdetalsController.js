const Product = require('../../model/ProductSchema');

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id.toString();
        const product = await Product.findOne({ _id: productId }).populate('category');

        if (!product) {
            return res.status(404).send('Sản phẩm không tồn tại.');
        }

        const categoryId = product.category._id;

        const relatedProducts = await Product.find({ category: categoryId, _id: { $ne: productId } }).limit(5);

        res.render('details/index', { product, relatedProducts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã xảy ra lỗi.');
    }
};

module.exports = {
    getProductById,
};
