// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/Customer');

// Định nghĩa các route cho trang khách hàng
// router.get('/', (req, res) => {
//     return res.send('Hello World!');
// });



router.get('/cart', customerController.renderCartPage);

router.get('/checkout', customerController.renderCheckoutPage);



router.get('/login', customerController.renderLoginPage);

router.get('/register', customerController.renderRegisterPage);







module.exports = router;
