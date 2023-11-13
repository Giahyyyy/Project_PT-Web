const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();



//HTTP logger
app.use(morgan('combined'))

// Thiết lập các thư mục tĩnh
app.use('/cus', express.static(path.join(__dirname, '../public/cus')));

//template engine
app.engine('hbs',handlebars.engine({
  extname: ".hbs"
}));
app.set('view engine', 'hbs');





app.set('views', path.join(__dirname, '../views/Customer'));





// Sử dụng các routes đã được định nghĩa
const customerRoutes = require('../routes/Customer');
app.use('/cus', customerRoutes);

const AdminRoutes = require('../routes/Admin');
app.use('/admin', AdminRoutes);

// Định nghĩa các routes cho admin ở đây

// Khởi động máy chủ
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
