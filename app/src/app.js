const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();



//HTTP logger
app.use(morgan('combined'))

// Thiết lập các thư mục tĩnh
app.use(express.static(path.join(__dirname, '../public')));

//template engine
app.engine('hbs',handlebars.engine({
  extname: ".hbs"
}));
app.set('view engine', 'hbs');




// app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../views'));

console.log(path.join(__dirname, '../public'));



// Sử dụng các routes đã được định nghĩa
const customerRoutes = require('../routes/Customer');
app.use('/', customerRoutes);

// Định nghĩa các routes cho admin ở đây

// Khởi động máy chủ
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
