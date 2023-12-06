const Product = require('../../model/ProductSchema');


const getProductById = async (req, res) => {
    try {
      const productId = req.params.id.toString();
      const product = await Product.findOne({ _id: productId });
        console.log('Product:', product); // In giá trị product vào console
  
        if (product) {
            res.render('details/index',{ product: product});
        } else {
            res.status(404).send('Sản phẩm không tồn tại.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã xảy ra lỗi.');
    }
  };
  
module.exports = {
    getProductById,
    
};