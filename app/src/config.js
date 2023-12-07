// db.js
const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Lỗi kết nối MongoDB:', err);
});

db.on('open', () => {
  console.log('Đã kết nối thành công với cơ sở dữ liệu MongoDB');
});

mongoose.connect('mongodb://localhost:27017/food-shop',{
  useNewUrlParser: true,
  useUnifiedTopology:true
});

module.exports = db;
