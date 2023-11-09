// routes/customerRoutes.js

const express = require('express');
const app= express();
const router = express.Router();
const customerController = require('../controllers/Customer');

// Định nghĩa các route cho trang khách hàng
// router.get('/', (req, res) => {
//     return res.send('Hello World!');
// });

router.get('/', customerController.renderAboutPage);

// // Định nghĩa các route khác cho admin ở đây

module.exports = router;
