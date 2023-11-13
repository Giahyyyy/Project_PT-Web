// routes/customerRoutes.js

const express = require('express');
const app= express();
const router = express.Router();
const customerController = require('../controllers/Customer');

// Định nghĩa các route cho trang khách hàng
// router.get('/', (req, res) => {
//     return res.send('Hello World!');
// });

router.get('/about', customerController.renderAboutPage);

router.get('/cart', customerController.renderCartPage);

router.get('/checkout', customerController.renderCheckoutPage);

router.get('/contact', customerController.renderContactPage);

router.get('/login', customerController.renderLoginPage);

router.get('/register', customerController.renderRegisterPage);

router.get('/home', customerController.renderHomePage);





module.exports = router;
