
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const collection = require("./config");
const bodyParser = require('body-parser');

//authen
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

mongoose.connect('mongodb://localhost:27017/food-shop',{
  useNewUrlParser: true,
  useUnifiedTopology:true
});

app.use(session({
  secret: '123',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());






// HTTP logger
app.use(morgan('combined'));

// Sử dụng body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//authen login
mongoose.connect


// Thiết lập các thư mục tĩnh
app.use('/', express.static(path.join(__dirname, '../public/cus/main')));
app.use('/admin', express.static(path.join(__dirname, '../public/admin')));
app.use('/authen', express.static(path.join(__dirname, '../public/cus/main')));
app.use('/site', express.static(path.join(__dirname, '../public/cus/main')));
app.use('/detail/product', express.static(path.join(__dirname, '../public/cus/main')));
app.use('/home', express.static(path.join(__dirname, '../public/cus/main')));

// console.log(path.join(__dirname, '../public/cus'))




// template engine
app.engine('hbs', exphbs({
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,

  },
  helpers: {
    ifCond: function (v1, v2, options) {
      if (v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },}
  
}));


app.set('view engine', 'hbs');


app.set('views', [path.join(__dirname, '../views/Customer'), path.join(__dirname, '../views/Admin')]);

// Sử dụng các routes đã được định nghĩa
const routeCus = require('../routes/Customer');
const AdminRoutes = require('../routes/Admin');

app.use('/admin', AdminRoutes);
routeCus(app);





// Khởi động máy chủ
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
