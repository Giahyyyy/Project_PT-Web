require('dotenv').config()

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('../components/Authentication/Passport');

const session = require('express-session');
const MemoryStore = require('memorystore')(session)

const flash = require('connect-flash');
const methodOverride = require("method-override")


const mongoose = require('mongoose');


const User = require('../model/UserSchema'); // Điều chỉnh đường dẫn đến mô hình User của bạn

const app = express();

mongoose.connect('mongodb+srv://hy3132002:123@data.xchby3p.mongodb.net/food-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//const store = new session.MemoryStore();




// Cấu hình session
app.use(
  session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000 * 1000000
    },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
  })
);

// Flash middleware (đặt sau middleware session)
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Cấu hình Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});






// Passport Serialization và Deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

// HTTP logger
app.use(morgan('combined'));

// Middleware Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Các thư mục tĩnh
app.use('/', express.static(path.join(__dirname, '../public/cus/main')));
app.use('/admin', express.static(path.join(__dirname, '../public/admin')));
app.use('/authen', express.static(path.join(__dirname, '../public/cus/main')));
app.use('/authen/verify', express.static(path.join(__dirname, '../public/cus/main')));
app.use('/site', express.static(path.join(__dirname, '../public/cus/main')));
app.use('/detail/product', express.static(path.join(__dirname, '../public/cus/main')));
app.use('/home', express.static(path.join(__dirname, '../public/cus/main')));
app.use('/user', express.static(path.join(__dirname, '../public/cus/main')));

app.use('/admin/Product/edit', express.static(path.join(__dirname, '../public/admin')));
app.use('/form', express.static(path.join(__dirname, '../public/admin')));

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));



// Template engine
app.engine('hbs', exphbs({
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  helpers: {
    ifCond: function (v1, v2, options) {
      if (v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  }
}));

app.set('view engine', 'hbs');
app.set('views', [path.join(__dirname, '../views/Customer'), path.join(__dirname, '../views/Admin')]);

// Sử dụng các routes bạn đã định nghĩa
const routeCus = require('../routes/Customer');
const routeAdmin = require('../routes/Admin');

routeCus(app);
routeAdmin(app);


// Khởi động máy chủ
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
