const express = require('express');
const app = express();

// Thiết lập các thư mục tĩnh
app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'html');

// Sử dụng các routes đã được định nghĩa
const customerRoutes = require('./app/routes/Customer');
app.use('/', customerRoutes);

// Định nghĩa các routes cho admin ở đây

// Khởi động máy chủ
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
