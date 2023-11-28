const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const collection = require("./config")

const app = express();

//HTTP logger
app.use(morgan('combined'))

// Thiết lập các thư mục tĩnh
app.use('/', express.static(path.join(__dirname, '../public/cus')));
app.use('/admin', express.static(path.join(__dirname, '../public/admin')));
app.use('/authen',express.static(path.join(__dirname, '../public/cus')));
app.use('/site',express.static(path.join(__dirname, '../public/cus')));

// console.log(path.join(__dirname, '../public'));

//template engine
app.engine('hbs',handlebars.engine({
  extname: ".hbs"
}));
app.set('view engine', 'hbs');


//app.set('views', path.join(__dirname, '../views/Customer'));
// app.set('views', path.join(__dirname, '../views'));

app.set('views', [path.join(__dirname, '../views/Customer'), path.join(__dirname, '../views/Admin')]);

// Sử dụng các routes đã được định nghĩa
// const customerRoutes = require('../routes/Customer');
// app.use('/cus', customerRoutes);
const routeCus = require('../routes/Customer')

const AdminRoutes = require('../routes/Admin');
app.use('/admin', AdminRoutes);




// Route
routeCus(app);

//Kết nối tới db




// Khởi động máy chủ
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


