const Order = require('../../../model/OrderSchema');
const renderCheckout = async (req, res) => {
    const orders = await Order.find();

res.render('chart/index' , { orders });
};


const deleteOrder = async (req, res) => {
    try {
      const orderId = req.params.orderId;
  
      // Kiểm tra xem orderId có hợp lệ không
      if (!orderId) {
        return res.status(400).json({ success: false, message: 'Invalid order ID' });
      }
  
      // Thực hiện xóa đơn hàng từ cơ sở dữ liệu
      await Order.findByIdAndDelete(orderId);
  
      // Trả về kết quả cho client
      res.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };



module.exports = {

    renderCheckout,
    deleteOrder
    

};